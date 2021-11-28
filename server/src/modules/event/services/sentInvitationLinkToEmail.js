import { randomBytes } from 'crypto'
import { FRONTEND_URL } from '../../../config.js'
import { db } from '../../../lib/db.js'
import * as token from '../../../lib/token.js'
import { send } from '../../../lib/mail.js'

export default async (event, email) => {
  const user = await getUser(email)

  await send({
    to: email,
    subject: `Invitation to the "${event.name}" event!`,
    html: getEmailContent({ user, event }),
  })

  return user
}

const getUser = async (email) => {
  const user = await db().select('*').from('users').where('email', email).first()

  if (user) return user

  const [id] = await db()
    .insert({
      username: email,
      email: email,
      name: email,
      password: randomBytes(64).toString('base64'),
    })
    .into('users')

  return db().select('*').from('users').where('id', id).first()
}

const getEmailContent = ({ user, event }) => {
  const encodedToken = encodeURIComponent(token.create({ id: user.id }))
  const link = `${FRONTEND_URL}/event/${event.id}?token=${encodedToken}`

  return `You have been invited to the "${event.name}" event! Click <a href="${link}">here</a> to check it out!`
}
