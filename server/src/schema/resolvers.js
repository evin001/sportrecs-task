const { User } = require('../models')
const UserNotFound = require('../erorors/UserNotFound')
const EmailScalarType = require('../utils/emailScalar')

const resolvers = {
  Query: {
    user: async (_, { id }) => {
      const user = await User.findById(id).exec()
      if (user) return user
      throw new UserNotFound(id)
    },
    users: async (_, { skip, limit }) => {
      return await User.find({}).skip(skip).limit(limit).exec()
    },
  },
  Mutation: {
    createUser: async (_, { input }) => {
      return await User.create(input)
    },
    updateUser: async (_, { id, input }) => {
      const user = await User.findOneAndUpdate({ _id: id }, input).exec()
      if (user) return user
      throw new UserNotFound(id)
    },
    deleteUser: async (_, { id }) => {
      const user = await User.findOneAndDelete({ _id: id }).exec()
      if (user) return user
      throw new UserNotFound(id)
    },
  },
  Email: EmailScalarType,
}

module.exports = { resolvers }
