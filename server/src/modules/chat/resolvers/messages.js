import { db } from '../../../lib/db.js'

export default async (_, { eventId }) => {
  return await db().select('*').from('messages').where('eventId', eventId).orderBy('created_at', 'desc')
}
