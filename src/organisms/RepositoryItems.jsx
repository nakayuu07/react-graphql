
import React from 'react';

const RepositoryItems = ({data}) => { 
  const { search: { repositoryCount, edges } } = data
  return(
    <>
      <h2>find {repositoryCount} - Repositories</h2>
      <ul>
        {
          edges.map((edge => {
          return(
            <li key={edge.node.id}>
              <a href={edge.node.url} target='blank' rel=''> {edge.node.name} </a>
              &nbsp;
              <span role="img" aria-label="star">🌟{edge.node.stargazers.totalCount}</span>
            </li>
          )
        }))}
      </ul>
    </>
  )
}

export default RepositoryItems
