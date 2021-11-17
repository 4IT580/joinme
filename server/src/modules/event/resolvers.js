import { db } from '../../lib/db.js'
import createEvent from './resolvers/createEvent.js'
import events from './resolvers/events.js'

export default {
  Query: {
    events,
  },
  Mutation: {
    createEvent,
  },
  Event: {
    user: (parent) => db().select('*').from('users').where('id', parent.userId).first(),
  },
}
