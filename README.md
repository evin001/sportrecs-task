Для демонстрации ваших способностей предлагаем разработать простое CRUD-приложение, которое состоит из GraphQL сервера и клиентского приложения.

Для создания сервера необходимо использовать библиотеки:
- apollo-server
- graphql
- mongoose
- любые другие npm-пакеты, которые вы посчитаете нужным использовать.

Для клиентского приложения необходимо использовать:
- react
- react-dom
- material-ui
- apollo-boost
- react-apollo
- graphql
- любые другие npm-пакеты, которые вы посчитаете нужным использовать.


Сервер должен поддерживать схему:

```graphql
type Query {
  user(id: ID!): User!
  users(skip: Int = 0, limit: Int = 10): [User]
}

type Mutation {
  createUser(input: CreateUserInput!): User!
  updateUser(id: ID!, input: UpdateUserInput!): User!
  deleteUser(id: ID!): User!
}

type User {
  id: ID!
  email: Email!
  name: String!
}

input CreateUserInput {
  email: Email!
  name: String!
}

input UpdateUserInput {
  email: Email
  name: String
}
```

Данные пользователей сохранять в MongoDB, в качестве адаптера использовать mongoose.

Клиентское приложение должно использовать библиотеку Material UI. 

Необходимо реализовать список пользователей в виде таблицы с возможностью создания/редактирования/удаления/просмотра списка и деталей одного пользователя. 



