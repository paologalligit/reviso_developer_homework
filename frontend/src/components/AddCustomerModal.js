/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React from 'react';
import {
  Form, Input, Button, Modal,
} from 'semantic-ui-react';
import { withFormik } from 'formik';
import { compose, graphql } from 'react-apollo';
import isDecimal from 'validator/lib/isDecimal';

import getCustomersPerUser from '../graphql/query/customer';
import normalizeErrors from '../normalizeErrors';
import createCustomerMutation from '../graphql/mutation/customer';

// userId,
// console.log('errors: ', touched);
const AddCustomerModal = ({
  open,
  onClose,
  // userId,
  values,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
  resetForm,
  errors,
  touched,
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
          <Form.Field error={!!errors.name}>
            <Input
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              name="name"
              fluid
              placeholder="Name"
            />
            {touched.name && errors.name ? errors.name[0] : null}
          </Form.Field>
          <Form.Field error={!!errors.surname}>
            <Input
              value={values.surname}
              onChange={handleChange}
              onBlur={handleBlur}
              name="surname"
              fluid
              placeholder="Surname"
            />
            {touched.surname && errors.surname ? errors.surname[0] : null}
          </Form.Field>
          <Form.Field error={!!errors.email}>
            <Input
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              name="email"
              fluid
              placeholder="Email"
            />
            {touched.email && errors.email ? errors.email[0] : null}
          </Form.Field>
        </Form.Group>

        <Form.Group unstackable widths={3}>
          <Form.Field error={!!errors.country}>
            <Input
              value={values.country}
              onChange={handleChange}
              onBlur={handleBlur}
              name="country"
              fluid
              placeholder="Country"
            />
            {touched.country && errors.country ? errors.country[0] : null}
          </Form.Field>
          <Form.Field error={!!errors.city}>
            <Input
              value={values.city}
              onChange={handleChange}
              onBlur={handleBlur}
              name="city"
              fluid
              placeholder="City"
            />
            {touched.city && errors.city ? errors.city[0] : null}
          </Form.Field>
          <Form.Field error={!!errors.postal}>
            <Input
              value={values.postal}
              onChange={handleChange}
              onBlur={handleBlur}
              name="postal"
              placeholder="Postal"
            />
            {touched.postal && errors.postal ? errors.postal[0] : null}
          </Form.Field>
        </Form.Group>

        <Form.Group unstackable widths={2}>
          <Form.Field error={!!errors.address}>
            <Input
              value={values.address}
              onChange={handleChange}
              onBlur={handleBlur}
              name="address"
              fluid
              placeholder="Address"
            />
            {touched.address && errors.address ? errors.address[0] : null}
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
    handleSubmit: async (
      values,
      { props: { onClose, userId, mutate }, setSubmitting, setErrors },
    ) => {
      if (isDecimal(values.postal)) {
        const response = await mutate({
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
            const { ok, customer } = registerCustomer;
            if (!ok) {
              return;
            }

            const data = store.readQuery({
              query: getCustomersPerUser,
              variables: { user_id: values.userId },
            });

            data.getCustomersPerUser.push(customer);

            store.writeQuery({
              query: getCustomersPerUser,
              variables: { user_id: values.userId },
              data,
            });
          },
        });

        const { ok, errors } = response.data.registerCustomer;
        if (ok) {
          onClose();
        } else {
          setErrors(normalizeErrors(errors));
        }
      } else {
        setErrors({
          postal: ['Postal number required'],
        });
      }

      setSubmitting(false);
    },
  }),
)(AddCustomerModal);
