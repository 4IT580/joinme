import { db } from '../../../lib/db.js'
import { getUser, UnauthorizedException } from '../../../lib/auth.js'

export default async (_, { circleId, eventId }, { auth }) => {
  const user = await getUser(auth)

  const circle = await db().select('*').from('circles').where('id', circleId).first()

  if (circle.ownerId !== user.id) throw new UnauthorizedException('This isnt your circle!')

  const members = await db()
    .select('users.id')
    .from('users')
    .join('circle_memberships', 'circle_memberships.member_id', '=', 'users.id')
    .where('circle_memberships.circle_id', circle.id)

  for (const member of members) {
    try {
      await db().insert({ eventId, userId: member.id }).into('invitations')
    } catch {
      // Do nothing
    }
  }

  return true
}
