/* eslint-disable func-names */
import 'jsdom-global/register';
import React from 'react';
import toJson from 'enzyme-to-json';
import { mount, render } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';

import registerMutation from '../graphql/mutation/register';
import Register from '../routes/Register';

const waitForData = () => new Promise(res => setTimeout(res, 100));

describe('register renders', () => {
  const mocks = [
    {
      request: {
        query: registerMutation,
        variables: {
          name: 'paolo',
          surname: 'galli',
          username: 'pgalli',
          email: 'p.galli@email.com',
          password: 'bobobo',
          birthdate: '1991-12-31',
          country: 'Italy',
          city: 'Milan',
          address: 'Via ciancihi, 98',
          postal: 20100,
        },
      },
      result: {
        data: {
          ok: true,
          user: {
            id: 1,
          },
          errors: null,
        },
      },
    },
  ];
  let wrapper;

  // initialization
  beforeEach(() => {
    wrapper = render(
      <MockedProvider mocks={mocks}>
        <Register />
      </MockedProvider>,
    );
  });

  it('matches snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders login page', () => {
    expect(wrapper).toHaveLength(1);
  });
});

describe('register interaction', () => {
  const correctMockQuery = [
    {
      request: {
        query: registerMutation,
        variables: {
          name: 'paolo',
          surname: 'galli',
          username: 'pgalli',
          email: 'p.galli@email.com',
          password: 'bobobo',
          birthdate: '1991-12-31',
          country: 'Italy',
          city: 'Milan',
          address: 'Via ciancichi, 98',
          postal: 20100,
        },
      },
      result: {
        data: {
          registerUser: {
            ok: true,
            errors: null,
          },
        },
      },
    },
  ];
  const wrongMockQuery = [
    {
      request: {
        query: registerMutation,
        variables: {
          name: 'paolo',
          surname: 'galli',
          username: 'pgalli',
          email: 'p.galli@email.com',
          password: 'bobobo',
          birthdate: '1991-12-31',
          country: 'Italy',
          city: 'Milan',
          address: 'Via ciancichi, 98',
          postal: 20100,
        },
      },
      result: {
        data: {
          registerUser: {
            ok: false,
            errors: [
              {
                path: 'username',
                message: 'username must be unique',
              },
            ],
          },
        },
      },
    },
  ];
  const historyMock = { push: jest.fn(path => path) };

  it('navigate to / with correct login', async () => {
    const wrapper = mount(
      <MockedProvider mocks={correctMockQuery} addTypename={false}>
        <Register history={historyMock} />
      </MockedProvider>,
    );
    expect(wrapper).toHaveLength(1);
    const inputs = wrapper.find('Input');
    const name = inputs.at(0).find('input');
    const surname = inputs.at(1).find('input');
    const username = inputs.at(2).find('input');
    const email = inputs.at(3).find('input');
    const password = inputs.at(4).find('input');
    const birthdate = inputs.at(5).find('input');
    const country = inputs.at(6).find('input');
    const city = inputs.at(7).find('input');
    const address = inputs.at(8).find('input');
    const postal = inputs.at(9).find('input');
    const button = wrapper.find('Button');

    name.simulate('change', { target: { name: 'name', value: 'paolo' } });
    surname.simulate('change', { target: { name: 'surname', value: 'galli' } });
    username.simulate('change', { target: { name: 'username', value: 'pgalli' } });
    email.simulate('change', { target: { name: 'email', value: 'p.galli@email.com' } });
    password.simulate('change', { target: { name: 'password', value: 'bobobo' } });
    birthdate.simulate('change', { target: { name: 'birthdate', value: '1991-12-31' } });
    country.simulate('change', { target: { name: 'country', value: 'Italy' } });
    city.simulate('change', { target: { name: 'city', value: 'Milan' } });
    address.simulate('change', { target: { name: 'address', value: 'Via ciancichi, 98' } });
    postal.simulate('change', { target: { name: 'postal', value: 20100 } });

    button.simulate('click');

    await waitForData();

    expect(historyMock.push).toHaveBeenCalledTimes(1);
    expect(historyMock.push.mock.calls[0]).toEqual(['/']);
  });

  it('login errors with wrong fields', async () => {
    const wrapper = mount(
      <MockedProvider mocks={wrongMockQuery} addTypename={false}>
        <Register history={historyMock} />
      </MockedProvider>,
    );
    expect(wrapper).toHaveLength(1);
    const inputs = wrapper.find('Input');
    const name = inputs.at(0).find('input');
    const surname = inputs.at(1).find('input');
    const username = inputs.at(2).find('input');
    const email = inputs.at(3).find('input');
    const password = inputs.at(4).find('input');
    const birthdate = inputs.at(5).find('input');
    const country = inputs.at(6).find('input');
    const city = inputs.at(7).find('input');
    const address = inputs.at(8).find('input');
    const postal = inputs.at(9).find('input');
    const button = wrapper.find('Button');

    name.simulate('change', { target: { name: 'name', value: 'paolo' } });
    surname.simulate('change', { target: { name: 'surname', value: 'galli' } });
    username.simulate('change', { target: { name: 'username', value: 'pgalli' } });
    email.simulate('change', { target: { name: 'email', value: 'p.galli@email.com' } });
    password.simulate('change', { target: { name: 'password', value: 'bobobo' } });
    birthdate.simulate('change', { target: { name: 'birthdate', value: '1991-12-31' } });
    country.simulate('change', { target: { name: 'country', value: 'Italy' } });
    city.simulate('change', { target: { name: 'city', value: 'Milan' } });
    address.simulate('change', { target: { name: 'address', value: 'Via ciancichi, 98' } });
    postal.simulate('change', { target: { name: 'postal', value: 20100 } });

    button.simulate('click');

    await waitForData();

    const loginState = wrapper.find('Register').instance().state;
    expect(historyMock.push).toHaveBeenCalledTimes(0);
    expect(loginState).toEqual({
      address: 'Via ciancichi, 98',
      birthdate: '1991-12-31',
      city: 'Milan',
      country: 'Italy',
      email: 'p.galli@email.com',
      errors: { usernameError: 'username must be unique' },
      name: 'paolo',
      password: 'bobobo',
      postal: 20100,
      surname: 'galli',
      username: 'pgalli',
    });
  });
});
