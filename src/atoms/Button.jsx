import React from 'react';

const button = ({text, onClick, data}) => {
  return(
    <button onClick={() => onClick(data.search)} >
      { text }
    </button>
  )
}

export default button