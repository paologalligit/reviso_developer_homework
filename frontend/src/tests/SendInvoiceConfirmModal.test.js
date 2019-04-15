/* eslint-disable func-names */
import 'jsdom-global/register';
import React from 'react';
import toJson from 'enzyme-to-json';
import { mount, render } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';

import SendInvoiceConfirmModal from '../containers/SendInvoiceConfirmModal';

describe('project list item suite', () => {
  it('renders correctly', () => {
    const wrapper = render(
      <MockedProvider mocks={[]}>
        <SendInvoiceConfirmModal />
      </MockedProvider>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper).toHaveLength(1);
  });
});

describe('sicm interaction', () => {
  let wrapper;
  const onClickMock = jest.fn();

  beforeEach(() => {
    wrapper = mount(
      <MockedProvider mocks={[]} addTypename={false}>
        <SendInvoiceConfirmModal onClick={onClickMock} label="Send Invoice" disabled={false} />
      </MockedProvider>,
    );
  });

  it('shows the send invoice modal if the invoice is not sent', () => {
    const sendInvoiceConfirmModal = wrapper.find('SendInvoiceConfirmModal');
    const openModalButton = wrapper.find('Button');
    expect(sendInvoiceConfirmModal.instance().state.open).toBeFalsy();
    openModalButton.simulate('click');
    expect(sendInvoiceConfirmModal.instance().state.open).toBeTruthy();
  });

  it('correctly closes if the no button is pressed', () => {
    const sendInvoiceConfirmModal = wrapper.find('SendInvoiceConfirmModal');
    const openModalButton = wrapper.find('Button');

    openModalButton.simulate('click');

    const closeButton = wrapper.find('Button').at(1);
    closeButton.simulate('click');
    expect(sendInvoiceConfirmModal.instance().state.open).toBeFalsy();
  });

  it('correctly send invoice if the yes button is pressed', () => {
    const sendInvoiceConfirmModal = wrapper.find('SendInvoiceConfirmModal');
    const openModalButton = wrapper.find('Button');

    openModalButton.simulate('click');

    const closeButton = wrapper.find('Button').at(2);
    closeButton.simulate('click');
    expect(sendInvoiceConfirmModal.instance().state.open).toBeFalsy();
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});

/*
const mock = [
    {
      request: {
        query: sendInvoiceMutation,
        variables: {
          id: 1,
          sent: false,
          user_id: 1,
          customer_id: 1,
        },
      },
      result: {
        data: {
          sentInvoice: {
            ok: true,
            collaboration: {
              sent: true,
              user_id: 1,
              customer_id: 1,
            },
            errors: null,
          },
        },
      },
    },
  ];

*/
