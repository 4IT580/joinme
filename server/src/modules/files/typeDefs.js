import { gql } from 'apollo-server'

export default gql`
  scalar Upload

  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }

  type Mutation {
    # Multiple uploads are supported. See graphql-upload docs for details.
    userImageUpload(file: Upload!): String!
    eventImageUpload(eventId: Int!, file: Upload!): String!
  }
`
