import gql from 'graphql-tag';

export default gql`
  mutation(
    $name: String!
    $surname: String!
    $username: String!
    $email: String!
    $password: String!
    $birthdate: String!
    $country: String!
    $city: String!
    $address: String!
    $postal: Int!
  ) {
    registerUser(
      name: $name
      surname: $surname
      username: $username
      email: $email
      password: $password
      birthdate: $birthdate
      country: $country
      city: $city
      address: $address
      postal: $postal
    ) {
      ok
      errors {
        path
        message
      }
    }
  }
`;
