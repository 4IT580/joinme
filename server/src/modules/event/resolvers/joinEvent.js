import { getUser } from '../../../lib/auth.js'
import { db } from '../../../lib/db.js'

export default async (_, { eventId }, { auth }) => {
  const user = await getUser(auth)

  await db().insert({ eventId, userId: user.id }).into('eventsUsers')

  return true
}
