import { db } from '../../../lib/db.js'
import { getUser, UnauthorizedException } from '../../../lib/auth.js'

export default async (_, { circleId, userId }, { auth }) => {
  const user = await getUser(auth)

  const circle = await db().select('*').from('circles').where('id', circleId).first()

  if (circle.ownerId !== user.id) throw new UnauthorizedException('This circle isnt yours')

  console.log(circle.id, userId)

  console.log(
    await db()
      .table('circle_memberships')
      .where({
        member_id: userId,
        circle_id: circle.id,
      })
      .delete(),
  )

  return true
}
