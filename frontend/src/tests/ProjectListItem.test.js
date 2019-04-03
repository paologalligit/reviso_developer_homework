/* eslint-disable func-names */
import 'jsdom-global/register';
import React from 'react';
import toJson from 'enzyme-to-json';
import { mount, render } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';

import ProjectListItem from '../components/ProjectListItem';
import { getCustomerById } from '../graphql/query/customer';

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

  it('cannot click button if invoice already sent', async () => {
    const wrapper = mount(
      <MockedProvider mocks={mock}>
        <ProjectListItem
          budget={1000}
          name="Test project"
          vat={100}
          penalty={120}
          date="2019-01-01"
          startHour="09:30:00"
          endHour="10:30:00"
          sent
          customerId={1}
        />
      </MockedProvider>,
    );

    const button = wrapper.find('Button');
    expect(button.instance().props.disabled).toBeTruthy();
  });
});
