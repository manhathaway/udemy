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
      linkTitle="Don't have an account?"
      inputs={inputs}
      onPageChange={() => handlePageChange('signup')}
      onSubmit={() => handleSubmit(2, undefined)}
      onReset={handleReset}
    >
      <div style={{display: 'flex', gap: '10px', marginTop: '15px'}}>
        <Input
          type='email'
          label='Email'
          resetInput={inputs.isReset}
          onValidation={handleValidation}
          condition={inputs.isValidated.Email ?? undefined}
        />

        <Input
          type='password'
          label='Password'
          resetInput={inputs.isReset}
          onValidation={handleValidation}
          condition={inputs.isValidated.Password ?? undefined}
        />
      </div>
    </Form>
  );
}