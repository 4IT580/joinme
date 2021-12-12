import { FRONTEND_URL } from '../../../config.js'
import * as token from '../../../lib/token.js'
import { send } from '../../../lib/mail.js'
import fetchOrCreateUser from './fetchOrCreateUser.js'

export default async (event, email) => {
  const user = await fetchOrCreateUser(email)

  await send({
    to: email,
    subject: `Invitation to the "${event.name}" event!`,
    html: getEmailContent({ user, event }),
  })

  return user
}

const getEmailContent = ({ user, event }) => {
  const encodedToken = encodeURIComponent(token.create({ id: user.id }))
  const link = `${FRONTEND_URL}/event/${event.id}?token=${encodedToken}`

  return `You have been invited to the "${event.name}" event! Click <a href="${link}">here</a> to check it out!`
}
