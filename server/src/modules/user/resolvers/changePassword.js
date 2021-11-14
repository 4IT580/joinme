import { db } from '../../../lib/db.js'
import * as argon2 from 'argon2'
import { getUser } from '../../../lib/auth.js'
import * as yup from 'yup'

export default async (_, params, { auth }) => {
  const passwordSchema = yup.object({
    oldPassword: yup.string().required('Old password is required'),
    newPassword: yup
      .string()
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!\-@#\$%\^&\*])(?=.{8,})/)
      .required('New password is required'),
  })

  await passwordSchema.validate(params)

  const user = await getUser(auth)

  if (!(await argon2.verify(user.password, params.oldPassword))) {
    return new Error('Old password is wrong')
  }

  await db()
    .table('users')
    .update('password', await argon2.hash(params.newPassword))
    .where('id', user.id)

  return true
}
