import { gql } from 'apollo-server'

export default gql`
  type Event {
    id: Int!
    name: String!
    place: String!
    description: String!
    from: Date!
    to: Date!
    public: Boolean!
    user: User!
    attendees: [User!]!
    messages: [Message!]!
  }

  input EventInput {
    name: String!
    place: String
    description: String
    from: Date!
    to: Date!
    public: Boolean
  }

  type Query {
    events: [Event!]!
    event(id: Int!): Event
  }

  type Mutation {
    createEvent(input: EventInput!, invites: String): Event!
    joinEvent(eventId: Int!): Boolean!
    updateEvent(eventId: Int!, input: EventInput!): Event!
    shareEvent(eventId: Int!, invites: [String!]!): Boolean!
  }
`
