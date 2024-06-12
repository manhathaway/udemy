import { useState, useEffect, useRef } from "react";

const useInput = ({ formattedLabel, resetInput, onValidation }) => {
    const [input, setInput] = useState({
        name: formattedLabel,
        value: ''
    });
    const isValidated = useRef();

    useEffect(() => {
        if (resetInput) {
            setInput({
                name: formattedLabel,
                value: ''
            });
        };
    }, [resetInput]);

    const checkInput = (condition) => {
        if (condition) {
            isValidated.current = true;
        } else {
            isValidated.current = false;
        };
    };

    const handleChange = ({ target }) => {
        setInput((previous) => ({
            ...previous,
            value: target.value
        }));
    };
    
    const handleBlur = () => {
        switch (input.name) {
            case 'Email':
                checkInput(input.value.includes('@') && input.value.includes('.'));
                break;
            case 'Password':
            case 'ConfirmPassword':
            case 'Reference':
                checkInput(input.value.length !== 0);
                break;
            case 'FirstName':
            case 'LastName':
                checkInput(input.value.length !== 0 && input.value.match(/^[A-Za-z]*$/));
                break;
        };

        onValidation(
            input.name,
            isValidated.current,
            input.value,
        );
    };

    return {
        input,
        handleChange,
        handleBlur
    };
};

export { useInput };