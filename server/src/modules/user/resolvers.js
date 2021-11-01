import { db } from '../../lib/db.js'
import * as argon2 from 'argon2'
import * as token from '../../lib/token.js'
import * as mail from '../../lib/mail.js'
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
          username: yup.string().min(3).max(20).required('Username is required'),
          name: yup.string().min(3).max(50).required('Name is required'),
          email: yup.string().email().required('Email is required'),
          password: yup
            .string()
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!\-@#\$%\^&\*])(?=.{8,})/)
            .required('Password is required'),
        })

        // validation will throw error, we do not need to save the result
        await loginSchema.validate(params)

        const isUsernameTaken = await db().select('*').from('users').where('username', params.username).first()

        if (isUsernameTaken) {
          throw new Error('Username is taken')
        }

        const isEmailTaken = await db().select('*').from('users').where('email', params.email).first()

        if (isEmailTaken) {
          throw new Error('Email is taken')
        }

        const user = {
          ...params,
          password: await argon2.hash(params.password),
        }

        const [id] = await db().insert(user).into('users')

        const ticket = {
          userId: id,
          secret: randomBytes(64).toString('base64'),
        }

        await db().insert(ticket).into('userActivationTickets')

        await mail.send({
          to: params.email,
          subject: 'Joinme registration',
          html: `<p>Hello, ${params.name}! Click <a href="${
            process.env.FRONTEND_URL
          }/activate-account?secret=${encodeURIComponent(ticket.secret)}">here</a> to activate your account.</p>`,
        })

        return { user: await db().select('*').from('users').where('id', id).first(), token: token.create({ id: id }) }
      } catch (e) {
        throw new Error(e)
      }
    },
    login: async (_, params) => {
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
    },
    requestPasswordReset: async (_, params) => {
      const resetSchema = yup.object({
        email: yup.string().email().required('Email is required'),
      })

      await resetSchema.validate(params)

      const user = await db().select('*').from('users').where('email', params.email).first()

      if (!user) {
        throw new Error('No such user')
      }

      const ticket = {
        userId: user.id,
        secret: randomBytes(64).toString('base64'),
      }

      await db().insert(ticket).into('passwordResetTickets')

      await mail.send({
        to: params.email,
        subject: 'Password reset',
        html: `<p>Click <a href="${process.env.FRONTEND_URL}/reset-password?secret=${encodeURIComponent(
          ticket.secret,
        )}">here</a> to reset your password.</p>`,
      })

      return true
    },
    resetPassword: async (_, params) => {
      const ticket = await db()
        .select('*')
        .from('passwordResetTickets')
        .where('used', false)
        .where('secret', params.secret)
        .first()

      if (!ticket) {
        throw new Error('No such ticket')
      }

      const ticketValidity = new Date(new Date(ticket.requested).getTime() + PASSWORD_RESET_TIMEOUT_MINUTES * 60000)

      if (Date.now() > ticketValidity.getTime()) {
        await db().table('passwordResetTickets').update('used', true).where('id', ticket.id)
        throw new Error('Ticket timed out')
      }

      const user = await db().select('*').from('users').where('id', ticket.userId).first()

      if (!user) {
        throw new Error('Bad user')
      }

      await db()
        .table('users')
        .update('password', await argon2.hash(params.password))
        .where('id', user.id)

      await db().table('passwordResetTickets').update('used', true).where('id', ticket.id)

      return true
    },
    activateAccount: async (_, params) => {
      const ticket = await db()
        .select('*')
        .from('userActivationTickets')
        .where('used', false)
        .where('secret', params.secret)
        .first()

      if (!ticket) {
        throw new Error('Invalid link')
      }

      const ticketValidity = new Date(new Date(ticket.requested).getTime() + PASSWORD_RESET_TIMEOUT_MINUTES * 60000)

      if (Date.now() > ticketValidity.getTime()) {
        await db().table('userActivationTickets').update('used', true).where('id', ticket.id)
        throw new Error('Invalid ticket')
      }

      const user = await db().select('*').from('users').where('id', ticket.userId).first()

      if (!user) {
        throw new Error('Invalid user')
      }

      await db().table('users').update('activated', true).where('id', user.id)

      await db().table('userActivationTickets').update('used', true).where('id', ticket.id)

      return true
    },
  },
}
