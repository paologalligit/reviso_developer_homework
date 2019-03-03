import React from 'react';
import { Button } from 'semantic-ui-react';
import toJson from 'enzyme-to-json';
import { mount, shallow, render } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';

import Login from '../routes/Login';
import './setupTests';

describe('rendering', () => {
  const mocks = [];
  let wrapper;

  // initialization
  beforeAll(() => {
    wrapper = render(
      <MockedProvider mocks={mocks}>
        <Login />
      </MockedProvider>,
    );
  });

  it('matches snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders submit button', () => {
    const login = wrapper.find(Login);

    expect(login.find(Button).contains('Submit')).toBe(true);
  });
});
