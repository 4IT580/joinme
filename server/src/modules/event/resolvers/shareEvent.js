import { db } from '../../../lib/db.js'

export default async (_, { eventId, invites }) => {
  for (const invite of invites) {
    const user = await getUser(invite)

    if (!user) throw new Error(`Unknown user ${invite}`)

    await db().insert({ eventId, userId: user.id }).into('invitations')
  }

  return true
}

const getUser = async (invite) => {
  if (invite.startsWith('@')) {
    return await db().select('*').from('users').where('username', invite.slice(1)).first()
  } else {
    return db().select('*').from('users').where('email', invite).first()
  }
}
