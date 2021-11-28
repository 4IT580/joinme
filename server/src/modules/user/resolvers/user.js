import { db } from '../../../lib/db.js'

export default async (_, params) => {
  const user = await db().select('*').from('users').where('id', params.id).first()

  return {
    ...user,
    interests: user.interests?.split(',').filter(Boolean) ?? [],
  }
}
