export default `

  type Customer {
    id: Int!
    name: String!
    surname: String!
    email: String!
    country: String!
    specialization: String
  }

  type Query {
    getCustomer(id: Int!): Customer!
    allCustomers: [Customer!]!
  }

  type CustomerRegisterResponse {
    ok: Boolean!
    user: Customer
    errors: [Error!]
  }

  type Mutation {
    registerCustomer(name: String!, surname: String!, email: String!, country: String!, specialization: String): CustomerRegisterResponse!
  }

`;
