import gql from 'graphql-tag';

export default gql`
  query($user_id: Int!) {
    getCustomersPerUser(user_id: $user_id) {
      id,
      name,
      surname,
      email,
      country,
      city,
      user_id
    }
  }
`;
