/* eslint-disable no-return-assign */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable camelcase */
import React, { Component } from 'react';
import DatePicker from 'react-date-picker';
import TimePicker from 'react-time-picker';
import { Button, Grid, Input } from 'semantic-ui-react';
import { graphql } from 'react-apollo';

import MultiSelectCustomers from '../components/MultiSelectCustomers';
import CreateCustomer from './CreateCustomer';
import collaborationMutation from '../graphql/mutation/collaboration';
import tryParseInt from '../utils/parsingTools';

class RegisterWork extends Component {
  constructor(props) {
    super(props);

    this.state = {
      projectName: '',
      budget: '',
      vat: '',
      penalty: '',
      startHour: new Date().toLocaleTimeString(),
      endHour: new Date().toLocaleTimeString(),
      date: new Date(),
      customer: '',
      isSubmitting: false,
      errors: {},
    };
  }

  onChange = (e, data) => {
    // console.log('on change function: ', e.target, ' and data: ', data);
    const { name, value } = data;
    this.setState({ [name]: value });
  };

  onDropdownChange = (e, data) => {
    // console.log('in dd change: ', data.value);
    this.setState({ customer: data.value });
  };

  setMinTime = () => {
    const { startHour } = this;

    // console.log('the conversion: ', startHour.toLocaleTimeString());

    return startHour || new Date().toLocaleTimeString();
  };

  handleSubmit = async () => {
    const {
      projectName, budget, vat, penalty, startHour, endHour, date, customer,
    } = this.state;

    const { id } = this.props.user;

    try {
      const response = await this.props.mutate({
        variables: {
          name: projectName,
          budget: tryParseInt(budget, 10),
          vat: tryParseInt(vat, 10),
          penalty: tryParseInt(penalty, 10),
          date: date || '',
          start_hour: startHour || '',
          end_hour: endHour || '',
          user_id: id,
          customer_id: tryParseInt(customer),
        },
      });

      const { ok, collaboration, errors } = response.data.registerCollaboration;

      if (ok) {
        console.log('just created new collaboration: ', collaboration);
        this.isSubmitting = false;
        this.props.navigator.go('/');
      } else {
        // console.log('something went terribly wrong: ', errors);
        const err = {};
        errors.forEach(({ path, message }) => {
          err[`${path}Error`] = message;
        });

        this.setState({
          errors: err,
          isSubmitting: true,
        });
      }
    } catch (err) {
      console.log('again');
      this.setState({ isSubmitting: true });
    }
  };

  render() {
    const {
      budget,
      projectName,
      vat,
      penalty,
      startHour,
      endHour,
      date,
      isSubmitting,
      errors,
    } = this.state;

    const {
      nameError,
      budgetError,
      vatError,
      customer_idError,
      penaltyError,
      dateError,
      start_hourError,
      end_hourError,
    } = errors;

    const { id } = this.props.user;

    return (
      <Grid>
        <Grid.Row columns={1}>
          <Grid.Column>
            <Input
              name="projectName"
              value={projectName}
              placeholder="Project Name"
              onChange={this.onChange}
              fluid
              error={!!nameError}
            />
            {isSubmitting && nameError ? nameError : null}
          </Grid.Column>
        </Grid.Row>

        <Grid.Row columns={3}>
          <Grid.Column>
            <Input
              name="budget"
              value={budget}
              placeholder="Budget"
              onChange={this.onChange}
              fluid
              error={!!budgetError}
            />
            {isSubmitting && budgetError ? budgetError : null}
          </Grid.Column>
          <Grid.Column>
            <Input
              name="vat"
              value={vat}
              placeholder="Vat"
              onChange={this.onChange}
              fluid
              error={!!vatError}
            />
            {isSubmitting && vatError ? vatError : null}
          </Grid.Column>
          <Grid.Column>
            <Input
              name="penalty"
              value={penalty}
              placeholder="Penalty per day"
              onChange={this.onChange}
              error={!!penaltyError}
              fluid
            />
            {isSubmitting && penaltyError ? penaltyError : null}
          </Grid.Column>
        </Grid.Row>

        <Grid.Row columns={2}>
          <Grid.Column>
            <MultiSelectCustomers
              error={!!customer_idError}
              value="Customer"
              placeholder="Select Customer"
              userId={id}
              onChange={this.onDropdownChange}
            />
            {isSubmitting && customer_idError ? customer_idError : null}
          </Grid.Column>
          <Grid.Column>
            <CreateCustomer userId={id} />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row columns={3}>
          <Grid.Column>
            <DatePicker value={date} onChange={e => (this.date = e)} />
            {isSubmitting && dateError ? dateError : null}
          </Grid.Column>

          <Grid.Column>
            <TimePicker value={startHour} onChange={e => (this.startHour = e)} />
            {isSubmitting && start_hourError ? start_hourError : null}
          </Grid.Column>

          <Grid.Column>
            <TimePicker
              value={endHour}
              onChange={e => (this.endHour = e)}
              minTime={this.setMinTime()}
            />
            {isSubmitting && end_hourError ? end_hourError : null}
          </Grid.Column>
        </Grid.Row>

        <Grid.Row columns={1}>
          <Grid.Column>
            <Button onClick={this.handleSubmit}>Submit</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default graphql(collaborationMutation)(RegisterWork);
