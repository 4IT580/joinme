import { gql } from 'apollo-server'

export default gql`
  type Mutation {
    createBraintreeToken: String!

    promoteEvent(eventId: Int!, nonce: String!): Boolean!
  }
`
