import { gql } from 'apollo-server'

export default gql`
  type Message {
    id: Int!
    text: String!
    event: Event!
    user: User!
    createdAt: Date!
  }

  input MessageInput {
    text: String!
    eventId: Int!
  }

  type Query {
    messages(eventId: Int!): [Message!]!
  }

  type Mutation {
    sendMessage(input: MessageInput!): Message!
  }

  type Subscription {
    messageSent(eventId: Int!): Message!
  }
`
