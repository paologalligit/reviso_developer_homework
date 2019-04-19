/* eslint-disable func-names */
import 'jsdom-global/register';
import React from 'react';
import toJson from 'enzyme-to-json';
import { mount, shallow } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';

import ShowCustomer from '../components/ShowCustomer';

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
  const mockCustomer = {
    name: 'Prova',
    surname: 'Uno',
    email: 'primo@email.com',
    country: 'Italy',
    city: 'Cirili',
    address: 'Via di qui, 98',
    postal: 90998,
    specialization: 'None',
    user_id: 1,
  };

  it('shows loading state if waiting data', () => {
    const wrapper = mount(
      <MockedProvider mocks={[]} addTypename={false}>
        <ShowCustomer customer={mockCustomer} loading />
      </MockedProvider>,
    );

    const showCustomer = wrapper.find('ShowCustomer');

    const data = showCustomer.props();
    const loader = showCustomer.find('Loader');

    expect(data.loading).toBeTruthy();
    expect(loader).toHaveLength(1);
  });

  it("shows customer's infos correctly", () => {
    const wrapper = mount(
      <MockedProvider mocks={[]} addTypename={false}>
        <ShowCustomer customer={mockCustomer} loading={false} />
      </MockedProvider>,
    );

    const showCustomer = wrapper.find('ShowCustomer');

    const data = showCustomer.props();

    expect(data.loading).toBeFalsy();
    expect(data.customer).toEqual({
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
});
