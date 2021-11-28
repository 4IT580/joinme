import { ApolloError } from 'apollo-server'
import { verify } from './token.js'
import { db } from './db.js'
import { FRONTEND_URL } from '../config.js'

export class UnauthorizedException extends ApolloError {
  constructor(message) {
    super(message, 'UNAUTHORIZED')
  }
}

export const getUserId = (auth) => {
  try {
    const token = auth.split('Bearer ')[1]
    const { id } = verify(token)
    return id
  } catch (e) {
    throw new UnauthorizedException(e.message)
  }
}

export const getUser = async (auth) => {
  try {
    const id = getUserId(auth)
    const user = await db().select('*').from('users').where('id', id).first()
    if (!user) throw new Error('No such user')

    if (user.photoId) {
      const photo = await db().select('*').from('images').where('id', user.photoId).first()

      if (photo) {
        user.photo = '/images/' + photo.path
      }
    }

    return user
  } catch (e) {
    throw new UnauthorizedException(e.message)
  }
}
