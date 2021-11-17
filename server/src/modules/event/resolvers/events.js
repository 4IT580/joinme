import { getUser } from '../../../lib/auth.js'
import { db } from '../../../lib/db.js'

export default async (_, __, { auth }) => {
  const user = await getUser(auth)

  const allowedEvents = await db().select('id').from('eventsUsers').where('userId', user.id)
  const allowedEventIds = allowedEvents.map((event) => event.id)

  return await db()
    .select('*')
    .from('events')
    .orderBy('from', 'asc')
    .where('public', true)
    .orWhere('userId', user.id)
    .orWhereIn('id', allowedEventIds)
}
