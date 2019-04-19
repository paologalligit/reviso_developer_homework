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
import VatComponent from '../components/VatComponent';
import { roundDecimal } from '../utils/convertingTools';

class RegisterWork extends Component {
  constructor(props) {
    super(props);

    this.state = {
      projectName: '',
      budget: '',
      vat: '',
      vatPercentage: '',
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
    const { name, value } = data;
    const { vat, vatPercentage } = this.state;
    let newVat;
    if (vatPercentage !== '' && name === 'budget') {
      newVat = roundDecimal(vatPercentage * value, 2);
    } else {
      newVat = vat;
    }
    this.setState({ [name]: value, vat: newVat });
  };

  onDropdownChange = (e, data) => {
    this.setState({ customer: data.value });
  };

  setMinTime = () => {
    const { startHour } = this;

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

      const { ok, errors } = response.data.registerCollaboration;

      if (ok) {
        this.isSubmitting = false;
        this.props.navigator.go('/');
      } else {
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
      this.setState({ isSubmitting: true });
    }
  };

  handleVatChange = (e, data) => {
    const { value } = data;
    const { budget } = this.state;
    const vat = budget === '' ? '' : roundDecimal(budget * value, 2);
    this.setState({ vat, vatPercentage: value });
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
      registerWorkError,
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
          <Grid.Row columns={2}>
            <Grid.Column>
              <Input name="vat" value={vat} disabled fluid error={!!vatError} />
              {isSubmitting && vatError ? vatError : null}
            </Grid.Column>
            <Grid.Column>
              <VatComponent
                options={[
                  { key: 1, text: '4%', value: 0.04 },
                  { key: 2, text: '10%', value: 0.1 },
                  { key: 3, text: '20%', value: 0.2 },
                ]}
                onChange={this.handleVatChange}
              />
            </Grid.Column>
          </Grid.Row>
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
            <DatePicker value={date} onChange={e => this.setState({ date: e })} />
            {isSubmitting && dateError ? dateError : null}
          </Grid.Column>

          <Grid.Column>
            <TimePicker value={startHour} onChange={e => this.setState({ startHour: e })} />
            {isSubmitting && start_hourError ? start_hourError : null}
            {isSubmitting && registerWorkError ? registerWorkError : null}
          </Grid.Column>

          <Grid.Column>
            <TimePicker
              value={endHour}
              onChange={e => this.setState({ endHour: e })}
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
