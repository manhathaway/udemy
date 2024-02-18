import React, { useState } from 'react';

const Item = (props) => {
  const [status, setStatus] = useState(false);

  return (
    <div style={{
      display: 'flex',
      justifyContent:'space-between',
      alignItems: 'center'
    }}>
      <li
        key={props.key}
        onClick={() => setStatus(!status)}
        style={{textDecorationLine: status ? 'line-through' : 'none'}}
      >
        {props.value}
      </li>
      <button style={{
        width: '30px',
        height: '30px'
      }} onClick={() => props.remove(props.id)}>x</button>
    </div>

  );
};

export default Item;