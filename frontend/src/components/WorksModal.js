import React from 'react';
import { Button, Modal } from 'semantic-ui-react';

const WorksModal = ({
  collaborations,
}) => (
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

export default WorksModal;
