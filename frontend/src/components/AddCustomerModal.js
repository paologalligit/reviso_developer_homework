import React from 'react';
import {
  Form, Input, Button, Modal,
} from 'semantic-ui-react';
import { withFormik } from 'formik';
import gql from 'graphql-tag';
import { compose, graphql, withApollo } from 'react-apollo';

import getCustomersPerUser from '../graphql/customer';

const AddCustomerModal = ({
  open,
  onClose,
  userId,
  values,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
  resetForm,
  setFieldValue,
}) => (
  <Modal
    open={open}
    onClose={(e) => {
      resetForm();
      onClose(e);
    }}
  >
    <Modal.Header>Add Customer</Modal.Header>
    <Modal.Content>
      <Form>
        <Form.Group unstackable widths={3}>
          <Form.Field>
            <Input
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              name="name"
              fluid
              placeholder="Name"
            />
          </Form.Field>
          <Form.Field>
            <Input
              value={values.surname}
              onChange={handleChange}
              onBlur={handleBlur}
              name="surname"
              fluid
              placeholder="Surname"
            />
          </Form.Field>
          <Form.Field>
            <Form.Field>
              <Input
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                name="email"
                fluid
                placeholder="Email"
              />
            </Form.Field>
          </Form.Field>
        </Form.Group>

        <Form.Group unstackable widths={3}>
          <Form.Field>
            <Input
              value={values.country}
              onChange={handleChange}
              onBlur={handleBlur}
              name="country"
              fluid
              placeholder="Country"
            />
          </Form.Field>
          <Form.Field>
            <Input
              value={values.city}
              onChange={handleChange}
              onBlur={handleBlur}
              name="city"
              fluid
              placeholder="City"
            />
          </Form.Field>
          <Form.Field>
            <Input
              value={values.postal}
              onChange={handleChange}
              onBlur={handleBlur}
              name="postal"
              placeholder="Postal"
            />
          </Form.Field>
        </Form.Group>

        <Form.Group unstackable widths={2}>
          <Form.Field>
            <Input
              value={values.address}
              onChange={handleChange}
              onBlur={handleBlur}
              name="address"
              fluid
              placeholder="Address"
            />
          </Form.Field>
          <Form.Field>
            <Input
              value={values.specialization}
              onChange={handleChange}
              onBlur={handleBlur}
              name="specialization"
              fluid
              placeholder="Specialization"
            />
          </Form.Field>
        </Form.Group>

        <Form.Group widths="equal">
          <Button
            disabled={isSubmitting}
            fluid
            onClick={(e) => {
              resetForm();
              onClose(e);
            }}
          >
            Cancel
          </Button>
          <Button disabled={isSubmitting} onClick={handleSubmit} fluid>
            Create Customer
          </Button>
        </Form.Group>
      </Form>
    </Modal.Content>
  </Modal>
);

const createCustomerMutation = gql`
  mutation ($name: String!, $surname: String!,
    $email: String!, $country: String!, $city: String!, 
      $address: String!, $postal: Int!, $specialization: String!, 
       $user_id: Int!) {
    registerCustomer(name: $name, surname: $surname,
      email: $email, country: $country, city: $city, 
       address: $address, postal: $postal, specialization: $specialization, 
        user_id: $user_id) {
      ok
      customer {
        id
        name
        surname
        email
        country
        city
        address
        postal
        user_id
        specialization
      }
      errors {
        path
        message
      }
    }
  }
`;

export default compose(
  graphql(createCustomerMutation),
  withFormik({
    mapPropsToValues: ({ userId }) => ({
      userId,
      name: '',
      surname: '',
      country: '',
      email: '',
      city: '',
      specialization: '',
      address: '',
      postal: '',
    }),
    handleSubmit: async (values, { props: { onClose, userId, mutate }, setSubmitting }) => {
      console.log('the values: ', values);
      await mutate({
        variables: {
          name: values.name,
          surname: values.surname,
          country: values.country,
          email: values.email,
          city: values.city,
          specialization: values.specialization,
          address: values.address,
          postal: parseInt(values.postal, 10),
          user_id: userId,
        },
        optimisticResponse: {
          __typename: 'Mutation',
          registerCustomer: {
            __typename: 'Mutation',
            ok: true,
            errors: null,
            customer: {
              __typename: 'RegisterCustomer',
              id: -1,
              name: values.name,
              surname: values.surname,
              country: values.country,
              email: values.email,
              city: values.city,
              specialization: values.specialization,
              address: values.address,
              postal: parseInt(values.postal, 10),
              user_id: userId,
            },
          },
        },
        update: (store, { data: { registerCustomer } }) => {
          const { ok, customer, errors } = registerCustomer;
          // console.log('register customer: ', customer);
          if (!ok) {
            return;
          }

          const data = store.readQuery({
            query: getCustomersPerUser,
            variables: { user_id: values.userId },
          });

          // console.log('only data: ', data);

          // console.log('the data before: ', data.getCustomersPerUser);

          data.getCustomersPerUser.push(customer);

          // console.log('the data after: ', data.getCustomersPerUser);

          store.writeQuery({
            query: getCustomersPerUser,
            variables: { user_id: values.userId },
            data,
          });
        },
      });
      onClose();
      setSubmitting(false);
    },
  }),
)(withApollo(AddCustomerModal));
