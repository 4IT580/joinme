import { db } from '../../../lib/db.js'

export default async (_, { invitationId }) => {
  await db().table('invitations').update({ accepted: true }).where('id', invitationId)

  return true
}
