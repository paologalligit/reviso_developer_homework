import { gql } from 'apollo-server';

export default gql`

  type User {
    id: Int!
    name: String!
    surname: String!
    username: String!
    email: String!
    birthdate: String!
    country: String!
    city: String!
    address: String!
    postal: Int!
  }

  type Query {
    getUser(id: Int!): User!
    allUsers: [User!]!
  }

  type RegisterResponse {
    ok: Boolean!
    user: User
    errors: [Error!]
  }
  
  type LoginResponse {
    ok: Boolean!
    token: String
    refreshToken: String
    errors: [Error!]
  }

  type Mutation {
    registerUser(name: String!, surname: String!, username: String!, email: String!, birthdate: String!, 
      country: String!, password: String!, city: String!, address: String! postal: Int!): RegisterResponse!
    login(email: String!, password: String!): LoginResponse
  }

`;
