import React from 'react';
import client from './client'
import { ApolloProvider } from 'react-apollo'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

const ME = gql`
  query me {
    user(login: "nakayuu07"){
      avatarUrl
    }
  }
`

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
