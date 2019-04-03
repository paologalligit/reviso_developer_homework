/* eslint-disable func-names */
import 'jsdom-global/register';
import React from 'react';
import toJson from 'enzyme-to-json';
import { mount, shallow } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';

import ShowCustomer from '../components/ShowCustomer';
import { getCustomerById } from '../graphql/query/customer';

const waitForData = () => new Promise(res => setTimeout(res, 100));

describe('show customer renders', () => {
  it('renders correctly', () => {
    const wrapper = shallow(
      <MockedProvider mocks={[]} addTypename={false}>
        <ShowCustomer />
      </MockedProvider>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper).toHaveLength(1);
  });
});

describe('show customer interaction', () => {
  const mock = [
    {
      request: {
        query: getCustomerById,
        variables: { id: 1 },
      },
      result: {
        data: {
          getCustomer: {
            name: 'Prova',
            surname: 'Uno',
            email: 'primo@email.com',
            country: 'Italy',
            city: 'Cirili',
            address: 'Via di qui, 98',
            postal: 90998,
            specialization: 'None',
            user_id: 1,
          },
        },
      },
    },
  ];

  it('to be fixed', async () => {
    const wrapper = mount(
      <MockedProvider mocks={mock} addTypename={false}>
        <ShowCustomer customerId={1} />
      </MockedProvider>,
    );

    await waitForData();
    wrapper.update();

    const showCustomer = wrapper.find('ShowCustomer');

    const data = showCustomer.props();

    expect(data.data.loading).toBeFalsy();
    expect(data.data.getCustomer).toEqual({
      name: 'Prova',
      surname: 'Uno',
      email: 'primo@email.com',
      country: 'Italy',
      city: 'Cirili',
      address: 'Via di qui, 98',
      postal: 90998,
      specialization: 'None',
      user_id: 1,
    });
  });

  // TODO: test when clicked
});
