import React from 'react'
import PropTypes from 'prop-types'
import { ApolloProvider } from '@apollo/react-hooks'
import Container from '@material-ui/core/Container'
import UserList from './components/UserList'

const App = ({ client }) => (
  <ApolloProvider client={client}>
    <Container maxWidth="md">
      <UserList />
    </Container>
  </ApolloProvider>
)

App.propTypes = {
  client: PropTypes.object,
}

export default App
