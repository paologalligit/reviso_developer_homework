import React from 'react';
import {
  Button, Container, Grid, Header, Icon, Menu,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';

import styles from './styles/HomeStyle';
import homeMenu from './MenuTabs';

const HomeView = ({
  user,
  displayWelcomeMessage,
  handleLogOut,
  handleItemClick,
}) => (
  <Container
    style={styles.home}
  >
    <Grid columns="equal">
      <Grid.Column />
      <Grid.Column width={8}>
        <Header as="h2" icon textAlign="center">
          <Icon name="user" circular />
          <Header.Content>{displayWelcomeMessage()}</Header.Content>
        </Header>
      </Grid.Column>
      <Grid.Column>
        <Button
          primary
          style={styles.logout}
          onClick={handleLogOut}
        >
            Log Out
        </Button>
      </Grid.Column>
    </Grid>
    <Grid>
      <Grid.Column width={4}>
        <Menu fluid vertical tabular>
          <Menu.Item name="personal" active={user.activeItem === 'personal'} onClick={handleItemClick} />
          <Menu.Item name="register" active={user.activeItem === 'register'} onClick={handleItemClick} />
          <Menu.Item
            name="view"
            active={user.activeItem === 'view'}
            onClick={handleItemClick}
          />
          <Menu.Item
            name="settings"
            active={user.activeItem === 'settings'}
            onClick={handleItemClick}
          />
        </Menu>
      </Grid.Column>

      <Grid.Column stretched width={12}>
        {homeMenu(user)}
      </Grid.Column>
    </Grid>
  </Container>
);

HomeView.propTypes = {
  displayWelcomeMessage: PropTypes.func.isRequired,
  handleLogOut: PropTypes.func.isRequired,
  handleItemClick: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default HomeView;
