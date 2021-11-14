import * as yup from 'yup'
import { randomBytes } from 'crypto'
import { db } from '../../../lib/db.js'
import * as mail from '../../../lib/mail.js'
import { FRONTEND_URL } from '../../../config.js'

export default async (_, params) => {
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
    html: `<p>Click <a href="${FRONTEND_URL}/reset-password?secret=${encodeURIComponent(
      ticket.secret,
    )}">here</a> to reset your password.</p>`,
  })

  return true
}
