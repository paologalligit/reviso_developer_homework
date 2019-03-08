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

export default getPersonal;