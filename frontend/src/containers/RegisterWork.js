import React, {Component} from 'react';
import DatePicker from 'react-date-picker';
import { Button, Input } from 'semantic-ui-react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { extendObservable } from 'mobx';
import { observer } from 'mobx-react';

import MultiSelectCustomers from '../components/MultiSelectCustomers';

class RegisterWork extends Component {
  constructor(props) {
    super(props);

    extendObservable(this, {
      projectName: '',
      budget: 0,
      customers: [],
    });
    // props.user.id
  }

  render() {
    const { budget, projectName } = this;
    const { id } = this.props.user;

    // console.log('this: ', this.props);

    return (
      <div>
        <Input
          name="projectName"
          value={projectName}
          placeholder="Project Name"
          fluid
        />
        <Input
          name="budget"
          value={budget}
          placeholder="Budget"
          fluid
        />

        <MultiSelectCustomers
          value="Customer"
          placeholder="Select Customer"
          userId={id}
        />

        <DatePicker />
        <DatePicker />
        <Button>Create New Customer</Button>
      </div>
    );
  }
}

const collaborationMutation = gql`query {
    allUsers {
      id,
      name,
      surname,
      username,
      email,
      country
    }
  }
`;

export default graphql(collaborationMutation)(observer(RegisterWork));
