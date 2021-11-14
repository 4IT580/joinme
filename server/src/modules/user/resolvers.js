import me from './resolvers/me.js'
import register from './resolvers/register.js'
import login from './resolvers/login.js'
import requestPasswordReset from './resolvers/requestPasswordReset.js'
import resetPassword from './resolvers/resetPassword.js'
import activateAccount from './resolvers/activateAccount.js'

export default {
  Query: {
    me,
  },
  Mutation: {
    register,
    login,
    requestPasswordReset,
    resetPassword,
    activateAccount,
  },
}
