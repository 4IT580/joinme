import { db } from '../../../lib/db.js'
import * as token from '../../../lib/token.js'
import * as argon2 from 'argon2'

const PASSWORD_RESET_TIMEOUT_MINUTES = 10

export default async (_, params) => {
  return await db().transaction(async (t) => {
    const ticket = await t
      .select('*')
      .from('passwordResetTickets')
      .where('used', false)
      .where('secret', params.secret)
      .first()

    if (!ticket) {
      throw new Error('No such ticket')
    }

    const ticketValidity = new Date(new Date(ticket.requested).getTime() + PASSWORD_RESET_TIMEOUT_MINUTES * 60000)

    if (Date.now() > ticketValidity.getTime()) {
      await t.table('passwordResetTickets').update('used', true).where('id', ticket.id)
      throw new Error('Ticket timed out')
    }

    const user = await t.select('*').from('users').where('id', ticket.userId).first()

    if (!user) {
      throw new Error('Bad user')
    }

    await t
      .table('users')
      .update('password', await argon2.hash(params.password))
      .where('id', user.id)

    await t.table('passwordResetTickets').update('used', true).where('id', ticket.id)

    return {
      user: await t.select('*').from('users').where('id', user.id).first(),
      token: token.create({ id: user.id }),
    }
  })
}
