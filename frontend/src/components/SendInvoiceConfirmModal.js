/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Button, Modal } from 'semantic-ui-react';

class SendInvoiceConfirmModal extends Component {
  state = { open: false };

  closeConfigShow = (closeOnEscape, closeOnDimmerClick) => () => {
    this.setState({ closeOnEscape, closeOnDimmerClick, open: true });
  };

  close = () => this.setState({ open: false });

  render() {
    const { open, closeOnEscape, closeOnDimmerClick } = this.state;
    const { onClick, label, disabled } = this.props;

    return (
      <div>
        <Button
          onClick={this.closeConfigShow(false, false)}
          disabled={disabled}
          primary
        >
          {label}
        </Button>

        <Modal
          open={open}
          closeOnEscape={closeOnEscape}
          closeOnDimmerClick={closeOnDimmerClick}
          onClose={this.close}
          size="mini"
        >
          <Modal.Header>Sending Invoice</Modal.Header>
          <Modal.Content>
            <p>Are you sure you want to send this invoice?</p>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.close} negative>
              No
            </Button>
            <Button
              onClick={() => {
                onClick();
                this.close();
              }}
              positive
              labelPosition="right"
              icon="checkmark"
              content="Yes"
            />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default SendInvoiceConfirmModal;
