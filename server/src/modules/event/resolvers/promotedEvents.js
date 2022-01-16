import { getUser } from '../../../lib/auth.js'
import { db } from '../../../lib/db.js'

export default async (_, __, { auth }) => {
  const user = await getUser(auth)

  const invitations = await db().pluck('event_id').from('invitations').where('user_id', user.id)

  const event = await db()
    .select('*')
    .from('events')
    .orderBy('from', 'asc')
    .where('public', true)
    .orWhereIn('id', invitations)
    .andWhere('to', '>', new Date())
    .andWhere('promoted', true)

  return event
}
