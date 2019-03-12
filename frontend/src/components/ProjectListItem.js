import React from 'react';
import { Button, Grid, List } from 'semantic-ui-react';

import fromMillisToDate from '../utils/convertingTools'

export default ({
  budget,
  name,
  vat,
  penalty,
  date,
  startHour,
  endHour,
}) => (
  <List.Content>
    <List.Header>{`PROJECT: ${name}`}</List.Header>
    <Grid columns={3} divided>
      <Grid.Row>
        <Grid.Column>
          {`Budget: ${budget} €`}
        </Grid.Column>
        <Grid.Column>
          {`Vat: ${vat} €`}
        </Grid.Column>
        <Grid.Column>
          {`Penalty: ${penalty} €`}
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column>
          {`Date: ${fromMillisToDate(date)}`}
        </Grid.Column>
        <Grid.Column>
          {`Start hour: ${startHour}`}
        </Grid.Column>
        <Grid.Column>
          {`End hour: ${endHour}`}
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Button primary>
          Send Invoice
        </Button>
      </Grid.Row>
    </Grid>
  </List.Content>
);
