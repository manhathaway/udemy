import React, { useState } from "react";
import Item from './Item';
import Form from './Form';

function App() {
  const [list, setList] = useState([]);
  let addedItem;

  const addItem = (input) => {
    if (input.length != 0) {
      addedItem = input;
      setList([...list, addedItem]);
    };
  };
  
  const deleteItem = (id) => {
    setList((previousList) => previousList.filter((item, index) => index + 1 != id));
  };

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <Form submit={addItem}/>
      <div>
        <ul>
          {list.map((item, index) => <Item key={index + 1} id={index + 1} value={item} remove={deleteItem}/>)}
        </ul>
      </div>
    </div>
  );
}

export default App;
