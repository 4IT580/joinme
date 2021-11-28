import { mkdir, unlink } from 'fs/promises'
import { createWriteStream } from 'fs'
import { IMG_FOLDER, BACKEND_URL } from '../../../config.js'
import { randomBytes } from 'crypto'
import { db } from '../../../lib/db.js'
import path from 'path'
import { finished } from 'stream/promises'
import { getUser } from '../../../lib/auth.js'
import { ApolloError } from 'apollo-server'

class FileUploadException extends ApolloError {
  constructor(message) {
    super(message, 'UNABLETOUPLOAD')
  }
}

export default async (_, { file }, { auth }) => {
  try {
    const user = await getUser(auth)

    const { createReadStream, filename, mimetype, encoding } = await file
    const fileExtension = path.extname(filename)

    const randPath = await MakeUniquePath(fileExtension)
    const fullPath = path.join(IMG_FOLDER, randPath)

    //make sure base path is initialized
    await mkdir(path.dirname(fullPath), { recursive: true })

    const stream = createReadStream()

    const out = createWriteStream(fullPath)
    stream.pipe(out)

    await finished(out)

    const image = {
      path: randPath,
      filename: filename,
      mimetype: mimetype,
      encoding: encoding,
    }

    const newPhotoId = await db().insert(image).returning('id').into('images')

    if (user.photoId) {
      DeleteOldPhoto(user.photoId)
    }

    await db().table('users').update('photo_id', newPhotoId[0]).where('id', user.id)

    return BACKEND_URL + '/images/' + randPath
  } catch (e) {
    throw new FileUploadException(e)
  }
}

async function DeleteOldPhoto(photoId) {
  const photo = await db().select('*').from('images').where('photo_id', photoId).first()

  if (photo) {
    await unlink(path.join(IMG_FOLDER, photo.path))

    await db().table('images').where('photo_id', photoId).del()
  }
}

async function MakeUniquePath(fileExtension) {
  while (true) {
    //make path and name for the file - random bytes with 4 buckets
    const randPath =
      randomBytes(2).toString('hex') +
      '/' +
      randomBytes(2).toString('hex') +
      '/' +
      randomBytes(2).toString('hex') +
      '/' +
      randomBytes(10).toString('hex') +
      fileExtension

    const fileByPath = await db().select('*').from('images').where('path', randPath).first()

    if (!fileByPath) {
      return randPath
    }
  }
}
