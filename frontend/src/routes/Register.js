import React from 'react';
import {Message, Button, Input, Container, Header, Form} from 'semantic-ui-react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';

import style from './styles/RegisterStyle';

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      nameError: '',
      surname: '',
      surnameError: '',
      username: '',
      usernameError: '',
      email: '',
      emailError: '',
      password: '',
      passwordError: '',
      birthdate: '',
      birthdateError: '',
      country: '',
      countryError: '',
      city: '',
      cityError: '',
      address: '',
      addressError: '',
      postal: '',
      postalError: 0
    };
  }

  onSubmit = async () => {
    this.setState({
      nameError: '',
      surnameError: '',
      usernameError: '',
      emailError: '',
      passwordError: '',
      birthdateError: '',
      countryError: '',
      cityError: '',
      addressError: '',
      postalError: ''
    });

    const {
      name, surname, username, email, password, birthdate, country, city, address, postal
    } = this.state;

    let intPostal;

    if (postal === '') {
      this.setState({
        postalError: 'Invalid name'
      });

      intPostal = -1;
    }
    else {
      intPostal = parseInt(postal, 10);
    }

    const response = await this.props.mutate({
      variables: {
        name, surname, username, email, password, birthdate, country, city, address, postal: intPostal
      }
    });

    // console.log(response);

    const {ok, errors} = response.data.registerUser;

    if (ok) {
      this.props.history.push('/');
    } else {
      console.log('the errors, smthg went wrong: ', errors);
      const err = {};
      errors.forEach(({path, message}) => {
        // err['passwordError'] = 'too long..';
        err[`${path}Error`] = message;
      });

      this.setState(err);
    }
  };

  onChange = (e) => {
    const {name, value} = e.target;
    this.setState({[name]: value});
  };

  render() {
    const {
      name,
      nameError,
      surname,
      surnameError,
      username,
      usernameError,
      email,
      emailError,
      password,
      passwordError,
      birthdate,
      birthdateError,
      country,
      countryError,
      city,
      cityError,
      address,
      addressError,
      postal,
      postalError
    } = this.state;

    const errorList = [];

    if (nameError) {
      errorList.push(usernameError);
    }

    if (surnameError) {
      errorList.push(emailError);
    }

    if (usernameError) {
      errorList.push(usernameError);
    }

    return (
      <Container
        text
        textAlign={'center'}
        style={style.register}
      >
        <Header as="h2">Register</Header>
        <Form>
          <Form.Field error={!!nameError}>
            <Input
              name="name"
              onChange={this.onChange}
              value={name}
              placeholder="Name"
              fluid
            />
          </Form.Field>
          <Form.Field error={!!surnameError}>
            <Input
              name="surname"
              onChange={this.onChange}
              value={surname}
              placeholder="Surname"
              fluid
            />
          </Form.Field>
          <Form.Field error={!!usernameError}>
            <Input
              name="username"
              onChange={this.onChange}
              value={username}
              placeholder="Username"
              fluid
            />
          </Form.Field>
          <Form.Field error={!!emailError}>
            <Input
              name="email"
              onChange={this.onChange}
              value={email}
              placeholder="Email"
              fluid
            />
          </Form.Field>
          <Form.Field error={!!passwordError}>
            <Input
              name="password"
              onChange={this.onChange}
              value={password}
              type="password"
              placeholder="Password"
              fluid
            />
          </Form.Field>
          <Form.Field error={!!birthdateError}>
            <Input
              name="birthdate"
              onChange={this.onChange}
              value={birthdate}
              placeholder="Birthdate"
              fluid
            />
          </Form.Field>
          <Form.Field error={!!countryError}>
            <Input
              name="country"
              onChange={this.onChange}
              value={country}
              placeholder="Country"
              fluid
            />
          </Form.Field>
          <Form.Field error={!!cityError}>
            <Input
              name="city"
              onChange={this.onChange}
              value={city}
              placeholder="City"
              fluid
            />
          </Form.Field>
          <Form.Field error={!!addressError}>
            <Input
              name="address"
              onChange={this.onChange}
              value={address}
              placeholder="Address"
              fluid
            />
          </Form.Field>
          <Form.Field error={!!postalError}>
            <Input
              name="postal"
              onChange={this.onChange}
              value={postal}
              placeholder="Postal"
              fluid
            />
          </Form.Field>
          <Button onClick={this.onSubmit}>Submit</Button>
        </Form>
        {errorList.length ? (
          <Message error header="There was some errors with your submission"/>
        ) : null}
      </Container>
    );
  }
}

const registerMutation = gql`
  mutation ($name: String!, $surname: String!, $username: String!, $email: String!,
    $password: String!, $birthdate: String!, $country: String!, $city: String!,
      $address: String!, $postal: Int!) {
  registerUser(name: $name, surname: $surname, username: $username,
    email: $email, password:$password, birthdate: $birthdate, country: $country, 
    	city: $city, address: $address,	postal: $postal) {
      ok
      errors {
        path
        message
      }
    }
}
`;

export default graphql(registerMutation)(Register);