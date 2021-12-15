import { db } from '../../../lib/db.js'
import * as yup from 'yup'
import { getUser } from '../../../lib/auth.js'

export default async (_, { circleId, input }, { auth }) => {
  await schema.validate(input)

  const user = await getUser(auth)

  const circle = await db().select('*').from('circles').where('id', circleId).first()

  if (circle.ownerId === user.id) {
    const updated = db().transaction(async (t) => {
      await t.table('circles').update(input).where('id', circleId)

      return await t.select('*').from('circles').where('id', circleId).first()
    })

    return updated
  }

  return circle
}

const schema = yup.object({
  name: yup.string().required('Name is required'),
  description: yup.string(),
  colour: yup.string().required('Colour is required'),
})
