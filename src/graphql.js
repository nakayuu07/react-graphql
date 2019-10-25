import gql from 'graphql-tag'

export const ME = gql`
  query me {
    user(login: "nakayuu07"){
      avatarUrl
    }
  }
`

export const SEARCH_REPOSITORIES = gql`
  query searchRepositories($first: Int, $last: Int, $after: String, $before: String ,$query: String!){
    search(first: $first, last: $last, after: $after, before: $before , query: $query, type: REPOSITORY){
      repositoryCount
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
      edges{
        cursor
        node{
          ...on Repository {
            id
            url
            stargazers {
              totalCount
            }
            viewerHasStarred
          }
        }
      }
    }
  }
`