export default `

  type Customer {
    id: Int!
    name: String!
    surname: String!
    email: String!
    country: String!
    city: String!
    address: String!
    postal: Int!
    user_id: Int!
    specialization: String
  }

  type Query {
    getCustomer(id: Int!): Customer!
    getCustomersPerUser(user_id: Int!): [Customer!]!
    allCustomers: [Customer!]!
  }

  type CustomerRegisterResponse {
    ok: Boolean!
    user: Customer
    errors: [Error!]
  }

  type Mutation {
    registerCustomer(name: String!, surname: String!, email: String!, country: String!, 
      city: String!, address: String!, postal: Int!, user_id: Int!, specialization: String): CustomerRegisterResponse!
  }

`;
