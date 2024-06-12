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
  const hasMatchingPasswords = inputs.formData.Password === inputs.formData.ConfirmPassword;

  return (
    <>
      <Form
        title='Register'
        linkTitle='Already have an account?'
        inputs={inputs}
        onPageChange={() => handlePageChange('login')}
        onSubmit={() => handleSubmit(6, hasMatchingPasswords)}
        onReset={handleReset}
      >
        <p style={{margin: '15px 0'}}>We'll just need a little bit of data from you to get you started! 🚀</p>

        <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
          <Input
            select
            selectTitle='How did you hear about us?'
            label='Reference'
            resetInput={inputs.isReset}
            onValidation={handleValidation}
            condition={inputs.isValidated.Reference ?? undefined}
          >
            <option value=''>...</option>
            <option value='Internet Search'>Internet Search</option>
            <option value='Social Media'>Social Media</option>
            <option value='Family/Friend'>Family/Friend</option>
            <option value='Other'>Other</option>
          </Input>
          
          <Input
            type='email'
            label='Email'
            resetInput={inputs.isReset}
            onValidation={handleValidation}
            condition={inputs.isValidated.Email ?? undefined}
          />

          <div style={{display: 'flex', gap: '10px'}}>
            <Input
              type='name'
              label='First Name'
              resetInput={inputs.isReset}
              onValidation={handleValidation}
              condition={inputs.isValidated.FirstName ?? undefined}
            />
            <Input
              type='name'
              label='Last Name'
              resetInput={inputs.isReset}
              onValidation={handleValidation}
              condition={inputs.isValidated.LastName ?? undefined}
            />
          </div>

          <div style={{display: 'flex', gap: '10px'}}>
            <Input
              type='password'
              label='Password'
              resetInput={inputs.isReset}
              onValidation={handleValidation}
              condition={inputs.isValidated.Password ?? undefined}
            />
            <Input
              type='password'
              label='Confirm Password'
              resetInput={inputs.isReset}
              onValidation={handleValidation}
              condition={(inputs.isValidated.ConfirmPassword && hasMatchingPasswords) ?? undefined}
            />
          </div>
        </div>
      </Form>
    </>
  );
};

export default Register;
