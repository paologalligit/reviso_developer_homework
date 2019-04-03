import React from 'react';
import { Dropdown } from 'semantic-ui-react';

export default ({ options, onChange }) => (
  <Dropdown
    compact
    selection
    options={options}
    placeholder="Vat"
    size="small"
    onChange={onChange}
  />
);
