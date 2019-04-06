/* eslint-disable func-names */
import 'jsdom-global/register';
import React from 'react';
import toJson from 'enzyme-to-json';
import { mount, render } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';

import ProjectListItem from '../components/ProjectListItem';
import { getCustomerById } from '../graphql/query/customer';
import sendInvoiceMutation from '../graphql/mutation/invoice';

// TODO: test for update the data

const waitForData = () => new Promise(res => setTimeout(res, 100));

describe('project list item suite', () => {
  it('renders correctly', () => {
    const wrapper = render(
      <MockedProvider mocks={[]}>
        <ProjectListItem />
      </MockedProvider>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper).toHaveLength(1);
  });
});

describe('pli interaction', () => {
  const mock = [
    {
      request: {
        query: getCustomerById,
        variables: { id: 1 },
      },
      result: {
        data: {
          getCustomer: {
            name: 'Gio',
            surname: 'Fossile',
            email: 'foss@email.com',
            country: 'Italy',
            city: 'Milan',
            address: 'Gross street',
            postal: 9088,
            specialization: 'None',
            user_id: 1,
          },
        },
      },
    },
  ];

  const mockInvoice = [
    {
      request: {
        query: getCustomerById,
        variables: { id: 1 },
      },
      result: {
        data: {
          getCustomer: {
            name: 'Gio',
            surname: 'Fossile',
            email: 'foss@email.com',
            country: 'Italy',
            city: 'Milan',
            address: 'Gross street',
            postal: 9088,
            specialization: 'None',
            user_id: 1,
          },
        },
      },
    },
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

  it('cannot click button if invoice already sent', async () => {
    const wrapper = mount(
      <MockedProvider mocks={mock} addTypename={false}>
        <ProjectListItem
          budget={1000}
          name="Test project"
          vat={100}
          penalty={120}
          date="2019-01-01"
          startHour="09:30:00"
          endHour="10:30:00"
          sent
          customerId={1}
        />
      </MockedProvider>,
    );

    await waitForData();
    wrapper.update();

    const button = wrapper.find('Button').at(1);
    expect(button.instance().props.disabled).toBeTruthy();
  });

  /*
  it('button experiment', async () => {
    const wrapper = mount(
      <MockedProvider mocks={mockInvoice} addTypename={false}>
        <ProjectListItem
          budget={1000}
          name="Test project"
          vat={100}
          penalty={120}
          date="2019-01-01"
          startHour="09:30:00"
          endHour="10:30:00"
          sent={false}
          customerId={1}
        />
      </MockedProvider>,
    );

    await waitForData();
    wrapper.update();

    // const handleSendInvoice = wrapper.find('');
    // console.log(wrapper.find('Button').debug());
    // console.log(wrapper.debug());

    const button = wrapper.find('Button').at(1);
    expect(button.instance().props.disabled).toBeFalsy();
    button.simulate('click');

    await waitForData();
    wrapper.update();

    // console.log(wrapper.find('Button').debug());
    const confirmButton = wrapper.find('Button').at(3);
    confirmButton.simulate('click');

    await waitForData();
    wrapper.update();

    // console.log(confirmButton.debug());
    expect(button.instance().props.disabled).toBeTruthy();
  });
  */
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
