import { GraphQLScalarType, Kind } from 'graphql'

const dateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  serialize(value) {
    return new Date(value).toISOString()
  },
  parseValue(value) {
    return Date.parse(value)
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10)) // Convert hard-coded AST string to integer and then to Date
    }
    return null // Invalid hard-coded value (not an integer)
  },
})

export default {
  Date: dateScalar,
  Query: {
    greet: async () => greets[Math.floor(Math.random() * greets.length)],
  },
}

const greets = [
  'Hello, World!',
  'Just click and party!',
  '@VŠE',
  'Lorem ipsum...',
  'The future is here!',
  'Better than the other one!',
  'WOOP WOOP!!!',
]
