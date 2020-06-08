const express = require('express')
const { ApolloServer, gql } = require('apollo-server-express')
const { schema, resolvers } = require('./schema')

require('dotenv').config()

require('./utils/db')

const typeDefs = gql(schema)

const server = new ApolloServer({ typeDefs, resolvers })
const app = express()
server.applyMiddleware({ app })

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:${process.env.SERVER_PORT}${server.graphqlPath}`)
)
