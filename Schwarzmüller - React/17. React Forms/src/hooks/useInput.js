import { useState, useEffect, useRef } from "react";

const useInput = ({ formattedLabel, resetInput, onValidation }) => {
    const [input, setInput] = useState({
        name: formattedLabel,
        value: '',
        isBlurred: false
    });
    const isValidated = useRef();

    useEffect(() => {
        if (resetInput) {
            setInput({
                name: formattedLabel,
                value: '',
                isBlurred: false
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
        setInput(previous => ({
            ...previous,
            isBlurred: true
        }));
        
        switch (input.name) {
            case 'Email':
                checkInput(input.value.includes('@') && input.value.includes('.'));
                break;
            case 'Password':
                checkInput(input.value.length !== 0);
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