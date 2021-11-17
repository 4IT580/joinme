import { ApolloError } from 'apollo-server'
import { verify } from './token.js'
import { db } from './db.js'

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
    return user
  } catch (e) {
    throw new UnauthorizedException(e.message)
  }
}
