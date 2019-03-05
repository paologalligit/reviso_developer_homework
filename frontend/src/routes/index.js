import React from 'react';
import {
  BrowserRouter, Route, Switch, Redirect,
} from 'react-router-dom';

import Home from './Home';
import Login from './Login';
import Register from './Register';
import isAuthenticated from '../utils/auth';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (isAuthenticated() ? (
      <Component {...props} />
    ) : (
      <Redirect
        to={{
          pathname: '/login',
        }}
      />
    ))}
  />
);

/*
<PrivateRoute path="/view-team/:teamId?/:channelId?" exact component={ViewTeam} />
<PrivateRoute path="/create-team" exact component={CreateTeam} />
*/

export default () => (
  <BrowserRouter>
    <Switch>
      <PrivateRoute path="/" exact component={Home} />
      <Route path="/login" exact component={Login} />
      <Route path="/register" exact component={Register} />
    </Switch>
  </BrowserRouter>
);
