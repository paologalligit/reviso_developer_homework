import React, { Component } from 'react';
import DatePicker from 'react-date-picker';
import TimePicker from 'react-time-picker';
import { Button, Grid, Input } from 'semantic-ui-react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { extendObservable } from 'mobx';
import { observer } from 'mobx-react';

import MultiSelectCustomers from '../components/MultiSelectCustomers';
import CreateCustomer from './CreateCustomer';

class RegisterWork extends Component {
  constructor(props) {
    super(props);

    extendObservable(this, {
      projectName: '',
      budget: '',
      vat: '',
      penalty: '',
      startHour: (new Date()).toLocaleTimeString(),
      endHour: (new Date()).toLocaleTimeString(),
      date: new Date(),
      customer: -1,
    });
  }

  onChange = e => {
    // console.log('on change function: ', e.target);
    const { name, value } = e.target;
    this[name] = value;
  };

  onDropdownChange = (e, data) => {
    // console.log('in dd change: ', data.value);
    this.customer = data.value;
  };

  setMinTime = () => {
    const { startHour } = this;

    // console.log('the conversion: ', startHour.toLocaleTimeString());

    return startHour ? startHour : (new Date()).toLocaleTimeString();
  };

  handleSubmit = async () => {
    const {
      projectName,
      budget,
      vat,
      penalty,
      startHour,
      endHour,
      date,
      customer,
    } = this;

    const { id } = this.props.user;

    let response;
    try {
      response = await this.props.mutate({
        variables: {
          name: projectName,
          budget: parseInt(budget, 10),
          vat: parseInt(vat, 10),
          penalty: parseInt(penalty, 10),
          date: date,
          start_hour: startHour,
          end_hour: endHour,
          user_id: id,
          customer_id: customer,
        }
      });
    } catch (err) {
      console.log('the error: ', err)
    }

    const {
      ok, collaboration, errors
    } = response.data.registerCollaboration;

    if (ok) {
      console.log('just created new collaboration: ', collaboration);
      this.props.navigator.go('/');
    } else {
      console.log('something went terribly wrong: ', errors)
    }
  };

  render() {
    const {
      budget, projectName, vat, penalty, startHour, endHour, date
    } = this;
    const { id } = this.props.user;

    return (
      <Grid>
        <Grid.Row columns={1}>
          <Grid.Column>
            <Input
              name="projectName"
              value={projectName}
              placeholder="Project Name"
              fluid
              onChange={this.onChange}
            />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row columns={3}>
          <Grid.Column>
            <Input
              name="budget"
              value={budget}
              placeholder="Budget"
              fluid
              onChange={this.onChange}
            />
          </Grid.Column>
          <Grid.Column>

            <Input
              name="vat"
              value={vat}
              placeholder="Vat"
              fluid
              onChange={this.onChange}
            />
          </Grid.Column>
          <Grid.Column>

            <Input
              name="penalty"
              value={penalty}
              placeholder="Penalty per day"
              fluid
              onChange={this.onChange}
            />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row columns={2}>
          <Grid.Column>
            <MultiSelectCustomers
              value="Customer"
              placeholder="Select Customer"
              userId={id}
              onChange={this.onDropdownChange}
            />
          </Grid.Column>
          <Grid.Column>
            <CreateCustomer
              userId={id}
            />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row columns={3}>
          <Grid.Column>
            <DatePicker
              value={date}
              onChange={e => this.date = e}
            />
          </Grid.Column>

          <Grid.Column>
            <TimePicker
              value={startHour}
              onChange={e => this.startHour = e}
            />
          </Grid.Column>

          <Grid.Column>
            <TimePicker
              value={endHour}
              onChange={e => this.endHour = e}
              minTime={this.setMinTime()}
            />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row columns={1}>
          <Grid.Column>
            <Button
              onClick={this.handleSubmit}
            >
              Submit
            </Button>
          </Grid.Column>
        </Grid.Row>

      </Grid>
    );
  }
}

const collaborationMutation = gql`
  mutation (
   $name: String!, $budget: Float!, $vat: Float!, $penalty: Float!,
     $date: String!, $start_hour: String!, $end_hour: String!
       $user_id: Int!, $customer_id: Int!) {
    registerCollaboration(
      name: $name, budget: $budget, vat: $vat, penalty: $penalty, 
       date: $date, start_hour: $start_hour, end_hour: $end_hour,
         user_id: $user_id, customer_id: $customer_id
      ){
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

export default graphql(collaborationMutation)(observer(RegisterWork));
