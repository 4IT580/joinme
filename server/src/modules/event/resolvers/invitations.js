import { getUser } from '../../../lib/auth.js'
import { db } from '../../../lib/db.js'

export default async (_, __, { auth }) => {
  const user = await getUser(auth)

  const invitations = await db().select('*').from('invitations').where('userId', user.id).andWhereNot('accepted', true)

  return invitations
}
