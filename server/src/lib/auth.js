import { ApolloError } from 'apollo-server'
import { verify } from './token.js'
import { getUserWithImageById } from './user.js'

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

    const user = await getUserWithImageById(id)

    return user
  } catch (e) {
    throw new UnauthorizedException(e.message)
  }
}
