import { ApolloClient, InMemoryCache, ApolloLink, concat, HttpLink } from '@apollo/client'
import { onError } from 'apollo-link-error'

const httpLink = new HttpLink({ uri: process.env.BACKEND_URL })

const authMiddleware = new ApolloLink((operation, forward) => {
  const token = window.localStorage.getItem('JWT')
  if (token) {
    operation.setContext({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return forward(operation)
  }
})

const logoutLink = onError(({ graphQLErrors, networkError }) => {
  if (networkError.statusCode === 401) {
  }
})

const jwtApolloClient = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache(),
})

export const apolloClient = jwtApolloClient
