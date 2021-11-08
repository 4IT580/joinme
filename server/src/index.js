import glob from 'glob'
import path from 'path'
import { ApolloServer } from 'apollo-server'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import { migrate } from './lib/db.js'

const HOST = process.env.SERVER_HOST || 'localhost'
const PORT = process.env.SERVER_PORT || 8000

const main = async () => {
  await migrate()

  const config = {
    typeDefs: [],
    resolvers: [],
    context: async ({ req, res }) => {
      const auth = req.headers.authorization || ''

      return {
        req,
        res,
        auth,
      }
    },
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  }

  for (const file of glob.sync('src/modules/*/*.js', { absolute: true })) {
    const type = path.parse(file).name

    if (!config[type]) continue

    const imported = await import(file)

    config[type].push(imported.default)
  }

  const server = new ApolloServer(config)

  await server.listen(PORT, HOST)

  console.info(`Server ready at http://localhost:${PORT}`)
}

main()
