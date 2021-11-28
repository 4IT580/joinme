import { getUser } from '../../../lib/auth.js'
import { db } from '../../../lib/db.js'

export default async (_, params, { auth }) => {
  const user = await getUser(auth)

  await db().table('users').where('id', user.id).update(params)

  return await db()
    .select('*')
    .from('users as u')
    .leftJoin('images as i', 'u.photo_id', '=', 'i.photo_id')
    .where('u.id', user.id)
    .first()
}
