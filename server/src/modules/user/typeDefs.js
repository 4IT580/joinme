import { gql } from 'apollo-server'

export default gql`
  type User {
    id: Int!
    username: String!
    name: String!
    email: String!
  }

  type UserAndToken {
    user: User!
    token: String!
  }

  type Query {
    me: User!
  }

  type Mutation {
    register(username: String!, name: String!, email: String!, password: String!): UserAndToken
    login(email: String!, password: String!): UserAndToken
    requestPasswordReset(email: String!): Boolean
    resetPassword(secret: String!, password: String!): Boolean
    activateAccount(secret: String): Boolean
  }
`
