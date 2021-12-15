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
    html: `<div style="flex-wrap: wrap; justify-content: center; text-align: center;">
  <div style="padding-top: 2rem; padding-bottom: 2rem; background-color: #1A1A1A"><img src="${FRONTEND_URL}/maillogo.png" alt="join.me logo" style="max-width: 250px"></div>

  <div style="padding-top: 2rem; font-size: 1.5rem;
  line-height: 2rem; font-weight: 700; margin-left: 4rem;
  margin-right: 4rem;"> <p>Password Reset </p>
</div>

<div style="font-size: 1rem; line-height: 1.75rem; margin-left: 3rem; margin-right: 3rem; ">
<p>If you forgot your password or wish to reset it, press the button below to do it</p></div>

<div style="margin-left: 4rem; margin-right: 4rem; padding-top: 1rem; padding-bottom: 4rem; "><a href="${FRONTEND_URL}/reset-password?secret=${encodeURIComponent(
  ticket.secret,
)}" style="background-color: #FB165E;
border: none;
border-radius: 12px;
color: white;
padding: 12px 20px;
text-decoration: none;
font-size: 16px;
font-weight: 700;
cursor: pointer;">RESET PASSWORD</a>
</div>

<div style="font-size: 0.75rem; line-height: 1.25rem; margin-left: 4rem; margin-right: 4rem; padding-bottom: 1rem; color: #4D4D4D;">
<p>If you haven't requested the password reset, you can safely ignore this email. Only a person with access to your email can reset your password.</p></div>

<div style=" padding-top: 1rem; padding-bottom: 2rem; font-size: 1rem;
line-height: 1.75rem; background-color: #E5E5E5; color: #4D4D4D;">
 <div>sincerely yours, team joinme ;)</div>
<a href="https://joinme.cz">joinme.cz</a></div>

    `,
  })

  return true
}
