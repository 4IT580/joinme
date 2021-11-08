import { db } from '../../../lib/db.js'
import * as token from '../../../lib/token.js'
import * as argon2 from 'argon2'

export default async (_, params) => {
  const user = await db().select('*').from('users').where('email', params.email).first()

  if (!user) {
    //return generic message for login to hide which part is wrong
    throw new Error('Wrong email or password')
  }

  if (await argon2.verify(user.password, params.password)) {
    return { user: user, token: token.create({ id: user.id }) }
  } else {
    //return generic message for login to hide which part is wrong
    throw new Error('Wrong email or password')
  }
}
