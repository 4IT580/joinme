import { getUser } from '../../../lib/auth.js'
import { db } from '../../../lib/db.js'

export default async (_, __, { auth }) => {
  const user = await getUser(auth)

  const invitations = await db()
    .pluck('event_id')
    .from('invitations')
    .where('user_id', user.id)
    .andWhere('accepted', true)

  const events = await db()
    .select('*')
    .from('events')
    .orderBy('from', 'asc')
    .whereIn('id', invitations)
    .andWhereNot('userId', user.id)

  return events
}
