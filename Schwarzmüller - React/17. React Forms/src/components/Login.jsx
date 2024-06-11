import { useInputs } from '../hooks/useInputs';
import Input from './Input';
import Form from './Form';

export default function Login({ onPageChange }) {
  const {
    inputs,
    handlePageChange,
    handleReset,
    handleValidation,
    handleSubmit
  } = useInputs({ onPageChange });

  return (
    <Form
      title='Login'
      inputs={inputs}
      onPageChange={() => handlePageChange('signup')}
      onSubmit={() => handleSubmit(2)}
      onReset={handleReset}
    >
      <div className="control-row">
        <Input
          type='email'
          label='Email'
          resetInput={inputs.isReset}
          onValidation={handleValidation}
          response={inputs.isValidated.Email ?? undefined}
        />

        <Input
          type='password'
          label='Password'
          resetInput={inputs.isReset}
          onValidation={handleValidation}
          response={inputs.isValidated.Password ?? undefined}
        />
      </div>
    </Form>
  );
}