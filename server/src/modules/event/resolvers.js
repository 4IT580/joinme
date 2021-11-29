import { db } from '../../lib/db.js'
import createEvent from './resolvers/createEvent.js'
import joinEvent from './resolvers/joinEvent.js'
import updateEvent from './resolvers/updateEvent.js'
import shareEvent from './resolvers/shareEvent.js'
import acceptInvitation from './resolvers/acceptInvitation.js'
import declineInvitation from './resolvers/declineInvitation.js'
import events from './resolvers/events.js'
import event from './resolvers/event.js'
import invitations from './resolvers/invitations.js'
import { BACKEND_URL } from '../../config.js'

export default {
  Query: {
    events,
    event,
    invitations,
  },
  Mutation: {
    createEvent,
    joinEvent,
    updateEvent,
    shareEvent,
    acceptInvitation,
    declineInvitation,
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
    file: async (parent) => {
      const file = await db().select('*').from('images').where('id', parent.photoId).first()

      if (!file) {
        return { path: '' }
      }

      file.path = BACKEND_URL + '/images/' + file.path

      return file
    },
  },
  Invitation: {
    event: async (parent) => {
      return await db().select('*').from('events').where('id', parent.eventId).first()
    },
  },
}
