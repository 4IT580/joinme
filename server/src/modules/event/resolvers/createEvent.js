import * as yup from 'yup'
import { db } from '../../../lib/db.js'
import { getUser } from '../../../lib/auth.js'

export default async (_, { input }, { auth }) => {
  await schema.validate(input)

  const user = await getUser(auth)

  return db().transaction(async (t) => {
    const [id] = await t.insert({ ...input, userId: user.id }).into('events')

    return t.select('*').from('events').where('id', id).first()
  })
}

const schema = yup.object({
  name: yup.string().required('Name of the event is required'),
})
