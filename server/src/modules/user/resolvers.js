import { db } from '../../lib/db.js'
import * as argon2 from 'argon2'
import * as token from '../../lib/token.js'
import * as mail from '../../lib/mail.js'
import * as yup from 'yup'
import { randomBytes } from 'crypto'
import register from './resolvers/register.js'
import login from './resolvers/login.js'
import requestPasswordReset from './resolvers/requestPasswordReset.js'
import resetPassword from './resolvers/resetPassword.js'
import activateAccount from './resolvers/activateAccount.js'

const PASSWORD_RESET_TIMEOUT_MINUTES = 10

export default {
  Mutation: {
    register,
    login,
    requestPasswordReset,
    resetPassword,
    activateAccount,
  },
}
