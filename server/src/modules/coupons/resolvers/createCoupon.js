import { randomBytes } from 'crypto'
import * as yup from 'yup'
import { db } from '../../../lib/db.js'

export default async (_, { input }) => {
  await schema.validate(input)

  const event = await db().select('*').from('events').where('id', input.eventId).first()

  if (!event) throw new Error('Unknown event')

  const coupon = await db().transaction(async (t) => {
    const [id] = await t.insert({ ...input, value: randomBytes(8).toString('hex') }).into('coupons')

    return t.select('*').from('coupons').where('id', id).first()
  })

  return coupon
}

const schema = yup.object({
  eventId: yup.number().required('Event ID is required'),
  name: yup.string().required('Name is required'),
  description: yup.string(),
})
