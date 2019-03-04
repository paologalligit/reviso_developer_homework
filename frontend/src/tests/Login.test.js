import React from 'react';
import toJson from 'enzyme-to-json';
import { mount, shallow, render } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';

import Login from '../routes/Login';
import './setupTests';

describe('rendering', () => {
  const mocks = [];
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

  /*
  it('on click should call onSubmit and change state', () => {
    const button = shallow(wrapper.find('button'));
    const mockCallBack = jest.fn();

    button.simulate('click');
    expect(mockCallBack.mock.calls.length).toEqual(1);
  });
  */
});
