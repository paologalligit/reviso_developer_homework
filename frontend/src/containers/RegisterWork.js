import React, { Component } from 'react';
import DatePicker from 'react-date-picker';
import TimePicker from 'react-time-picker';
import { Button, Grid } from 'semantic-ui-react';
import { graphql } from 'react-apollo';
import { extendObservable } from 'mobx';
import { observer } from 'mobx-react';

import MultiSelectCustomers from '../components/MultiSelectCustomers';
import CreateCustomer from './CreateCustomer';
import collaborationMutation from '../graphql/mutation/collaboration';
import FormatInput from '../components/FormatInput';

class RegisterWork extends Component {
  constructor(props) {
    super(props);

    extendObservable(this, {
      projectName: '',
      budget: '',
      vat: '',
      penalty: '',
      startHour: new Date().toLocaleTimeString(),
      endHour: new Date().toLocaleTimeString(),
      date: new Date(),
      customer: '',
      isSubmitting: false,
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

  handleSubmit = async () => {
    const { projectName, budget, vat, penalty, startHour, endHour, date, customer } = this;

    const { id } = this.props.user;

    try {
      const response = await this.props.mutate({
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

      const { ok, collaboration, errors } = response.data.registerCollaboration;

      if (ok) {
        console.log('just created new collaboration: ', collaboration);
        this.isSubmitting = false;
        this.props.navigator.go('/');
      } else {
        console.log('something went terribly wrong: ', errors);
        this.isSubmitting = true;
      }

    } catch (err) {
      this.isSubmitting = true;
    }
  };

  // TODO: refactor also the isFormNotEmpty the way FormatInput works
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
    } = this;

    const { id } = this.props.user;

    return (
      <Grid>
        <Grid.Row columns={1}>
          <Grid.Column>
            <FormatInput
              name="projectName"
              value={projectName}
              placeholder="Project Name"
              onChange={this.onChange}
              type="alpha"
              errorMessages={{
                empty: 'Field required',
                type: 'Field must be an alphabetic item',
              }}
              isSubmitting={isSubmitting}
              notEmpty={true}
            />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row columns={3}>
          <Grid.Column>
            <FormatInput
              name="budget"
              value={budget}
              placeholder="Budget"
              onChange={this.onChange}
              type="numeric"
              errorMessages={{
                empty: 'Field required',
                type: 'Numeric field required',
              }}
              isSubmitting={isSubmitting}
              notEmpty={true}
            />
          </Grid.Column>
          <Grid.Column>
            <FormatInput
              name="vat"
              value={vat}
              placeholder="Vat"
              onChange={this.onChange}
              type="numeric"
              errorMessages={{
                empty: 'Field required',
                type: 'Numeric field required',
              }}
              isSubmitting={isSubmitting}
              notEmpty={true}
            />
          </Grid.Column>
          <Grid.Column>
            <FormatInput
              name="penalty"
              value={penalty}
              placeholder="Penalty per day"
              onChange={this.onChange}
              type="numeric"
              errorMessages={{
                empty: 'Field required',
                type: 'Numeric field required',
              }}
              isSubmitting={isSubmitting}
              notEmpty={true}
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
            <Button onClick={this.handleSubmit}>
              Submit
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default graphql(collaborationMutation)(observer(RegisterWork));
