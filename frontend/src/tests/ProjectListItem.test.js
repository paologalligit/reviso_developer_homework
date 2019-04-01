/* eslint-disable func-names */
import 'jsdom-global/register';
import React from 'react';
import toJson from 'enzyme-to-json';
import { mount, render } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';

import ProjectListItem from '../components/ProjectListItem';

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
  it('cannot click button if invoice already sent', () => {
    const wrapper = mount(
      <MockedProvider mocks={[]}>
        <ProjectListItem
          budget={1000}
          name="Test project"
          vat={100}
          penalty={120}
          date="2019-01-01"
          startHour="09:30:00"
          endHour="10:30:00"
          sent
        />
      </MockedProvider>,
    );

    const button = wrapper.find('Button');
    expect(button.instance().props.disabled).toBeTruthy();
  });
});
