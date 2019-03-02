import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { ApolloProvider } from 'react-apollo';
import { ApolloLink, from } from 'apollo-link';

import 'semantic-ui-css/semantic.min.css';
import Routes from './routes';
import * as serviceWorker from './serviceWorker';

const httpLink = createHttpLink({ uri: 'http://localhost:3000' });

const middlewareLink = setContext(() => ({
  headers: {
    token: localStorage.getItem('token') || null,
    refreshToken: localStorage.getItem('refreshToken') || null,
  },
}));

const afterwareLink = new ApolloLink((operation, forward) => forward(operation).map((response) => {
  const context = operation.getContext();
  const { response: { headers } } = context;

  if (headers) {
    const token = headers.get('token');
    const refreshToken = headers.get('refreshToken');

    if (token) {
      localStorage.setItem('token', token);
    }
    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken);
    }
  }
  return response;
}));


// const middleLink = middlewareLink.concat(httpLink);
// const afterLink = afterwareLink.concat(httpLink);

const client = new ApolloClient({
  link: from([
    middlewareLink,
    afterwareLink,
    httpLink,
  ]),
  cache: new InMemoryCache(),
});

const App = (
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>
);

ReactDOM.render(App, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
