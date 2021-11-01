import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import 'tailwindcss/tailwind.css'
import App from './App'

const apolloClient = new ApolloClient({
  uri: process.env.BACKEND_URL ?? 'http://localhost:8000',
  cache: new InMemoryCache(),
})

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)
