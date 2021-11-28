import { db } from '../../../lib/db.js'

export default async (_, { eventId, input }) => {
  const event = db().transaction(async (t) => {
    await t.table('events').update(input).where('id', eventId)

    return await t
      .select('e.*')
      .from('events')
      .leftJoin('images', 'events.photo_id', '=', 'images.photo_id')
      .where('e.id', eventId)
      .first()
  })

  return event
}
