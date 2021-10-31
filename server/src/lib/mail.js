import mail from '@sendgrid/mail'

const apiKey = process.env.SENDGRID_API_KEY
const enabled = !!apiKey

if (enabled) mail.setApiKey(apiKey)

export const send = async ({ to, subject, html }) => {
  if (!enabled) return

  await mail.send({
    to,
    from: 'mail@adamjedlicka.cz',
    subject,
    html,
  })
}
