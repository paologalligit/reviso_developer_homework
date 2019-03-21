import gql from 'graphql-tag';

export default gql`
  mutation(
    $name: String!
    $surname: String!
    $email: String!
    $country: String!
    $city: String!
    $address: String!
    $postal: Int!
    $specialization: String!
    $user_id: Int!
  ) {
    registerCustomer(
      name: $name
      surname: $surname
      email: $email
      country: $country
      city: $city
      address: $address
      postal: $postal
      specialization: $specialization
      user_id: $user_id
    ) {
      ok
      customer {
        id
        name
        surname
        email
        country
        city
        address
        postal
        user_id
        specialization
      }
      errors {
        path
        message
      }
    }
  }
`;
