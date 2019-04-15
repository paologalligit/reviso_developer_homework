/* eslint-disable func-names */
import 'jsdom-global/register';
import React from 'react';
import toJson from 'enzyme-to-json';
import { mount, render } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';

import ProjectListItem from '../components/ProjectListItem';
import { getCustomerById } from '../graphql/query/customer';
import sendInvoiceMutation from '../graphql/mutation/invoice';
// import collaborationsQuery from '../graphql/query/collaboration';

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
    // customer query
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
    // send query
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
              id: 1,
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

  const mockAlreadySentInvoice = [
    // customer query
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
    // error on already sent invoice query
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
            ok: false,
            collaboration: null,
            errors: [
              {
                path: 'Sent invoice',
                message: 'Invoice already sent',
              },
            ],
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

  it('marking invoice as sent', async () => {
    const wrapper = mount(
      <MockedProvider mocks={mockInvoice} addTypename={false}>
        <ProjectListItem
          id={1}
          budget={1000}
          name="Test project"
          vat={100}
          penalty={120}
          date="2019-01-01"
          startHour="09:30:00"
          endHour="10:30:00"
          sent={false}
          customerId={1}
          userId={1}
        />
      </MockedProvider>,
    );

    await waitForData();
    wrapper.update();

    const projectListItem = wrapper.find('ProjectListItem');

    const { handleSendInvoice } = projectListItem.instance();
    const response = await handleSendInvoice();

    expect(response).toEqual({
      collaboration: {
        customer_id: 1, id: 1, sent: true, user_id: 1,
      },
      errors: null,
      ok: true,
    });
  });

  it('cannot mark an already sent invoice as sent', async () => {
    const wrapper = mount(
      <MockedProvider mocks={mockAlreadySentInvoice} addTypename={false}>
        <ProjectListItem
          id={1}
          budget={1000}
          name="Test project"
          vat={100}
          penalty={120}
          date="2019-01-01"
          startHour="09:30:00"
          endHour="10:30:00"
          sent
          customerId={1}
          userId={1}
        />
      </MockedProvider>,
    );

    await waitForData();
    wrapper.update();

    const projectListItem = wrapper.find('ProjectListItem');

    const { handleSendInvoice } = projectListItem.instance();
    const response = await handleSendInvoice();

    expect(response).toEqual({
      collaboration: null,
      errors: [{ message: 'Invoice already sent', path: 'Sent invoice' }],
      ok: false,
    });
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

  // collaboration query
    {
      request: {
        query: collaborationsQuery,
        variables: {
          user_id: 1,
          customer_id: 1,
        },
      },
      result: {
        data: {
          filteredCollaborations: [
            {
              id: 1,
              name: 'Vediamo un po',
              budget: 9999,
              vat: 9,
              penalty: '9',
              date: '1554126667489',
              start_hour: '15:51:07',
              end_hour: '15:51:07',
              user_id: 3,
              customer_id: 4,
              sent: false,
            },
          ],
        },
      },
    },

*/
