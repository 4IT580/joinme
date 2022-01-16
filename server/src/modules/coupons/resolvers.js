import { db } from '../../lib/db.js'
import createCoupon from './resolvers/createCoupon.js'
import verifyCoupon from './resolvers/verifyCoupon.js'

export default {
  Mutation: {
    createCoupon,
    verifyCoupon,
  },
  Event: {
    coupons: async (parent) => {
      return await db().select('*').from('coupons').where('eventId', parent.id)
    },
  },
}
