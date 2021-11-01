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
