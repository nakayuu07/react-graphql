import React, { Component } from 'react';

const Form = ({query, onchange}) => {
  return(
    <form>
      <input 
        value={query} 
        onChange={e => onchange(e)}
      />
    </form>
  )
}

export default Form