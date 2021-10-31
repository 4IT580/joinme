import { db } from '../../lib/db.js'
import * as argon2 from 'argon2'
import { createToken, verifyToken } from '../../lib/token.js'
import * as yup from 'yup'
import { randomBytes } from 'crypto'
const PASSWORD_RESET_TIMEOUT_MINUTES = 10

export default {
  Query: {
    users: async () => await db().select('*').from('users'),
  },
  Mutation: {
    register: async (_, params) => {
      try {
        const loginSchema = yup.object({
          handle: yup.string().min(3).max(6).required('Handle is required'),
          name: yup.string().min(3).max(50).required('Name is required'),
          email: yup.string().email().required('Email is required'),
          password: yup.string().required('Password is required'),
        })

        //validation will throw error, we do not need to save the result
        await loginSchema.validate(params)

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
    passwordResetRequest: async (_, params) => {
      try {
        const resetSchema = yup.object({
          email: yup.string().email().required('Email is required'),
        })

        //validation will throw error, we do not need to save the result
        await resetSchema.validate(params)

        const user = await db().select('*').from('users').where('email', params.email).first()

        if (!user) {
          return new Error('No such user')
        }

        const ticket = {
          userId: user.id,
          secret: randomBytes(64).toString('base64'),
        }

        await db().insert(ticket).into('passwordResetTickets')

        //TODO send email

        return 'OK'
      } catch (e) {
        return new Error(e)
      }
    },
    resetPassword: async (_, params) => {
      const ticket = await db()
        .select('*')
        .from('passwordResetTickets')
        .where('used', false)
        .where('secret', params.secret)
        .first()

      if (!ticket) {
        return new Error('No such ticket')
      }

      const ticketValidity = new Date(new Date(ticket.requested).getTime() + PASSWORD_RESET_TIMEOUT_MINUTES * 60000)

      if (Date.now() > ticketValidity.getTime()) {
        await db().from('passwordResetTickets').where('id', ticket.id).update('used', true)
        return new Error('Ticket timed out')
      }

      const user = await db().select('*').from('users').where('id', ticket.userId).first()

      if (!user) {
        return new Error('Bad user')
      }

      await db()
        .from('users')
        .where('id', user.id)
        .update('password', await argon2.hash(params.password))

      await db().from('passwordResetTickets').where('id', ticket.id).update('used', true)

      return { user: user, token: createToken({ id: user.id }) }
    },
  },
}
