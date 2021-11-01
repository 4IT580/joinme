import { db } from '../../lib/db.js'
import * as argon2 from 'argon2'
import * as token from '../../lib/token.js'
import * as mail from '../../lib/mail.js'
import * as yup from 'yup'
import { randomBytes } from 'crypto'

export default async (_, params) => {
  try {
    return await transaction(() => {
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
    })
  } catch (e) {
    throw new Error(e)
  }
}
