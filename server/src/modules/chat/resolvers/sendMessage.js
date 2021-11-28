import * as yup from 'yup'
import { db } from '../../../lib/db.js'
import { getUser } from '../../../lib/auth.js'
import { publishSentMessage } from '../resolvers.js'

export default async (_, { input }, { auth }) => {
  await schema.validate(input)

  const user = await getUser(auth)

  const message = await db().transaction(async (t) => {
    const [id] = await t.insert({ ...input, userId: user.id }).into('messages')

    return t.select('*').from('messages').where('id', id).first()
  })

  publishSentMessage(message)

  return message
}

const schema = yup.object({
  text: yup.string().required('Text is required'),
  eventId: yup.number().required('Event ID is required'),
})
