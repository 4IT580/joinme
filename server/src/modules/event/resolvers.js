import { db } from '../../lib/db.js'
import createEvent from './resolvers/createEvent.js'
import joinEvent from './resolvers/joinEvent.js'
import updateEvent from './resolvers/updateEvent.js'
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
  },
  Event: {
    user: async (parent) => {
      return await db().select('*').from('users').where('id', parent.userId).first()
    },
    attendees: async (parent) => {
      const userIds = await db().pluck('user_id').from('events_users').where('event_id', parent.id)

      return await db().select('*').from('users').whereIn('id', userIds)
    },
    messages: async (parent) => {
      return await db().select('*').from('messages').where('eventId', parent.id)
    },
  },
}
