import { randomBytes } from 'crypto'
import { db } from '../../../lib/db.js'

export default async (invite) => {
  if (invite.startsWith('@')) {
    return await db().select('*').from('users').where('username', invite.slice(1)).first()
  } else if (invite.includes('@')) {
    const email = invite

    const user = await db().select('*').from('users').where('email', email).first()

    if (user) return user

    const [id] = await db()
      .insert({
        username: email.replace(/@.+$/, ''),
        email: email,
        name: email,
        password: randomBytes(64).toString('base64'),
      })
      .into('users')

    return db().select('*').from('users').where('id', id).first()
  } else {
    return null
  }
}
