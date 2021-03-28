import React from 'react';
import ReactDOM from 'react-dom';

import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache, split } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

import App from './app/app';

export const createApolloClient = () => {
  const uris = {
    local: 'http://localhost:3333/graphql',
  };

  const uri = uris['local'];

  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('longlost:token');
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  const httpLink = authLink.concat(createHttpLink({ uri }));

  const wsLink = new WebSocketLink({
    uri: 'ws://localhost:3333/graphql',
    options: {
      reconnect: true,
    },
  });

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
    },
    wsLink,
    httpLink
  );

  const client = new ApolloClient({
    uri: 'http://localhost:3333/graphql',
    link: splitLink,
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            game(_, { args, toReference }) {
              return toReference({
                __typename: 'Game',
                _id: args?._id,
              });
            },
            updateGame(_, { args, toReference }) {
              return toReference({
                __typename: 'Game',
                _id: args?._id,
              });
            },
          },
        },
      },
    }),
  });

  console.log('[client]', client);

  return client;
};

const apolloClient = createApolloClient();

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
