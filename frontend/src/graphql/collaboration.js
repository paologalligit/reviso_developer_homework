import gql from 'graphql-tag';

export default gql`
  query (
    $user_id: Int!, $customer_id: Int
  ) {
    filteredCollaborations (
      user_id: $user_id, customer_id: $customer_id
    ) {
      id,
      name,
      budget,
      vat,
      penalty,
      date,
      start_hour,
      end_hour,
      user_id,
      customer_id
      sent
    }
  }
`;
