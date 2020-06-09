import React from 'react'
import PropTypes from 'prop-types'
import { ApolloProvider } from '@apollo/react-hooks'
import UserList from './components/UserList'

const App = ({ client }) => (
  <ApolloProvider client={client}>
    <UserList />
  </ApolloProvider>
)

App.propTypes = {
  client: PropTypes.object,
}

export default App
