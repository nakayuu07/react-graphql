import React, { Component } from 'react';
import client from './client'
import { ApolloProvider } from 'react-apollo'
import { Query } from 'react-apollo'
import { SEARCH_REPOSITORIES } from './graphql'
import Form from './atoms/Form'
import RepositoryItems from './organisms/RepositoryItems'


const PER_PAGE = 5
const initialState = {
  first: PER_PAGE,
  after: null,
  last: null,
  before: null,
  query: ""
}

class App extends Component {
  constructor(props){
    super(props)
    this.state = initialState
  }

  handleChange = e => this.setState({ query: e.target.value })
  
  goNext = search => this.setState({ 
    first: PER_PAGE,
    after: search.pageInfo.endCursor,
    last: null,
    before: null 
  })

  goPrevious = search => this.setState({ 
    first: null,
    after: null,
    last: PER_PAGE,
    before: search.pageInfo.startCursor
   })

  render(){
    const { first, after, last, before, query } = this.state
    return (
      <ApolloProvider client={client}>
        <Form 
          query={query}
          onchange={this.handleChange}
        />
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
                  <RepositoryItems
                    data={data} 
                  />
                  { 
                    data.search.pageInfo.hasPreviousPage ?
                    (
                      <button onClick={() => this.goPrevious(data.search)}>
                        previous
                      </button>
                    ) : null
                  }
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
