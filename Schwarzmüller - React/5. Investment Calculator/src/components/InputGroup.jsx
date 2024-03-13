import { useState } from 'react';

const InputGroup = ({name, children, initialValue, inputFunction}) => {
    const [inputValue, setInputValue] = useState(initialValue);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputValue(() => value);
        inputFunction(name, value);
    };
    
    return (
        <div>
            <label htmlFor={name}>{children}</label>
            <input type="number" id={name} name={name} value={inputValue} onChange={handleChange}></input>
        </div>
    );
};

export default InputGroup;