import { db } from '../../../lib/db.js'

export default async (_, { circleId }) => {
  const circle = await db().select('*').from('circles').where('id', circleId)

  return circle
}
