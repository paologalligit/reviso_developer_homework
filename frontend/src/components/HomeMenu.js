import React from 'react';
import { Header, Segment } from 'semantic-ui-react';

import styles from './styles/HomeMenuStyle';

const getPersonal = user => (
  <div>
    <Header
      as="h2"
      attached="top"
      style={styles.personal}
    >
      Personal Infos
    </Header>
    <Segment attached>
      <div style={styles.personalList}>
        <li>{`Name: ${user.name}`}</li>
        <li>{`Surname: ${user.surname}`}</li>
        <li>{`Username: ${user.username}`}</li>
        <li>{`Email: ${user.email}`}</li>
        <li>{`Country: ${user.country}`}</li>
        <li>{`City: ${user.city}`}</li>
        <li>{`Address: ${user.address}`}</li>
      </div>
    </Segment>
  </div>
);

const getRegister = user => <div>I am Register</div>;

const getView = user => <div>I am get view</div>;

const getSettings = user => (
  <div>I am settings</div>
);

const HomeMenu = (user) => {
  console.log('da user: ', user);

  const dispatchTable = {
    personal: getPersonal,
    register: getRegister,
    view: getView,
    settings: getSettings,
  };

  return dispatchTable[user.activeItem](user);
};

export default HomeMenu;
