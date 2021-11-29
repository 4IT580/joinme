import { db } from '../../../lib/db.js'
import fetchOrCreateUser from '../services/fetchOrCreateUser.js'

export default async (_, { eventId, invites }) => {
  for (const invite of invites) {
    const user = await fetchOrCreateUser(invite)

    if (!user) throw new Error(`Unknown user ${invite}`)

    try {
      await db().insert({ eventId, userId: user.id }).into('invitations')
    } catch {
      throw new Error(`User ${invite} already invited`)
    }
  }

  return true
}
