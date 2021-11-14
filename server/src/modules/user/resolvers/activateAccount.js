import { db } from '../../../lib/db.js'

const ACTIVATE_ACCOUNT_TIMEOUT_MINUTES = 10

export default async (_, params) => {
  const ticket = await db()
    .select('*')
    .from('userActivationTickets')
    .where('used', false)
    .where('secret', params.secret)
    .first()

  if (!ticket) {
    throw new Error('Invalid link')
  }

  const ticketValidity = new Date(new Date(ticket.requested).getTime() + ACTIVATE_ACCOUNT_TIMEOUT_MINUTES * 60000)

  if (Date.now() > ticketValidity.getTime()) {
    await db().table('userActivationTickets').update('used', true).where('id', ticket.id)
    throw new Error('Invalid ticket')
  }

  const user = await db().select('*').from('users').where('id', ticket.userId).first()

  if (!user) {
    throw new Error('Invalid user')
  }

  await db().table('users').update('activated', true).where('id', user.id)

  await db().table('userActivationTickets').update('used', true).where('id', ticket.id)

  return true
}
