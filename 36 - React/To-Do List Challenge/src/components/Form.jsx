import React, { useState } from 'react';

const Form = (props) => {
    const [input, setInput] = useState("");

    const handleClick = () => {
        if (input.length != 0) {
            props.submit(input);
            setInput("");
        } else {
            setInput("Type here.");
            setTimeout(() => setInput(""), 2000);
        };
    };

    return (
        <div className="form">
            <input value={input} onChange={(event) => setInput(event.target.value)} type="text" />
            <button onClick={handleClick}><span>Add</span></button>
      </div>
    );
};

export default Form;