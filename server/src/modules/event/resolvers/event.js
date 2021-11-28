import { getUser, UnauthorizedException } from '../../../lib/auth.js'
import { db } from '../../../lib/db.js'

export default async (_, { id }, { auth }) => {
  const user = await getUser(auth)

  const event = await db().select('*').from('events').where('id', id).first()

  if (!event) throw new Error('Unknown event')

  if (!event.public && event.userId !== user.id) {
    const record = await db()
      .select('id')
      .from('eventsUsers')
      .where('eventId', event.id)
      .where('userId', user.id)
      .first()

    if (!record) throw new UnauthorizedException('Private event')
  }

  return event
}
