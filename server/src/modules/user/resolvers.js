import { db } from '../../lib/db.js'

export default {
  Query: {
    users: async () => await db().select('*').from('users'),
  },
  Mutation: {
    register: async (_, params) => {
      const [id] = await db().insert(params).into('users')

      return await db().select('*').from('users').where('id', id).first()
    },
    authenticate: async (_, params) => {
      const result = await db().select('*').from('users').where('email', params.email).first()
      return  (result?.password ?? '') === params.password
    },
  },

}
