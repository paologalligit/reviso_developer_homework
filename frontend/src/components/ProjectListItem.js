/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Button, Grid, List, Label } from 'semantic-ui-react';
import { graphql, withApollo } from 'react-apollo';

import fromMillisToDate from '../utils/convertingTools';
import sendInvoiceMutation from '../graphql/invoice';
import collaborationsQuery from '../graphql/collaboration';

class ProjectListItem extends Component {
  constructor(props) {
    super(props);
  }

  handleSendInvoice = async () => {
    let response;
    try {
      response = await this.props.mutate({
        variables: { sent: true },
      });
    } catch (err) {
      console.log('the error: ', err);
    }

    const { ok, collaboration, errors } = response.data.sentInvoice;

    if (ok) {
      console.log('bene, fatto');
    } else {
      console.log('male, errore: ', errors);
    }
  };

  render() {
    const { budget, name, vat, penalty, date, startHour, endHour, sent } = this.props;

    return (
      <List.Content>
        <List.Header>{`PROJECT: ${name}`}</List.Header>
        <Grid columns={3} divided>
          <Grid.Row>
            <Grid.Column>{`Budget: ${budget} €`}</Grid.Column>
            <Grid.Column>{`Vat: ${vat} €`}</Grid.Column>
            <Grid.Column>{`Penalty: ${penalty} €`}</Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>{`Date: ${fromMillisToDate(date)}`}</Grid.Column>
            <Grid.Column>{`Start hour: ${startHour}`}</Grid.Column>
            <Grid.Column>{`End hour: ${endHour}`}</Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Button disabled={sent} primary onClick={this.handleSendInvoice}>
              Send Invoice
            </Button>
          </Grid.Row>
        </Grid>
      </List.Content>
    );
  }
}

export default graphql(sendInvoiceMutation, {
  options: ({ id, userId, customerId }) => ({
    variables: { id: id, user_id: userId, customer_id: customerId },
    update: (store, { data: { sentInvoice } }) => {
      const { ok, collaboration, errors } = sentInvoice;

      const data = store.readQuery({
        query: collaborationsQuery,
        variables: {
          user_id: collaboration.user_id,
          customer_id: collaboration.customer_id,
        },
      });

      data.filteredCollaborations.forEach(c => {
        if (c.id === collaboration.id) {
          c['sent'] = true;
        }
      });

      store.writeQuery({
        query: collaborationsQuery,
        variables: {
          id: collaboration.id,
          user_id: collaboration.user_id,
          customer_id: collaboration.customer_id,
        },
        data,
      });
    },
  }),
})(ProjectListItem);
