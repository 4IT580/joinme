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
      subject: 'Joinme - account activation',
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

  return `<div style="flex-wrap: wrap; justify-content: center; text-align: center;">
  <div style="padding-top: 2rem; padding-bottom: 2rem; background-color: #1A1A1A"><img src="${FRONTEND_URL}/maillogo.png" alt="join.me logo"></div>

  <div style="padding-top: 2rem; font-size: 1.5rem;
  line-height: 2rem; font-weight: 700; margin-left: 4rem;
  margin-right: 4rem;"> <p>We are happy you joined us, ${name}! </p>
</div>

<div style="font-size: 1rem; line-height: 1.75rem; margin-left: 3rem; margin-right: 3rem; ">
<p>To get you started we need to confirm your email address. Please press the button below to activate your account
</p></div>

<div style="margin-left: 4rem; margin-right: 4rem; padding-top: 1rem; padding-bottom: 4rem; "><a href="${link}" style="background-color: #FB165E;
border: none;
border-radius: 12px;
color: white;
padding: 12px 20px;
text-decoration: none;
font-size: 16px;
font-weight: 700;
cursor: pointer;">ACTIVATE ACCOUNT</a>
</div>

<div style=" padding-top: 1rem; padding-bottom: 2rem; font-size: 1rem;
line-height: 1.75rem; background-color: #E5E5E5; color: #4D4D4D;">
 <div>sincerely yours, team joinme ;)</div>
<a href="https://joinme.cz">joinme.cz</a></div>
`

}
