import { gql } from 'apollo-server'

export default gql`
  type Event {
    id: Int!
    name: String!
    place: String!
    description: String!
    user: User!
  }

  input EventInput {
    name: String!
    place: String
    description: String
    public: Boolean
  }

  type Query {
    events: [Event!]!
  }

  type Mutation {
    createEvent(input: EventInput!): Event!
  }
`
