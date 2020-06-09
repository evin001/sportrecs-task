import React from 'react'
import ReactDOM from 'react-dom'
import ApolloClient from 'apollo-boost'
import App from './App'

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
})

ReactDOM.render(<App client={client} />, document.getElementById('app'))
