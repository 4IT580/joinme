import { getUser } from '../../../lib/auth.js'
import { db } from '../../../lib/db.js'

export default async (_, __, { auth }) => {
  const user = await getUser(auth)

  return await db().select('*').from('events').where('public', true).orWhere('userId', user.id)
}
