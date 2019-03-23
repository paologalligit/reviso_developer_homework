import React, { Component } from 'react';
import DatePicker from 'react-date-picker';
import TimePicker from 'react-time-picker';
import { Grid, Input, Label, Radio } from 'semantic-ui-react';
import { extendObservable } from 'mobx';
import { observer } from 'mobx-react';

import MultiSelectCustomers from '../components/MultiSelectCustomers';
import WorksModal from '../components/WorksModal';
import FormatInput from '../components/FormatInput';

class ViewWork extends Component {
  constructor(props) {
    super(props);

    extendObservable(this, {
      projectName: '',
      budget: '',
      vat: '',
      penalty: '',
      startHour: null,
      endHour: null,
      date: null,
      customer: -1,
      showAll: false,
      isSubmitting: false,
    });
  }

  onChange = e => {
    const { name, value } = e.target;
    console.log('the name: ', name);
    if (name === 'vat' || name === 'budget' || name === 'penalty') {
      this.isSubmitting = true;
    } else {
      this.isSubmitting = false;
    }
    this[name] = value;
  };

  onDropdownChange = (e, data) => {
    this.customer = data.value;
  };

  setMinTime = () => {
    const { startHour } = this;

    return startHour ? startHour : new Date().toLocaleTimeString();
  };

  onToggleFilterView = (e, { value }) => {
    e.persist();
    this.showAll = !value;
  };

  formatStringToNumber = n => n === '' ? 0.0 : parseFloat(n, 10);

  render() {
    const {
      budget,
      projectName,
      vat,
      penalty,
      startHour,
      endHour,
      date,
      customer,
      showAll,
      isSubmitting,
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
            <FormatInput
              name="budget"
              value={budget}
              placeholder="Budget"
              onChange={this.onChange}
              type="numeric"
              errorMessages={{
                type: 'Field must be numeric',
              }}
              isSubmitting={isSubmitting}
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
                type: 'Field must be numeric',
              }}
              isSubmitting={isSubmitting}
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
                type: 'Field must be numeric',
              }}
              isSubmitting={isSubmitting}
            />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row columns={1}>
          <Grid.Column>
            <MultiSelectCustomers
              value="Customer"
              placeholder="Select Customer"
              userId={id}
              onChange={this.onDropdownChange}
            />
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

        <Grid.Row columns={2}>
          <Grid.Column>
            <WorksModal
              budget={this.formatStringToNumber(budget)}
              name={projectName}
              vat={this.formatStringToNumber(vat)}
              penalty={this.formatStringToNumber(penalty)}
              startHour={startHour}
              endHour={endHour}
              date={date}
              userId={id}
              customerId={customer}
              showAll={showAll}
            />
          </Grid.Column>
          <Grid.Column>
            <Label>Show All</Label>
            <Radio checked={showAll} toggle onChange={this.onToggleFilterView} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default observer(ViewWork);
