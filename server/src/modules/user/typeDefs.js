import { gql } from 'apollo-server'

export default gql`
  type User {
    id: Int!
    handle: String!
    name: String!
    email: String!
  }

  type UserAndToken {
    user: User!
    token: String!
  }

  type Query {
    users: [User!]!
  }

  type Mutation {
    register(handle: String!, name: String!, email: String!, password: String!): UserAndToken
    login(email: String!, password: String!): UserAndToken
    passwordResetRequest(email: String!): String
    resetPassword(secret: String!, password: String!): UserAndToken
  }
`
