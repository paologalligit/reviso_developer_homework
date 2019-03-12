import React from 'react';
import {
  Button, Image, List, Modal,
} from 'semantic-ui-react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import ProjectListItem from './ProjectListItem';

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
      <List celled>
        {
          collaborations.map(c => (
            <List.Item key={c.id}>
              <ProjectListItem
                budget={c.budget}
                name={c.name}
                vat={c.vat}
                penalty={c.penalty}
                date={c.date}
                startHour={c.start_hour}
                endHour={c.end_hour}
              />
            </List.Item>
          ))
        }
      </List>
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
