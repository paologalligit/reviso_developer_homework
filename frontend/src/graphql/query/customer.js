import gql from 'graphql-tag';

const getCustomersPerUser = gql`
  query($user_id: Int!) {
    getCustomersPerUser(user_id: $user_id) {
      id
      name
      surname
      email
      country
      city
      address
      postal
      specialization
      user_id
    }
  }
`;

const getCustomerById = gql`
  query($id: Int!) {
    getCustomer(id: $id) {
      name
      surname
      email
      country
      city
      address
      postal
      specialization
      user_id
    }
  }
`;

export { getCustomersPerUser, getCustomerById };
