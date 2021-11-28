import glob from 'glob'
import path from 'path'
import http from 'http'
import express from 'express'
import { execute, subscribe } from 'graphql'
import { ApolloServer } from 'apollo-server-express'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { SubscriptionServer } from 'subscriptions-transport-ws'
import { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import { migrate } from './lib/db.js'
import { graphqlUploadExpress } from 'graphql-upload'
import { IMG_FOLDER } from './config.js'
import cors from 'cors'

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

  const schema = await makeSchema()
  const config = await makeConfig({ schema, httpServer })

  const server = new ApolloServer({
    ...config,
    schema,
  })

  await server.start()

  app.use(cors())
  app.use('/images', express.static(IMG_FOLDER))
  app.use(graphqlUploadExpress())

  server.applyMiddleware({
    app,
    path: '/',
  })

  await new Promise((resolve) => httpServer.listen({ port: PORT, hostname: HOST }, resolve))

  console.log(`🚀 Server ready at ${HOST}:${PORT}${server.graphqlPath}`)
}

async function makeSchema() {
  const schema = {
    typeDefs: [],
    resolvers: [],
  }

  for (const file of glob.sync('src/modules/*/*.js', { absolute: true })) {
    const type = path.parse(file).name

    if (!schema[type]) continue

    const imported = await import(file)

    schema[type].push(imported.default)
  }

  return makeExecutableSchema(schema)
}

async function makeConfig({ schema, httpServer }) {
  const subscriptionServer = SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
    },
    {
      server: httpServer,
      path: '/',
    },
  )

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
    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground(),
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close()
            },
          }
        },
      },
    ],
    uploads: false,
  }

  return config
}

main()
