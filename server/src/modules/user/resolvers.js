import { db } from '../../lib/db.js'
import * as argon2 from 'argon2'
import { createToken, verifyToken } from '../../lib/token.js'

export default {
  Query: {
    users: async () => await db().select('*').from('users'),
  },
  Mutation: {
    register: async (_, params) => {
      try {
        const isHandleTaken = await db().select('*').from('users').where('handle', params.handle).first()

        if (isHandleTaken) {
          return new Error('Handle is taken')
        }

        const isEmailTaken = await db().select('*').from('users').where('email', params.email).first()

        if (isEmailTaken) {
          return new Error('Email is taken')
        }

        const user = {
          ...params,
          password: await argon2.hash(params.password),
        }

        const [id] = await db().insert(user).into('users')

        return { user: await db().select('*').from('users').where('id', id).first(), token: createToken({ id: id }) }
      } catch (e) {
        return new Error(e)
      }
    },
    login: async (_, params) => {
      const user = await db().select('*').from('users').where('email', params.email).first()

      if (!user) {
        //return generic message for login to hide which part is wrong
        return new Error('Wrong email or password')
      }

      if (await argon2.verify(user.password, params.password)) {
        return { user: user, token: createToken({ id: user.id }) }
      } else {
        //return generic message for login to hide which part is wrong
        return new Error('Wrong email or password')
      }
    },
    authenticate: async (_, params) => {
      const result = await db().select('*').from('users').where('email', params.email).first()
      return  (result?.password ?? '') === params.password
    },
  },

}
