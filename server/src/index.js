import glob from 'glob'
import path from 'path'
import { ApolloServer } from 'apollo-server'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'

const HOST = process.env.SERVER_HOST || 'localhost'
const PORT = process.env.SERVER_PORT || 8000

const main = async () => {
  const config = {
    typeDefs: [],
    resolvers: [],
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  }

  for (const file of glob.sync('src/modules/*/*.js', { absolute: true })) {
    const type = path.parse(file).name

    if (!config[type]) continue

    const imported = await import(file)

    config[type] = imported.default
  }

  const server = new ApolloServer(config)

  await server.listen(PORT, HOST)

  console.log(`Server ready at http://localhost:${PORT}`)
}

main()
