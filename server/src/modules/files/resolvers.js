import { GraphQLUpload } from 'graphql-upload'
import userImageUpload from './resolvers/userImageUpload.js'
import eventImageUpload from './resolvers/eventImageUpload.js'

export default {
  Upload: GraphQLUpload,
  Mutation: {
    userImageUpload,
    eventImageUpload,
  },
}
