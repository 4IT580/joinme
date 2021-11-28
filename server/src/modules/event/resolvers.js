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
      return await db()
        .select('*')
        .from('users as u')
        .leftJoin('images as i', 'u.photo_id', '=', 'i.photo_id')
        .where('u.id', parent.userId)
        .first()
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
  Invitation: {
    event: async (parent) => {
      return await db()
        .select('e.*, i.path as imagePath')
        .from('events as e')
        .leftJoin('images as i', 'e.photo_id', '=', 'i.photo_id')
        .where('e.id', parent.eventId)
        .first()
    },
  },
}
