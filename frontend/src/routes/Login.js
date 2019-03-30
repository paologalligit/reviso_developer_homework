/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import {
  Button, Container, Header, Form, Message,
} from 'semantic-ui-react';
import { graphql } from 'react-apollo';

import styles from './styles/LoginStyle';
import isAuthenticated from '../utils/auth';
import loginMutation from '../graphql/mutation/user';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      errors: {},
    };

    this.tryLogin();
  }

  tryLogin = () => {
    if (isAuthenticated()) {
      this.props.history.push('/');
    }
  };

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  onSubmit = async () => {
    const { email, password } = this.state;

    const response = await this.props.mutate({
      variables: { email, password },
    });

    const {
      ok, token, refreshToken, errors,
    } = response.data.login;

    if (ok) {
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      this.props.history.push('/');
    } else {
      const err = {};
      errors.forEach(({ path, message }) => {
        err[`${path}Error`] = message;
      });

      this.setState({ errors: err });
    }
  };

  render() {
    const {
      email,
      password,
      errors: { emailError, passwordError },
    } = this.state;

    const errorList = [];

    if (emailError) {
      errorList.push(emailError);
    }

    if (passwordError) {
      errorList.push(passwordError);
    }

    return (
      <Container text textAlign="center" style={styles.login}>
        <Header as="h2">Login</Header>
        <Form>
          <Form.Field error={!!emailError}>
            <Form.Input
              icon="user"
              iconPosition="left"
              name="email"
              onChange={this.onChange}
              value={email}
              placeholder="Email"
              fluid
            />
          </Form.Field>
          <Form.Field error={!!passwordError}>
            <Form.Input
              icon="lock"
              iconPosition="left"
              name="password"
              onChange={this.onChange}
              value={password}
              type="password"
              placeholder="Password"
              fluid
            />
          </Form.Field>
          <Button onClick={this.onSubmit} primary size="huge">
            Submit
          </Button>
        </Form>
        {errorList.length ? (
          <Message
            error
            header="There was some errors with your submission"
            list={errorList}
            compact
          />
        ) : null}

        <Message>
          New to us?
          {' '}
          <a href="/register">Sign Up</a>
        </Message>
      </Container>
    );
  }
}

export default graphql(loginMutation)(Login);
