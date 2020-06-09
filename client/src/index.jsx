import React from 'react'
import ReactDOM from 'react-dom'
import ApolloClient from 'apollo-boost'
import { InMemoryCache } from 'apollo-cache-inmemory'
import App from './App'

const cache = new InMemoryCache()

const client = new ApolloClient({
  cache,
  uri: 'http://localhost:4000/graphql',
})

cache.writeData({
  data: {
    users: [],
  },
})

ReactDOM.render(<App client={client} />, document.getElementById('app'))
