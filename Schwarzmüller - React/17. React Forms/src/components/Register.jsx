import Form from "./Form";
import Input from "./Input";
import { useInputs } from "../hooks/useInputs";

const Register = ({ onPageChange }) => {
  const {
    inputs,
    handlePageChange,
    handleReset,
    handleValidation,
    handleSubmit
  } = useInputs({ onPageChange });
  
  const confirmPasswordIsValidated =
    inputs.formData.ConfirmPassword
    && (inputs.formData.Password === inputs.formData.ConfirmPassword);

  return (
    <>
      <Form
        title='Register'
        inputs={inputs}
        onPageChange={() => handlePageChange('login')}
        onSubmit={() => handleSubmit(6)}
        onReset={handleReset}
      >
        <p>We'll just need a little bit of data from you to get you started! 🚀</p>

        <div className="control">
          <Input
            type='email'
            label='Email'
            resetInput={inputs.isReset}
            onValidation={handleValidation}
            response={inputs.isValidated.Email ?? undefined}
          />
        </div>

        <div className='control-row'>
          <Input
            type='password'
            label='Password'
            resetInput={inputs.isReset}
            onValidation={handleValidation}
            response={inputs.isValidated.Password ?? undefined}
          />
          <Input
            type='password'
            label='Confirm Password'
            resetInput={inputs.isReset}
            onValidation={handleValidation}
            response={confirmPasswordIsValidated ?? undefined}
          />
        </div>
      </Form>
    </>
  );
};

export default Register;
