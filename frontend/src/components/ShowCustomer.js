/* eslint-disable react/prop-types */
import React from 'react';
import {
  Button, Dimmer, Grid, Header, Icon, Loader, Modal, Segment,
} from 'semantic-ui-react';

const ShowCustomer = ({ loading, customer }) => {
  if (loading) {
    return (
      <Segment>
        <Dimmer active>
          <Loader size="medium">Loading</Loader>
        </Dimmer>
      </Segment>
    );
  }

  const {
    name, surname, email, country, city, address, postal, specialization,
  } = customer;

  return (
    <Modal trigger={<Button basic loading={loading}>{`${name} ${surname}`}</Button>} size="large">
      <Modal.Header>
        <Icon name="address book outline" />
        {`${name} ${surname} details`}
      </Modal.Header>
      <Modal.Content image>
        <Modal.Description>
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

export default ShowCustomer;
