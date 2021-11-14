import { getUser } from '../../../lib/auth.js'
import { db } from '../../../lib/db.js'

export default async (_, params, { auth }) => {
  const user = await getUser(auth)

  await db().table('users').where('id', user.id).update(params)

  return await db().select('*').from('users').where('id', user.id).first()
}
