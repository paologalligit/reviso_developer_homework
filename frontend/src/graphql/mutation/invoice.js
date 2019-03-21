import gql from 'graphql-tag';

export default gql`
  mutation($id: Int!, $sent: Boolean!, $user_id: Int!, $customer_id: Int!) {
    sentInvoice(id: $id, sent: $sent, user_id: $user_id, customer_id: $customer_id) {
      ok
      collaboration {
        id
        sent
        user_id
        customer_id
      }
      errors {
        path
        message
      }
    }
  }
`;
