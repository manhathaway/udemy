import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';

const Form = ({ title, linkTitle, inputs, onPageChange, onSubmit, onReset, children }) => {
    return (
        <form noValidate>
            <div style={{display: 'flex', gap: '10px', alignItems: 'end'}}>
            <h2 style={{margin: '0'}}>{title}</h2>
            <button type='button' onClick={onPageChange} style={{background: 'none', border: 'none', marginBottom: '1px', color: '#9CBABA', cursor: 'pointer'}}>{linkTitle}</button>
            </div>

            {children}

            <div style={{display: 'flex', justifyContent: inputs.formIsValidated !== 'initial' ? 'space-between' : 'flex-end', alignItems: 'center', marginTop: '25px'}}>
            {inputs.formIsValidated !== 'initial' && (
                <div style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
                {!inputs.formIsValidated && <ReportProblemOutlinedIcon fontSize='large' color='error'/>}
                {inputs.formIsValidated && <CheckCircleOutlineOutlinedIcon fontSize='large' color='success'/>}
                <p style={{margin: '0'}}>{inputs.formIsValidated ? 'Logging in...' : 'Please check all inputs and try again.'}</p>
                </div>
            )}
            <div style={{display: 'flex', gap: '5px', height: '35px'}}>
                <button type='button' onClick={onReset} style={{width: '75px', background: 'none', border: 'none', color: '#9CBABA', cursor: 'pointer'}}>Reset</button>
                <button type='button' onClick={onSubmit} className='register-button'>{title}</button>
            </div>
            </div>
        </form>
    );
};

export default Form;