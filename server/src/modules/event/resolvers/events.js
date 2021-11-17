import { getUser } from '../../../lib/auth.js'
import { db } from '../../../lib/db.js'

export default async (_, __, { auth }) => {
  const user = await getUser(auth)

  const allowedEvents = await db().pluck('event_id').from('eventsUsers').where('userId', user.id)

  return await db()
    .select('*')
    .from('events')
    .orderBy('from', 'asc')
    .where('public', true)
    .orWhere('userId', user.id)
    .orWhereIn('id', allowedEvents)
}
