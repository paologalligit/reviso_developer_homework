/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

import AddCustomerModal from '../components/AddCustomerModal';

class CreateCustomer extends Component {
  constructor(props) {
    super(props);

    this.state = observable({
      openAddCustomerModal: false,
    });
  }

  toggleAddCustomerModal = () => {
    this.setState(state => ({ openAddCustomerModal: !state.openAddCustomerModal }));
  };

  render() {
    const { openAddCustomerModal } = this.state;
    const { userId } = this.props;

    return [
      <Button key="create-customer-button" onClick={this.toggleAddCustomerModal}>
        Create Customer
      </Button>,
      <AddCustomerModal
        key="create-customer-modal"
        onClose={this.toggleAddCustomerModal}
        open={openAddCustomerModal}
        userId={userId}
      />,
    ];
  }
}

export default observer(CreateCustomer);
