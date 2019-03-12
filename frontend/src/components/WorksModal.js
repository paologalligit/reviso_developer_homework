import React from 'react';
import { Button, Modal } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const WorksModal = ({
  data: {
    filteredCollaborations,
    loading,
  },
  budget,
  name,
  vat,
  penalty,
  date,
  startHour,
  endHour,
}) => {
  const collaborations = loading ? [] : filteredCollaborations;

  return (
    <Modal trigger={<Button>Filter</Button>}>
      <Modal.Header>Works List</Modal.Header>
      {
        collaborations.map(c => (
          <Modal.Content
            key={c.id}
          >
            <Modal.Description>
              {`Name: ${c.name}`}
              {`Budget: ${c.budget}`}
              {`Vat: ${c.vat}`}
            </Modal.Description>
            <Modal.Actions>
              <Button primary>
                Send Invoice
              </Button>
            </Modal.Actions>
          </Modal.Content>
        ))
      }
    </Modal>
  );
};

const collaborationsQuery = gql`
  query (
    $user_id: Int!, $customer_id: Int
  ) {
    filteredCollaborations (
      user_id: $user_id, customer_id: $customer_id
    ) {
      id,
      name,
      budget,
      vat,
      penalty,
      date,
      start_hour,
      end_hour,
      user_id,
      customer_id
    }
  }
`;

export default graphql(collaborationsQuery, {
  options: ({ userId, customerId }) => ({
    variables: { user_id: userId, customer_id: customerId },
  }),
})(WorksModal);
