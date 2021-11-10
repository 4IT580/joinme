import * as yup from 'yup'
import * as argon2 from 'argon2'
import { randomBytes } from 'crypto'
import { db } from '../../../lib/db.js'
import * as token from '../../../lib/token.js'
import * as mail from '../../../lib/mail.js'
import { FRONTEND_URL } from '../../../config.js'

export default async (_, params) => {
  return await db().transaction(async (t) => {
    const loginSchema = yup.object({
      username: yup.string().min(3).max(20).required('Username is required'),
      name: yup.string().min(3).max(50).required('Name is required'),
      email: yup.string().email().required('Email is required'),
      password: yup
        .string()
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!\-@#\$%\^&\*])(?=.{8,})/)
        .required('Password is required'),
    })

    await loginSchema.validate(params)

    const isUsernameTaken = await t.select('*').from('users').where('username', params.username).first()

    if (isUsernameTaken) {
      throw new Error('Username is taken')
    }

    const isEmailTaken = await t.select('*').from('users').where('email', params.email).first()

    if (isEmailTaken) {
      throw new Error('Email is taken')
    }

    const user = {
      ...params,
      password: await argon2.hash(params.password),
    }

    const [id] = await t.insert(user).into('users')

    const ticket = {
      userId: id,
      secret: randomBytes(64).toString('base64'),
    }

    await t.insert(ticket).into('userActivationTickets')

    await mail.send({
      to: params.email,
      subject: 'Joinme registration',
      html: getRegistrationMailContent({
        name: params.name,
        secret: ticket.secret,
      }),
    })

    return {
      user: await t.select('*').from('users').where('id', id).first(),
      token: token.create({ id }),
    }
  })
}

const getRegistrationMailContent = ({ name, secret }) => {
  const encodedSecret = encodeURIComponent(secret)
  const link = `${FRONTEND_URL}/activate-account?secret=${encodedSecret}`

  return `<p>Hello, ${name}! Click <a href="${link}">here</a> to activate your account.</p>`
}
