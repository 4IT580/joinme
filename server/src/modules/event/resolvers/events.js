import { getUser } from '../../../lib/auth.js'
import { db } from '../../../lib/db.js'

export default async (_, __, { auth }) => {
  const user = await getUser(auth)

  const invitations = await db().pluck('event_id').from('invitations').where('user_id', user.id)

  const event = await db()
    .select('*')
    .from('events')
    .leftJoin('images', 'events.photo_id', '=', 'images.photo_id')
    .orderBy('from', 'asc')
    .where('public', true)
    .orWhereIn('events.id', invitations)

  return event
}
