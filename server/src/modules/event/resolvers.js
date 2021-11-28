import { db } from '../../lib/db.js'
import createEvent from './resolvers/createEvent.js'
import joinEvent from './resolvers/joinEvent.js'
import updateEvent from './resolvers/updateEvent.js'
import shareEvent from './resolvers/shareEvent.js'
import events from './resolvers/events.js'
import event from './resolvers/event.js'

export default {
  Query: {
    events,
    event,
  },
  Mutation: {
    createEvent,
    joinEvent,
    updateEvent,
    shareEvent,
  },
  Event: {
    user: async (parent) => {
      return await db().select('*').from('users').where('id', parent.userId).first()
    },
    attendees: async (parent) => {
      const userIds = await db()
        .pluck('user_id')
        .from('invitations')
        .where('event_id', parent.id)
        .andWhere('accepted', true)

      return await db().select('*').from('users').whereIn('id', userIds)
    },
    messages: async (parent) => {
      return await db().select('*').from('messages').where('eventId', parent.id)
    },
  },
}
