import { db } from '../../../lib/db.js'
import { getUser, UnauthorizedException } from '../../../lib/auth.js'

export default async (_, { circleId, invites }, { auth }) => {
  const user = await getUser(auth)

  const circle = await db().select('*').from('circles').where('id', circleId).first()

  if (circle.ownerId != user.id) throw new UnauthorizedException('This isnot your circle!')

  for (const email of invites.split(' ').filter(Boolean)) {
    try {
      const user = await db().select('*').from('users').where('email', email).first()

      await db().insert({ accepted: false, memberId: user.id, circleId }).into('circle_memberships')
    } catch {
      // Do nothing
    }
  }

  return true
}
