/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Grid, List } from 'semantic-ui-react';
import { graphql, compose } from 'react-apollo';

import fromMillisToDate from '../utils/convertingTools';
import sendInvoiceMutation from '../graphql/mutation/invoice';
import collaborationsQuery from '../graphql/query/collaboration';
import SendInvoiceConfirmModal from '../containers/SendInvoiceConfirmModal';
import ShowCustomer from './ShowCustomer';
import { getCustomerById } from '../graphql/query/customer';

class ProjectListItem extends Component {
  handleSendInvoice = async () => {
    const { id, userId, customerId } = this.props;
    const response = await this.props.mutate({
      variables: {
        id,
        user_id: userId,
        customer_id: customerId,
      },
    });

    const { sentInvoice } = response.data;

    return sentInvoice;
  };

  render() {
    const {
      budget,
      name,
      vat,
      penalty,
      date,
      startHour,
      endHour,
      sent,
      data: { loading, getCustomer },
    } = this.props;

    return (
      <List.Content>
        <List.Header>{`PROJECT: ${name}`}</List.Header>
        <Grid columns={4} divided>
          <Grid.Row>
            <Grid.Column>{`Budget: ${budget} €`}</Grid.Column>
            <Grid.Column>{`Vat: ${vat} €`}</Grid.Column>
            <Grid.Column>{`Penalty: ${penalty} €`}</Grid.Column>
            <Grid.Column>{`Date: ${fromMillisToDate(date)}`}</Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>{`Start hour: ${startHour}`}</Grid.Column>
            <Grid.Column>{`End hour: ${endHour}`}</Grid.Column>
            <Grid.Column>
              <ShowCustomer customer={getCustomer} loading={loading} />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <SendInvoiceConfirmModal
              label="Send Invoice"
              disabled={sent}
              onClick={this.handleSendInvoice}
            />
          </Grid.Row>
        </Grid>
      </List.Content>
    );
  }
}

export default compose(
  graphql(sendInvoiceMutation, {
    options: ({ id, userId, customerId }) => ({
      variables: { id, user_id: userId, customer_id: customerId },
    }),
  }),
  graphql(getCustomerById, {
    options: ({ customerId }) => ({ variables: { id: customerId } }),
  }),
)(ProjectListItem);
