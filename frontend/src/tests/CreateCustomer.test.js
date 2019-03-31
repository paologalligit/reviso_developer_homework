import 'jsdom-global/register';
import React from 'react';
import toJson from 'enzyme-to-json';
import { mount, render } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';

import CreateCustomer from '../containers/CreateCustomer';

describe('renders create customer', () => {
  it('matches snapshot', () => {
    const wrapper = render(
      <MockedProvider>
        <CreateCustomer />
      </MockedProvider>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

describe('open and close modal', () => {
  it('', () => {
    const wrapper = mount(
      <MockedProvider mocks={[]}>
        <CreateCustomer />
      </MockedProvider>,
    );
    expect(wrapper).toHaveLength(1);
    const createCustomer = wrapper.find('CreateCustomer');
    const button = wrapper.find('Button').first();
    // console.log(button.debug());

    expect(createCustomer.instance().state.openAddCustomerModal).toBeFalsy();
    button.simulate('click');
    expect(createCustomer.instance().state.openAddCustomerModal).toBeTruthy();
    button.simulate('click');
    expect(createCustomer.instance().state.openAddCustomerModal).toBeFalsy();
  });
});