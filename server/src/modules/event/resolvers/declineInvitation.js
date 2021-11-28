import { db } from '../../../lib/db.js'

export default async (_, { invitationId }) => {
  await db().table('invitations').where('id', invitationId).delete()

  return true
}
