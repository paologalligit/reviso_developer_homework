import React, {Component} from 'react';
import {Button, Container, Grid, Header, Icon, Image, Menu, Segment} from 'semantic-ui-react'
import decode from 'jwt-decode';

import styles from './styles/HomeStyle';
import homeMenu from '../components/HomeMenu';

class Home extends Component {
  constructor(props) {
    super(props);

    const userInfos = this.decodeToken();
    this.state = { ...userInfos, ...{ activeItem: 'personal' } }
  }

  decodeToken = () => {
    try {
      const token = localStorage.getItem('token');
      const {user} = decode(token);

      return user;
    } catch (err) {
      console.log('Error decoding the token');
    }

    return {};
  };

  handleItemClick = (e, {name}) => this.setState({activeItem: name});

  displayWelcomeMessage = () => {
    const { name, surname } = this.state;
    return 'Welcome ' + name + ' ' + surname;
  };

  handleLogOut = () => {
    localStorage.clear();
    this.props.history.replace('/login');
  };

  render() {

    const user = this.state;
    const { activeItem } = user;

    return (
      <Container
        style={styles.home}
      >
        <Grid columns='equal'>
          <Grid.Column />
          <Grid.Column width={8}>
            <Header as='h2' icon textAlign='center'>
              <Icon name='user' circular/>
              <Header.Content>{this.displayWelcomeMessage()}</Header.Content>
            </Header>
          </Grid.Column>
          <Grid.Column>
            <Button
              primary
              style={styles.logout}
              onClick={this.handleLogOut}
            >
              Log Out
            </Button>
          </Grid.Column>
        </Grid>
        <Grid>
          <Grid.Column width={4}>
            <Menu fluid vertical tabular>
              <Menu.Item name='personal' active={activeItem === 'personal'} onClick={this.handleItemClick}/>
              <Menu.Item name='register' active={activeItem === 'register'} onClick={this.handleItemClick}/>
              <Menu.Item
                name='view'
                active={activeItem === 'view'}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                name='settings'
                active={activeItem === 'settings'}
                onClick={this.handleItemClick}
              />
            </Menu>
          </Grid.Column>

          <Grid.Column stretched width={12}>
            {homeMenu(user)}
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

export default Home;
