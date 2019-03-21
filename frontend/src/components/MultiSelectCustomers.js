/* eslint react/prop-types: 0 */
import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import { graphql } from 'react-apollo';

import getCustomersPerUserQuery from '../graphql/query/customer';

const MultiSelectCustomers = ({
  data: { loading, getCustomersPerUser },
  placeholder,
  onChange,
}) => (
  loading ? null : (
    <Dropdown
      placeholder={placeholder}
      fluid
      search
      selection
      onChange={onChange}
      options={getCustomersPerUser
        .map(c => ({ key: c.id, value: c.id, text: `${c.name} ${c.surname}` }))}
    />
  )
);

export default graphql(getCustomersPerUserQuery, {
  options: ({ userId }) => ({ variables: { user_id: userId } }),
})(MultiSelectCustomers);
