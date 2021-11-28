import { PubSub, withFilter } from 'graphql-subscriptions'
import { db } from '../../lib/db.js'
import messages from './resolvers/messages.js'
import sendMessage from './resolvers/sendMessage.js'

const pubsub = new PubSub()

export default {
  Query: {
    messages,
  },
  Mutation: {
    sendMessage,
  },
  Subscription: {
    messageSent: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(['MESSAGE_SENT']),
        (payload, variables) => payload.messageSent.eventId === variables.eventId,
      ),
    },
  },
  Message: {
    event: async (parent) => {
      return await db()
        .select('*')
        .from('events')
        .leftJoin('images', 'events.photo_id', '=', 'images.photo_id')
        .where('id', parent.eventId)
        .first()
    },
    user: async (parent) => {
      return db().select('*').from('users').where('id', parent.userId).first()
    },
  },
}

export const publishSentMessage = (message) => pubsub.publish('MESSAGE_SENT', { messageSent: message })
