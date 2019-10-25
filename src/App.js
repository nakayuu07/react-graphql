import React from 'react';
import client from './client'
import { ApolloProvider } from 'react-apollo'
import { Query } from 'react-apollo'
import { ME } from './graphql'

function App() {
  return (
    <ApolloProvider client={client}>
      <p>Hello React GraphQl</p>
      <Query query={ME}>
        {
          ({loading, error, data}) => {
            if (loading) return '...loading'
            if (error) return `Error ${error.message}`
            
            return <img src = {data.user.avatarUrl}></img>
          }
        }
      </Query>
    </ApolloProvider>
  );
}

export default App;
