import { db } from '../../../lib/db.js'
import fetchOrCreateUser from '../services/fetchOrCreateUser.js'
import sentInvitationLinkToEmail from '../services/sentInvitationLinkToEmail.js'

export default async (_, { eventId, invites }) => {
  for (const invite of invites) {
    const user = await fetchOrCreateUser(invite)

    if (!user) throw new Error(`Unknown user ${invite}`)

    const event = await db().select('*').from('events').where('id', eventId)

    if (!event) throw new Error(`Unknown event with ID ${eventId}`)

    await sentInvitationLinkToEmail(event, invite)

    try {
      await db().insert({ eventId, userId: user.id }).into('invitations')
    } catch {
      throw new Error(`User ${invite} already invited`)
    }
  }

  return true
}
