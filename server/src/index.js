import glob from 'glob'
import path from 'path'
import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import express from 'express'
import http from 'http'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import { migrate } from './lib/db.js'

const HOST = process.env.SERVER_HOST || 'localhost'
const PORT = process.env.SERVER_PORT || 8000

const main = async () => {
  await migrate()

  await startApolloServer()
}

async function startApolloServer() {
  // Required logic for integrating with Express
  const app = express()
  const httpServer = http.createServer(app)

  const config = await prepareConfig(httpServer)

  // Same ApolloServer initialization as before, plus the drain plugin.
  const server = new ApolloServer(config)

  // More required logic for integrating with Express
  await server.start()
  server.applyMiddleware({
    app,

    // By default, apollo-server hosts its GraphQL endpoint at the
    // server root. However, *other* Apollo Server packages host it at
    // /graphql. Optionally provide this to match apollo-server.
    path: '/',
  })

  // Modified server startup
  await new Promise((resolve) => httpServer.listen({ port: PORT, hostname: HOST }, resolve))
  console.log(`🚀 Server ready at ${HOST}:${PORT}${server.graphqlPath}`)
}

async function prepareConfig(httpServer) {
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
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground(), ApolloServerPluginDrainHttpServer({ httpServer })],
  }

  for (const file of glob.sync('src/modules/*/*.js', { absolute: true })) {
    const type = path.parse(file).name

    if (!config[type]) continue

    const imported = await import(file)

    config[type].push(imported.default)
  }

  return config
}

main()
