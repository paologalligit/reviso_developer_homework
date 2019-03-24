/* eslint-disable react/prop-types */
import React from 'react';
import { Button, List, Modal } from 'semantic-ui-react';
import { graphql } from 'react-apollo';

import ProjectListItem from './ProjectListItem';
import collaborationsQuery from '../graphql/query/collaboration';

const WorksModal = ({
  data: { filteredCollaborations, loading },
  showAll,
  /*
  budget,
  name,
  vat,
  penalty,
  date,
  startHour,
  endHour, */
}) => {
  const collaborations = loading ? [] : filteredCollaborations;

  return (
    <Modal trigger={<Button>Filter</Button>}>
      <Modal.Header>Works List</Modal.Header>
      <List celled>
        {collaborations
          .filter(c => (showAll ? true : !c.sent))
          .map(c => (
            <List.Item key={c.id}>
              <ProjectListItem
                id={c.id}
                customerId={c.customer_id}
                userId={c.user_id}
                budget={c.budget}
                name={c.name}
                vat={c.vat}
                penalty={c.penalty}
                date={c.date}
                startHour={c.start_hour}
                endHour={c.end_hour}
                sent={c.sent}
              />
            </List.Item>
          ))}
      </List>
    </Modal>
  );
};

export default graphql(collaborationsQuery, {
  options: ({
    userId, customerId, budget, vat, penalty, name, date, startHour, endHour,
  }) => ({
    variables: {
      user_id: userId,
      customer_id: customerId,
      budget,
      vat,
      penalty,
      name,
      date,
      start_hour: startHour,
      end_hour: endHour,
    },
  }),
})(WorksModal);
