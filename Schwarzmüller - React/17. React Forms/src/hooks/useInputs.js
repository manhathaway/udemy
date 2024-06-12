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
    };

    const handleSubmit = (length, extraCondition) => {
        let condition =
            Object.entries(inputs.isValidated).length == length
            && !Object.values(inputs.isValidated).includes(false)
            && !Object.values(inputs.isValidated).includes(undefined);
        
        if (typeof extraCondition === 'boolean') {
            condition = condition && extraCondition;
        };
        
        if (condition) {
            setInputs(previous => ({ ...previous, formIsValidated: true }));
            console.log(inputs.formData);
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