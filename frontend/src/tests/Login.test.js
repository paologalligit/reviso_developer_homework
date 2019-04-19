/* eslint-disable func-names */
import 'jsdom-global/register';
import React from 'react';
import toJson from 'enzyme-to-json';
import { mount, shallow, render } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';

import Login from '../routes/Login';
import loginMutation from '../graphql/mutation/user';

const waitForData = () => new Promise(res => setTimeout(res, 100));

describe('login renders', () => {
  const mocks = [
    {
      request: {
        query: loginMutation,
        variables: {
          email: 'p.galli@email.com',
          password: 'bobobo',
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
        <Login />
      </MockedProvider>,
    );
  });

  it('matches snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders login page', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('renders email and password text-input', () => {
    const textInputs = wrapper.find('input');

    expect(textInputs).toHaveLength(2);

    const email = textInputs[0];
    const passw = textInputs[1];

    expect(email.name).toBe('input');
    expect(email.attribs.name).toBe('email');
    expect(email.attribs.placeholder).toBe('Email');

    expect(passw.name).toBe('input');
    expect(passw.attribs.name).toBe('password');
    expect(passw.attribs.placeholder).toBe('Password');
  });

  it('renders submit button', () => {
    const button = wrapper.find('button');
    expect(button).toHaveLength(1);
  });

  it('initially should have flat state', () => {
    const login = shallow(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Login />
      </MockedProvider>,
    );

    const initialState = {
      email: '',
      password: '',
      errors: {},
    };

    login.setState({ initialState });

    expect(login.state().initialState).toEqual({
      email: '',
      password: '',
      errors: {},
    });
  });
});

describe('login interaction', () => {
  const correctMockQuery = [
    {
      request: {
        query: loginMutation,
        variables: { email: 'p.galli@email.com', password: 'bobobo' },
      },
      result: {
        data: {
          login: {
            ok: true,
            token: 'aToken',
            refreshToken: 'aRefreshToken',
            errors: null,
          },
        },
      },
    },
  ];
  const wrongMockQueryPass = [
    {
      request: {
        query: loginMutation,
        variables: { email: 'p.galli@email.com', password: 'wrongPass' },
      },
      result: {
        data: {
          login: {
            ok: false,
            token: null,
            refreshToken: null,
            errors: [
              {
                path: 'password',
                message: 'Wrong password',
              },
            ],
          },
        },
      },
    },
  ];
  const wrongMockQuery = [
    {
      request: {
        query: loginMutation,
        variables: { email: 'wrong@email.com', password: 'wrongPass' },
      },
      result: {
        data: {
          login: {
            ok: false,
            token: null,
            refreshToken: null,
            errors: [
              {
                path: 'email',
                message: 'Wrong email',
              },
            ],
          },
        },
      },
    },
  ];
  const historyMock = { push: jest.fn(path => path) };
  const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJuYW1lIjoiTG9yZW56byIsInN1cm5hbWUiOiJVcHBvbG8iLCJ1c2VybmFtZSI6InVwcG9sbyIsImVtYWlsIjoidXBwb0BlbWFpbC5jb20iLCJiaXJ0aGRhdGUiOiIyMDE5LTAxLTAxIiwiY291bnRyeSI6Ikl0YWx5IiwiY2l0eSI6IkZsb3JlbmNlIiwiYWRkcmVzcyI6InZpYSBjaWFvIiwicG9zdGFsIjoxMjAwfSwiaWF0IjoxNTU0MTI0NDA5LCJleHAiOjE1NTQxMjgwMDl9.ThE2zh4KoddORyNdU8nlJHi-IPTyJRgqZx23OMkV0xQ';
  const mockRefToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozfSwiaWF0IjoxNTU0MTI0NDA5LCJleHAiOjE1NTQ3MjkyMDl9.xY0S9hL_olrC-dkn6HBUndUYVz-uYvigwF2q5jo_wNY';

  it('navigate to / with correct login', async () => {
    const wrapper = mount(
      <MockedProvider mocks={correctMockQuery} addTypename={false}>
        <Login history={historyMock} />
      </MockedProvider>,
    );
    expect(wrapper).toHaveLength(1);
    const inputs = wrapper.find('Input');
    const email = inputs.at(0).find('input');
    const passw = inputs.at(1).find('input');
    const button = wrapper.find('Button');

    email.simulate('change', { target: { name: 'email', value: 'p.galli@email.com' } });
    passw.simulate('change', { target: { name: 'password', value: 'bobobo' } });
    button.simulate('click');

    await waitForData();

    expect(historyMock.push).toHaveBeenCalledTimes(1);
    expect(historyMock.push.mock.calls[0]).toEqual(['/']);
  });

  it('login errors with wrong password', async () => {
    const wrapper = mount(
      <MockedProvider mocks={wrongMockQueryPass} addTypename={false}>
        <Login history={historyMock} />
      </MockedProvider>,
    );
    expect(wrapper).toHaveLength(1);
    const inputs = wrapper.find('Input');
    const email = inputs.at(0).find('input');
    const passw = inputs.at(1).find('input');
    const button = wrapper.find('Button');

    email.simulate('change', { target: { name: 'email', value: 'p.galli@email.com' } });
    passw.simulate('change', { target: { name: 'password', value: 'wrongPass' } });
    button.simulate('click');

    await waitForData();

    const loginState = wrapper.find('Login').instance().state;
    expect(historyMock.push).toHaveBeenCalledTimes(0);
    expect(loginState).toEqual({
      email: 'p.galli@email.com',
      password: 'wrongPass',
      errors: { passwordError: 'Wrong password' },
    });
  });

  it('login errors with wrong email and password', async () => {
    const wrapper = mount(
      <MockedProvider mocks={wrongMockQuery} addTypename={false}>
        <Login history={historyMock} />
      </MockedProvider>,
    );
    expect(wrapper).toHaveLength(1);
    const inputs = wrapper.find('Input');
    const email = inputs.at(0).find('input');
    const passw = inputs.at(1).find('input');
    const button = wrapper.find('Button');

    email.simulate('change', { target: { name: 'email', value: 'wrong@email.com' } });
    passw.simulate('change', { target: { name: 'password', value: 'wrongPass' } });
    button.simulate('click');

    await waitForData();

    const loginState = wrapper.find('Login').instance().state;
    expect(historyMock.push).toHaveBeenCalledTimes(0);
    expect(loginState).toEqual({
      email: 'wrong@email.com',
      password: 'wrongPass',
      errors: { emailError: 'Wrong email' },
    });
  });

  it('trys login if tokens are consistent', () => {
    localStorage.setItem('token', mockToken);
    localStorage.setItem('refreshToken', mockRefToken);

    mount(
      <MockedProvider mocks={wrongMockQuery} addTypename={false}>
        <Login history={historyMock} />
      </MockedProvider>,
    );

    expect(historyMock.push).toHaveBeenCalledTimes(1);
    localStorage.clear();
  });
});
