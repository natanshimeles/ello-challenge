import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, ApolloProvider, gql, InMemoryCache } from '@apollo/client';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const client = new ApolloClient({
  uri: 'https://fullstack-engineer-test-n4ouilzfna-uc.a.run.app/graphql',
  cache: new InMemoryCache()
});




root.render(
  <React.StrictMode>
   <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
  </React.StrictMode>
);

reportWebVitals();
