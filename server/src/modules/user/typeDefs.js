import { gql } from 'apollo-server'

export default gql`
  type User {
    id: Int!
    username: String!
    name: String!
    email: String!
    photo: String
    city: String
    description: String
    interests: [String!]!
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
    resetPassword(secret: String!, password: String!): UserAndToken
    activateAccount(secret: String): Boolean
    changePassword(oldPassword: String!, newPassword: String!): Boolean
    updateProfile(name: String, city: String, description: String, interests: [String!]): User
  }
`
