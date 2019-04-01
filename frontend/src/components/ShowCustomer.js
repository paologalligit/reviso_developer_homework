/* eslint-disable react/prop-types */
import React from 'react';
import { graphql } from 'react-apollo';
import {
  Button, Grid, Header, Modal,
} from 'semantic-ui-react';

import { getCustomerById } from '../graphql/query/customer';

const ShowCustomer = ({ data: { loading, getCustomer } }) => {
  if (loading) {
    return <div />;
  }

  const {
    name, surname, email, country, city, address, postal, specialization,
  } = getCustomer;

  return (
    <Modal trigger={<Button basic loading={loading}>{`${name} ${surname}`}</Button>} size="large">
      <Modal.Header>{`${name} ${surname} details`}</Modal.Header>
      <Modal.Content image>
        <Modal.Description>
          <Header>Default Profile Image</Header>
          <Grid columns={4} divided>
            <Grid.Row>
              <Grid.Column>{`Name: ${name}`}</Grid.Column>
              <Grid.Column>{`Surname: ${surname}`}</Grid.Column>
              <Grid.Column>{`Email: ${email}`}</Grid.Column>
              <Grid.Column>{`Country: ${country}`}</Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column>{`City: ${city}`}</Grid.Column>
              <Grid.Column>{`Address: ${address}`}</Grid.Column>
              <Grid.Column>{`Postal: ${postal}`}</Grid.Column>
              <Grid.Column>{`Specialization: ${specialization}`}</Grid.Column>
            </Grid.Row>
          </Grid>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

export default graphql(getCustomerById, {
  options: ({ customerId }) => ({ variables: { id: customerId } }),
})(ShowCustomer);
