import React, { Component } from 'react';
import client from './client'
import { ApolloProvider } from 'react-apollo'
import { Query } from 'react-apollo'
import { SEARCH_REPOSITORIES } from './graphql'
import { nodeInternals } from 'stack-utils';

const DEFAULT_STATE = {
  first: 5,
  after: null,
  last: null,
  before: null,
  query: "フロントエンドエンジニア"
}

class App extends Component {
  constructor(props){
    super(props)
    this.state = DEFAULT_STATE
  }

  handleChange = e => {
    this.setState({ 
      query: e.target.value 
    })
  }

  render(){
    const { first, after, last, before, query } = this.state
    return (
      <ApolloProvider client={client}>
        <form>
          <input value={query} onChange={this.handleChange}/>
        </form>
        <Query 
          query={SEARCH_REPOSITORIES}
          variables={{ first, after, last, before, query }}
        >
          {
            ({loading, error, data}) => {
              if (loading) return '...loading'
              if (error) return `Error ${error.message}`
              return(
                <>
                  <h2>find {data.search.repositoryCount} - Repositories</h2>
                  <ul>
                    {data.search.edges.map((edge => {
                      return(
                        <li key={edge.node.id}>
                          <a href={edge.node.url} target='blank'> {edge.node.name} </a>
                        </li>
                      )
                    }))}
                  </ul>
                </>
              )
            }
          }
        </Query>
      </ApolloProvider>
    );
  }
}

export default App;
