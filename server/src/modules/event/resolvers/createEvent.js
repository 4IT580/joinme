import * as yup from 'yup'
import { db } from '../../../lib/db.js'
import { getUser } from '../../../lib/auth.js'
import sentInvitationLinkToEmail from '../services/sentInvitationLinkToEmail.js'

export default async (_, { input, invites }, { auth }) => {
  await schema.validate(input)

  const user = await getUser(auth)

  const event = await db().transaction(async (t) => {
    const [id] = await t.insert({ ...input, userId: user.id }).into('events')

    return t.select('*').from('events').where('id', id).first()
  })

  for (const invite of invites.split(' ').filter(Boolean)) {
    sentInvitationLinkToEmail(event, invite)
      .then((user) => db().insert({ eventId: event.id, userId: user.id }).into('eventsUsers'))
      .catch(console.error)
  }

  return event
}

const schema = yup.object({
  name: yup.string().required('Name is required'),
  from: yup.string().required('From is required'),
  to: yup.string().required('To is required'),
})
