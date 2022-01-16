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
    file: FilePath
    promoted: Boolean!
  }

  input EventInput {
    name: String!
    place: String
    description: String
    from: Date!
    to: Date!
    public: Boolean
  }

  type Invitation {
    id: Int!
    accepted: Boolean
    event: Event!
  }

  type FilePath {
    path: String
  }

  type Query {
    events: [Event!]!
    promotedEvents: [Event!]!
    event(id: Int!): Event
    invitations: [Invitation!]!
    attending: [Event!]!
    organizing: [Event!]!
  }

  type Mutation {
    createEvent(input: EventInput!, invites: String): Event!
    joinEvent(eventId: Int!): Boolean!
    updateEvent(eventId: Int!, input: EventInput!): Event!
    shareEvent(eventId: Int!, invites: [String!]!): Boolean!
    acceptInvitation(invitationId: Int!): Boolean!
    declineInvitation(invitationId: Int!): Boolean!
  }
`
