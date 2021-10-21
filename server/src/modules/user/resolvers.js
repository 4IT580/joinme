export default {
  Query: {
    users: async () => users,
  },
  Mutation: {
    register: (_, params) => {
      users.push({
        id: users.length + 1,
        userName: params.userName,
        firstName: params.firstName,
        lastName: params.lastName,
        email: params.email,
      })

      return users[users.length - 1]
    },
  },
}

const users = [
  {
    id: 1,
    userName: 'Sádlič666',
    firstName: 'Franta',
    lastName: 'Sádlo',
    email: 'franta.sadlo@volny.cz',
  },
]
