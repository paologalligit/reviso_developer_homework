import { gql } from 'apollo-server';

// TODO: continuare da qui con la definizione della query filtered
export default gql`

  type Collaboration {
    id: Int!
    name: String!
    budget: Float!
    vat: Float!
    penalty: String!
    date: String!
    start_hour: String!
    end_hour: String!
    user_id: Int!
    customer_id: Int!
    sent: Boolean!
  }

  type Query {
    filteredCollaborations(name: String, budget: Float, vat: Float, penalty: Float, date: String
      start_hour: String, end_hour: String, user_id: Int!, customer_id: Int): [Collaboration!]!
    allCollaborations: [Collaboration!]!
  }

  type CollaborationResponse {
    ok: Boolean!
    collaboration: Collaboration
    errors: [Error!]
  }

  type Mutation {
    registerCollaboration(name: String!, budget: Float!, vat: Float!, penalty: Float!, date: String!, 
      start_hour: String!, end_hour: String!, user_id: Int!, customer_id: Int!): CollaborationResponse!
    sentInvoice(id: Int!, sent: Boolean!, user_id: Int!, customer_id: Int!): CollaborationResponse!
  }

`;
