import 'jsdom-global/register';
import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow, render, mount } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';

import AddCustomerModal from '../components/AddCustomerModal';
import createCustomerMutation from '../graphql/mutation/customer';

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
          name: 'Biello',
          surname: 'Imployr',
          email: 'ymplo@email.com',
          country: 'Italy',
          city: 'Cibby',
          address: 'Downson Street',
          postal: 90887,
          specialization: 'Pollo',
          user_id: 1,
        },
      },
      result: {
        data: {
          registerCustomer: {
            ok: true,
            customer: {
              id: 1,
              name: 'Biello',
              surname: 'Imployr',
              email: 'ymplo@email.com',
              country: 'Italy',
              city: 'Cibby',
              address: 'Downson Street',
              postal: 90887,
              specialization: 'Pollo',
              user_id: 1,
            },
            errors: null,
          },
        },
      },
    },
  ];
  const onCloseMock = jest.fn();

  it('register a new customer', () => {
    const wrapper = mount(
      <MockedProvider mocks={correctMock} addTypename={false}>
        <AddCustomerModal open onClose={onCloseMock} />
      </MockedProvider>,
    );

    const modal = wrapper.find('Modal');
    // console.log('the modal: ', modal.debug())
    const modalProps = modal.props();
    /*
    const formsInput = modal.find('Input');
    // console.log(formsInput.debug());

    const nameIn = formsInput.at(0);
    const surnameIn = formsInput.at(1);
    const emailIn = formsInput.at(2);
    const countryIn = formsInput.at(3);
    const cityIn = formsInput.at(4);
    const postalIn = formsInput.at(5);
    const addressIn = formsInput.at(6);
    const specIn = formsInput.at(7);
    */
    // .simulate('change', {
    //   persist: () => {},
    //   target: {
    //     name: 'name',
    //     value: 'Biello',
    //   },
    // });

    /*
    wrapper.find('form').simulate('submit');

    console.log(
      wrapper
        .find('Input')
        .at(0)
        .props().value,
    );

    const newValue = wrapper
      .find(AddCustomerModal)
      .dive()
      .find('input')
      .at(0)
      .props().value;

    console.log('the value:_ ', newValue);
    */
    modalProps.onClose();
  });
});
