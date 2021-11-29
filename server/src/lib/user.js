import { db } from './db.js'
import { BACKEND_URL } from '../config.js'

export const getUserWithImageById = async (id) => {
  let user = await db().select('*').from('users').where('id', id).first()
  if (!user) throw new Error('No such user')

  if (user.photoId) {
    const photo = await db().select('*').from('images').where('id', user.photoId).first()

    if (photo) {
      const userWithPhoto = { ...user, photo: BACKEND_URL + '/images/' + photo.path }

      return userWithPhoto
    }
  }

  return user
}
