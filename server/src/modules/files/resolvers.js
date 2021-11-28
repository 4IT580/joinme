import { GraphQLUpload } from 'graphql-upload'
import singleUpload from './resolvers/singleUpload.js'

export default {
  Upload: GraphQLUpload,
  Mutation: {
    singleUpload,
  },
}
