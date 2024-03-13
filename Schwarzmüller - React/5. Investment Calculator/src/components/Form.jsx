import { useState } from 'react';
import InputGroup from "./InputGroup";

const Form = ({ formFunction }) => {
    const [inputValues, setInputValues] = useState({
        initialInvestment: 10000,
        annualInvestment: 1200,
        expectedReturn: 6,
        duration: 10
    });

    const inputFunction = (name, value) => {
        setInputValues(previous => {
            return {
                ...previous,
                [name]: +value
            };
        });
    };

    const submitFunction = (event) => {
        event.preventDefault();
        formFunction(inputValues);
    };

    return (
        <form id="user-input">
            <div id="input-groups">
                <InputGroup name="initialInvestment" inputFunction={inputFunction} initialValue="10000">Initial Investment</InputGroup>
                <InputGroup name="annualInvestment" inputFunction={inputFunction} initialValue="1200">Annual Investment</InputGroup>
                <InputGroup name="expectedReturn" inputFunction={inputFunction} initialValue="6">Expected Return</InputGroup>
                <InputGroup name="duration" inputFunction={inputFunction} initialValue="10">Duration</InputGroup>
            </div>
            <input id="submit" type="submit" onClick={submitFunction} value="Submit"></input>
        </form>
    );
};

export default Form;