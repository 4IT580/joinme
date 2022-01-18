import { getUser } from '../../../lib/auth.js'
import { db } from '../../../lib/db.js'

export default async (_, __, { auth }) => {
  const user = await getUser(auth)

  const invitations = await db().select('*').from('invitations').where('user_id', user.id)

  return invitations.filter((invitation) => !invitations.accepted)
}
