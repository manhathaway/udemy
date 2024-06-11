import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';

const Form = ({ title, inputs, onPageChange, onSubmit, onReset, children }) => {
    return (
        <form noValidate>
            <div style={{display: 'flex', gap: '10px', alignItems: 'end'}}>
            <h2>{title}</h2>
            <button type='button' onClick={onPageChange} style={{background: 'none', border: 'none', padding: '0', margin: '22px 0', color: '#869999', cursor: 'pointer'}}>Don't have an account?</button>
            </div>

            {children}

            <div style={{display: 'flex', justifyContent: inputs.formIsValidated !== 'initial' ? 'space-between' : 'flex-end', alignItems: 'center', marginTop: '15px'}}>
            {inputs.formIsValidated !== 'initial' && (
                <div style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
                {!inputs.formIsValidated && <ReportProblemOutlinedIcon fontSize='large' color='error'/>}
                {inputs.formIsValidated && <CheckCircleOutlineOutlinedIcon fontSize='large' color='success'/>}
                <p style={{margin: '0'}}>{inputs.formIsValidated ? 'Logging in...' : 'Please check all inputs and try again.'}</p>
                </div>
            )}
            <div style={{height: '35px'}}>
                <button type='button' onClick={onReset} className="button button-flat">Reset</button>
                <button type='button' onClick={onSubmit} className="button">{title}</button>
            </div>
            </div>
        </form>
    );
};

export default Form;