import { useState } from 'react';

const useInputs = ({ onPageChange }) => {
    const [inputs, setInputs] = useState({
        isReset: false,
        isValidated: {},
        formIsValidated: 'initial',
        formData: {}
    });

    const handlePageChange = (page) => {
        onPageChange(page);
    };
    
    const handleReset = () => {
        setInputs({
            isReset: true,
            isValidated: {},
            formIsValidated: 'initial',
            formData: {}
        });
        setTimeout(() => {
            setInputs(previous => ({ ...previous, isReset: false }));
        }, 0);
    };

    const handleValidation = (name, validation, value) => {
        setInputs(previous => ({
            ...previous,
            isValidated: {
                ...previous.isValidated,
                [name]: validation
            },
            formData: {
                ...previous.formData,
                [name]: value
            }
        }));

        console.log(inputs);
    };

    const handleSubmit = (length) => {
        if (
            Object.entries(inputs.isValidated).length == length
            && !Object.values(inputs.isValidated).includes(false)
            && !Object.values(inputs.isValidated).includes(undefined)
        ) {
            setInputs(previous => ({ ...previous, formIsValidated: true }));
            console.log(inputs);
        } else {
            setInputs(previous => ({ ...previous, formIsValidated: false }));
        };
    };

    return {
        inputs,
        handlePageChange,
        handleReset,
        handleValidation,
        handleSubmit
    };
};

export { useInputs };