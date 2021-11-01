export default async (_, params) => {
  const resetSchema = yup.object({
    email: yup.string().email().required('Email is required'),
  })

  await resetSchema.validate(params)

  const user = await db().select('*').from('users').where('email', params.email).first()

  if (!user) {
    throw new Error('No such user')
  }

  const ticket = {
    userId: user.id,
    secret: randomBytes(64).toString('base64'),
  }

  await db().insert(ticket).into('passwordResetTickets')

  await mail.send({
    to: params.email,
    subject: 'Password reset',
    html: `<p>Click <a href="${process.env.FRONTEND_URL}/reset-password?secret=${encodeURIComponent(
      ticket.secret,
    )}">here</a> to reset your password.</p>`,
  })

  return true
}
