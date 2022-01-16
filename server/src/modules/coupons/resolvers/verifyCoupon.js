import { db } from '../../../lib/db.js'

export default async (_, { data }) => {
  const [username, value] = data.split(':')

  const user = await db().select('*').from('users').where('username', username).first()
  if (!user) throw new Error('Unknown user')

  const coupon = await db().select('*').from('coupons').where('value', value).first()
  if (!coupon) throw new Error('Unknown coupon')

  const ticket = await db().select('*').from('coupon_user').where({ couponId: coupon.id, userId: user.id }).first()
  if (ticket) throw new Error('Coupon already claimed')

  await db().insert({ couponId: coupon.id, userId: user.id }).into('coupon_user')

  return coupon
}
