import { createWriteStream, fstat, mkdir } from 'fs/promises'
import { IMG_FOLDER } from '../../../config.js'
import { createHash, randomUUID } from 'crypto'

class FileUploadException extends ApolloError {
  constructor(message) {
    super(message, 'UNABLETOUPLOAD')
  }
}

export default async (_, params, { auth, file }) => {
  try {
    const { createReadStream, filename, mimetype, encoding } = await file

    //make sure base path is initialized
    await mkdir(IMG_FOLDER, { recursive: true })

    const stream = createReadStream()

    const out = createWriteStream(path.join(IMG_FOLDER, ''))
  } catch (e) {
    throw new FileUploadException(e)
  }
}
