import { getUser, UnauthorizedException } from '../../../lib/auth.js'
import { db } from '../../../lib/db.js'

export default async (_, { id }, { auth }) => {
  const user = await getUser(auth)

  const event = await db()
    .select('*')
    .from('events')
    .leftJoin('images', 'events.photo_id', '=', 'images.photo_id')
    .where('events.id', id)
    .first()

  if (!event) throw new Error('Unknown event')

  if (!event.public && event.userId !== user.id) {
    const ivnited = await db()
      .select('id')
      .from('invitations')
      .where('eventId', event.id)
      .where('userId', user.id)
      .first()

    if (!ivnited) throw new UnauthorizedException('Private event')
  }

  return event
}
