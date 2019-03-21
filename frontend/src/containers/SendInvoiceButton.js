/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import { graphql } from 'react-apollo';
import sendInvoiceMutation from '../graphql/query/customer';

class SendInvoiceButton extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    console.log('the props in constructor: ', this.props);
  }

  render() {
    console.log('the props: ', this.props);
    return (
      <Button primary disabled>
        ciao
      </Button>
    );
  }
}

export default graphql(sendInvoiceMutation)(SendInvoiceButton);
