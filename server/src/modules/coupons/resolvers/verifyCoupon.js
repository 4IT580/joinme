import { db } from '../../../lib/db.js'

export default async (_, { data }) => {
  const [username, value] = data.split(':')

  const user = await db().select('*').from('users').where('username', username).first()
  if (!user) throw new Error('Unknown user')

  const coupon = await db().select('*').from('coupons').where('value', value)
  if (!coupon) throw new Error('Unknown coupon')

  const ticket = await db().select('*').from('coupon_user').where({ coupon_id: coupon.id, user_id: user.id }).first()
  if (ticket) throw new Error('Coupon already claimed')

  await db().insert({ coupon_id: coupon.id, user_id: user.id }).into('coupon_user')

  return true
}
