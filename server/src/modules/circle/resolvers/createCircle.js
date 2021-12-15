import * as yup from 'yup'
import { db } from '../../../lib/db.js'
import { getUser } from '../../../lib/auth.js'

export default async (_, { input, invites }, { auth }) => {
  await schema.validate(input)

  const user = await getUser(auth)

  const circle = await db().transaction(async (t) => {
    const [id] = await t.insert({ ...input, ownerId: user.id }).into('circles')

    for (const email of invites.split(' ').filter(Boolean)) {
      const user = await t.select('*').from('users').where('email', email).first()

      await t.insert({ accepted: false, memberId: user.id, circleId: id }).into('circle_memberships')
    }

    return t.select('*').from('circles').where('id', id).first()
  })

  return circle
}

const schema = yup.object({
  name: yup.string().required('Name is required'),
  description: yup.string(),
  colour: yup.string().required('Colour is required'),
})
