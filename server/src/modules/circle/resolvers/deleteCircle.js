import { db } from '../../../lib/db.js'
import { getUser, UnauthorizedException } from '../../../lib/auth.js'

export default async (_, { circleId }, { auth }) => {
  const user = await getUser(auth)

  const circle = await db().select('*').from('circles').where('id', circleId).first()

  if (circle.ownerId !== user.id) throw new UnauthorizedException('This circle doesnt belong to you!')

  await db().table('circles').where('id', circleId).delete()

  return true
}
