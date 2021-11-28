import { db } from '../../../lib/db.js'

export default async (_, { eventId, input }) => {
  const event = db().transaction(async (t) => {
    await t.table('events').update(input).where('id', eventId)

    return await t.select('*').from('events').where('id', eventId).first()
  })

  return event
}
