import { useState } from 'react';

import { ControlsDiv, ActionsDiv } from './styled/Divs';
import LabelAndInput from './styled/LabelAndInput';
import { CreateAccountButton, SignInButton } from './styled/Buttons';

export default function AuthInputs() {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleInputChange(identifier, value) {
    if (identifier === 'email') {
      setEnteredEmail(value);
    } else {
      setEnteredPassword(value);
    }
  }

  function handleLogin() {
    setSubmitted(true);
  }

  const emailNotValid = submitted && !enteredEmail.includes('@');
  const passwordNotValid = submitted && enteredPassword.trim().length < 6;

  return (
    <div id="auth-inputs">
      <ControlsDiv>
        <LabelAndInput invalid={emailNotValid} type='email' handleChange={handleInputChange}>Email</LabelAndInput>
        <LabelAndInput invalid={passwordNotValid} type='password' handleChange={handleInputChange}>Password</LabelAndInput>
      </ControlsDiv>
      <ActionsDiv>
        <CreateAccountButton type="button">Create a new account</CreateAccountButton>
        <SignInButton onClick={handleLogin}>Sign In</SignInButton>
      </ActionsDiv>
    </div>
  );
}
