import { getUser } from '../../../lib/auth.js'
import { db } from '../../../lib/db.js'

export default async (_, { eventId }, { auth }) => {
  const user = await getUser(auth)

  const invitation = await db()
    .select('*')
    .from('invitations')
    .where('eventId', eventId)
    .andWhere('userId', user.id)
    .first()

  if (!invitation) {
    await db().insert({ eventId, userId: user.id, accepted: true }).into('invitations')
  } else {
    await db().table('invitations').update({ accepted: true }).where('eventId', eventId).andWhere('userId', user.id)
  }

  return true
}
