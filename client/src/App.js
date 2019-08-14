import React from 'react';
import BookList from './components/BookList';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import AddBook from './components/AddBook';

//setup apollo client
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
});

function App() {
  return (
    <div id="main">
      <ApolloProvider client={client}>
        <h1>Reading List</h1>
        <BookList/>
        <AddBook/>
      </ApolloProvider>
    </div>
  );
}

export default App;
