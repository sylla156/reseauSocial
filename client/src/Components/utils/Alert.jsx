import React from 'react'

const Alert = ({message, onHanbleClik}) => {

   
  return <div>
      <p>{message}</p>
      <button onClick={onHanbleClik}>compris</button>
  </div>
}

export default Alert