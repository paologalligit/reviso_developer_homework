import gql from 'graphql-tag';

export default gql`
  query (
    $user_id: Int!, $customer_id: Int, $name: String, $budget: Float, $vat: Float, $penalty: Float, 
      $date: String, $start_hour: String, $end_hour: String
  ) {
    filteredCollaborations (
      user_id: $user_id, customer_id: $customer_id, name: $name, budget: $budget, vat: $vat, 
        penalty: $penalty, date: $date, start_hour: $start_hour, end_hour: $end_hour
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
