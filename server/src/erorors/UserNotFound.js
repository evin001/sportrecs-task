class UserNotFound extends Error {
  constructor(id) {
    super()
    this.message = `User by id "${id}" not found`
    this.name = 'UserNotFount'
  }
}

module.exports = UserNotFound
