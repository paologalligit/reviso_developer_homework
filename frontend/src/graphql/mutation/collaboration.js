import gql from 'graphql-tag';

export default gql`
  mutation(
    $name: String!
    $budget: Float!
    $vat: Float!
    $penalty: Float!
    $date: String!
    $start_hour: String!
    $end_hour: String!
    $user_id: Int!
    $customer_id: Int!
  ) {
    registerCollaboration(
      name: $name
      budget: $budget
      vat: $vat
      penalty: $penalty
      date: $date
      start_hour: $start_hour
      end_hour: $end_hour
      user_id: $user_id
      customer_id: $customer_id
    ) {
      ok
      collaboration {
        name
        budget
        vat
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
