import React, { Component } from 'react';
import client from './client'
import { ApolloProvider } from 'react-apollo'
import { Query } from 'react-apollo'
import { SEARCH_REPOSITORIES } from './graphql'

const VARIABLES = {
  first: 5,
  after: null,
  last: null,
  before: null,
  query: "フロントエンドエンジニア"
}

class App extends Component {
  constructor(props){
    super(props)
    this.state = VARIABLES
  }

  render(){
    const { first, after, last, before, query } = this.state
    return (
      <ApolloProvider client={client}>
        <Query 
          query={SEARCH_REPOSITORIES}
          variables={{ first, after, last, before, query }}
        >
          {
            ({loading, error, data}) => {
              if (loading) return '...loading'
              if (error) return `Error ${error.message}`
              
              console.log(data)
              return<div></div>
            }
          }
        </Query>
      </ApolloProvider>
    );
  }
}

export default App;
