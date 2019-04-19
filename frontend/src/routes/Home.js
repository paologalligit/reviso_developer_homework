import React, { Component } from 'react';
import decode from 'jwt-decode';

import HomeView from '../components/HomeView';

class Home extends Component {
  constructor(props) {
    super(props);

    const userInfos = this.decodeToken();
    this.state = { ...userInfos, ...{ activeItem: 'personal' } };
  }

  decodeToken = () => {
    try {
      const token = localStorage.getItem('token');
      const { user } = decode(token);

      return user;
    } catch (err) {}

    return {};
  };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  displayWelcomeMessage = () => {
    const { name, surname } = this.state;
    return `Welcome ${name} ${surname}`;
  };

  handleLogOut = () => {
    localStorage.clear();
    this.props.history.replace('/login');
  };

  render() {
    const user = this.state;

    return (
      <HomeView
        user={user}
        displayWelcomeMessage={this.displayWelcomeMessage}
        handleLogOut={this.handleLogOut}
        handleItemClick={this.handleItemClick}
        navigator={this.props.history}
      />
    );
  }
}

export default Home;
