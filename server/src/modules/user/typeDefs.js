import { gql } from 'apollo-server'

export default gql`
  type User {
    id: Int!
    userName: String!
    firstName: String!
    lastName: String!
    email: String!
  }

  type Query {
    users: [User!]!
  }

  type Mutation {
    register(userName: String!, firstName: String!, lastName: String!, email: String!): User
  }
`
