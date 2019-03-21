import React, { Component } from 'react';
import DatePicker from 'react-date-picker';
import TimePicker from 'react-time-picker';
import { Button, Grid, Input } from 'semantic-ui-react';
import { graphql } from 'react-apollo';
import { extendObservable } from 'mobx';
import { observer } from 'mobx-react';
import validator from 'validator';

import MultiSelectCustomers from '../components/MultiSelectCustomers';
import CreateCustomer from './CreateCustomer';
import collaborationMutation from '../graphql/mutation/collaboration';

class RegisterWork extends Component {
  constructor(props) {
    super(props);

    extendObservable(this, {
      projectName: '',
      projectNameError: false,
      budget: '',
      budgetError: false,
      vat: '',
      vatError: false,
      penalty: '',
      penaltyError: false,
      startHour: new Date().toLocaleTimeString(),
      endHour: new Date().toLocaleTimeString(),
      date: new Date(),
      customer: '',
    });
  }

  onChange = (e, data) => {
    // console.log('on change function: ', e.target, ' and data: ', data);
    const { name, value } = data;
    // this.setState({ [name]: value });
    this[name] = value;
  };

  onDropdownChange = (e, data) => {
    // console.log('in dd change: ', data.value);
    // this.setState({ customer: data.value });
    this.customer = data.value;
  };

  setMinTime = () => {
    const { startHour } = this;

    // console.log('the conversion: ', startHour.toLocaleTimeString());

    return startHour ? startHour : new Date().toLocaleTimeString();
  };

  checkErrors = () => {
    const { projectName, budget, vat, penalty } = this;

    let err = false;

    if (validator.isAlpha(projectName)) {
      this.projectNameError = false;
    } else {
      this.projectNameError = true;
      err = true;
    }

    if (validator.isNumeric(budget)) {
      this.budgetError = false;
    } else {
      this.budgetError = true;
      err = true;
    }

    if (validator.isNumeric(vat)) {
      this.vatError = false;
    } else {
      this.vatError = true;
      err = true;
    }

    if (validator.isNumeric(penalty)) {
      this.penaltyError = false;
    } else {
      this.penaltyError = true;
      err = true;
    }

    return err;
  };

  handleSubmit = async () => {
    if (!this.checkErrors()) {
      const { projectName, budget, vat, penalty, startHour, endHour, date, customer } = this;

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
          },
        });
      } catch (err) {
        console.log('the error: ', err);
      }

      const { ok, collaboration, errors } = response.data.registerCollaboration;

      if (ok) {
        console.log('just created new collaboration: ', collaboration);
        this.props.navigator.go('/');
      } else {
        console.log('something went terribly wrong: ', errors);
      }
    } else {
      console.log('errore');
    }
  };

  isFormNotEmpty = () => {
    const { budget, projectName, vat, penalty, startHour, endHour, date, customer } = this;

    const tobeChecked = [budget, projectName, vat, penalty, startHour, endHour, date, customer];

    const res = tobeChecked.reduce((acc, field) => acc && field !== '', true);
    return res;
  };

  render() {
    const {
      budget,
      budgetError,
      projectName,
      projectNameError,
      vat,
      vatError,
      penalty,
      penaltyError,
      startHour,
      endHour,
      date,
    } = this;

    const { id } = this.props.user;

    return (
      <Grid>
        <Grid.Row columns={1}>
          <Grid.Column>
            <Input
              error={projectNameError}
              name="projectName"
              value={projectName}
              placeholder="Project Name"
              fluid
              onChange={this.onChange}
            />
            {projectNameError ? 'Field required' : null}
          </Grid.Column>
        </Grid.Row>

        <Grid.Row columns={3}>
          <Grid.Column>
            <Input
              error={budgetError}
              name="budget"
              value={budget}
              placeholder="Budget"
              fluid
              onChange={this.onChange}
            />
            {budgetError ? 'Numeric field required' : null}
          </Grid.Column>
          <Grid.Column>
            <Input
              error={vatError}
              name="vat"
              value={vat}
              placeholder="Vat"
              fluid
              onChange={this.onChange}
            />
            {vatError ? 'Numeric field required' : null}
          </Grid.Column>
          <Grid.Column>
            <Input
              error={penaltyError}
              name="penalty"
              value={penalty}
              placeholder="Penalty per day"
              fluid
              onChange={this.onChange}
            />
            {penaltyError ? 'Numeric field required' : null}
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
            <CreateCustomer userId={id} />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row columns={3}>
          <Grid.Column>
            <DatePicker value={date} onChange={e => (this.date = e)} />
          </Grid.Column>

          <Grid.Column>
            <TimePicker value={startHour} onChange={e => (this.startHour = e)} />
          </Grid.Column>

          <Grid.Column>
            <TimePicker
              value={endHour}
              onChange={e => (this.endHour = e)}
              minTime={this.setMinTime()}
            />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row columns={1}>
          <Grid.Column>
            <Button onClick={this.handleSubmit} disabled={!this.isFormNotEmpty()}>
              Submit
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default graphql(collaborationMutation)(observer(RegisterWork));
