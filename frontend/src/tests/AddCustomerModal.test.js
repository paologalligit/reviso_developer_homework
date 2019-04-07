import 'jsdom-global/register';
import React from 'react';
import toJson from 'enzyme-to-json';
import { render, mount } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';

import AddCustomerModal from '../components/AddCustomerModal';
import createCustomerMutation from '../graphql/mutation/customer';

const waitForData = () => new Promise(res => setTimeout(res, 100));

describe('add customer modal rendering', () => {
  it('renders correctly', () => {
    const wrapper = render(
      <MockedProvider>
        <AddCustomerModal />
      </MockedProvider>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

describe('add customer modal interaction', () => {
  const correctMock = [
    {
      request: {
        query: createCustomerMutation,
        variables: {
          name: 'Gio',
          surname: 'Polpo',
          country: 'Test',
          email: 'test@email.com',
          city: 'Testino',
          specialization: 'None',
          address: 'Test Street',
          postal: 2344,
          user_id: 1,
        },
      },
      result: {
        data: {
          registerCustomer: {
            ok: true,
            customer: {
              id: 1,
              name: 'Gio',
              surname: 'Polpo',
              country: 'Test',
              email: 'test@email.com',
              city: 'Testino',
              specialization: 'None',
              address: 'Test Street',
              postal: 2344,
            },
            errors: null,
          },
        },
      },
    },
  ];
  const onCloseMock = jest.fn();

  it('register a new customer', async () => {
    const wrapper = mount(
      <MockedProvider mocks={correctMock} addTypename={false}>
        <AddCustomerModal
          open
          onClose={onCloseMock}
          userId={1}
          name="Gio"
          surname="Polpo"
          country="Test"
          email="test@email.com"
          city="Testino"
          specialization="None"
          address="Test Street"
          postal={2344}
        />
      </MockedProvider>,
    );
    console.error = jest.fn();

    const modal = wrapper.find('Modal');

    const button = modal.find('Button').at(1);

    expect(onCloseMock).toHaveBeenCalledTimes(0);
    button.simulate('click');

    await waitForData();

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('closes form correctly if cancel button pressed', () => {
    const wrapper = mount(
      <MockedProvider mocks={correctMock} addTypename={false}>
        <AddCustomerModal open onClose={onCloseMock} />
      </MockedProvider>,
    );

    const modal = wrapper.find('Modal');

    const button = modal.find('Button').at(0);
    button.simulate('click');

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
