import React, { Component } from 'react';
import client from './client'
import { ApolloProvider } from 'react-apollo'
import { Query } from 'react-apollo'
import { SEARCH_REPOSITORIES } from './graphql'

const PER_PAGE = 5
const initialState = {
  first: PER_PAGE,
  after: null,
  last: null,
  before: null,
  query: "フロントエンドエンジニア"
}

class App extends Component {
  constructor(props){
    super(props)
    this.state = initialState
  }

  handleChange = e => this.setState({ query: e.target.value })
  
  goNext = search => this.setState({ after: search.pageInfo.endCursor })

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
                          <a href={edge.node.url} target='blank' rel=''> {edge.node.name} </a>
                        </li>
                      )
                    }))}
                  </ul>
                  {
                    data.search.pageInfo.hasNextPage ?
                    (
                     <button onClick={() => this.goNext(data.search)}>
                        next
                     </button>
                    ) : null
                  }
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
