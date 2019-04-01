/* eslint react/prop-types: 0 */
import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import { graphql } from 'react-apollo';

import { getCustomersPerUser } from '../graphql/query/customer';

const MultiSelectCustomers = ({
  data,
  placeholder,
  onChange,
  error,
}) => (data.loading ? null : (
  <Dropdown
    error={error}
    placeholder={placeholder}
    fluid
    search
    selection
    onChange={onChange}
    options={data.getCustomersPerUser.map(c => ({
      key: c.id,
      value: c.id,
      text: `${c.name} ${c.surname}`,
    }))}
  />
));

export default graphql(getCustomersPerUser, {
  options: ({ userId }) => ({ variables: { user_id: userId } }),
})(MultiSelectCustomers);
