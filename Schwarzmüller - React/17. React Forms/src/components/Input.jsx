import { useInput } from "../hooks/useInput";
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';

const Input = ({ label, resetInput, onValidation, response, ...props }) => {
  const formattedLabel = label.replace(/\s/g, '');
  const {
      input,
      handleChange,
      handleBlur,
  } = useInput({ formattedLabel, resetInput, onValidation });
  
  let symbol
  if (response === undefined) {
    symbol = <HelpOutlineOutlinedIcon color='warning'/>;
  } else {
    if (response) {
      symbol = <CheckCircleOutlinedIcon color='success'/>;
    } else {
      symbol = <ErrorOutlineOutlinedIcon color='error'/>;
    };
  };

  return (
    <div className="control no-margin">
      <label htmlFor={label.replace(/\s+/g, '-').toLowerCase()}>{label}</label>
      <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
        <input
          value={input.value}
          id={label.replace(/\s+/g, '-').toLowerCase()}
          name={label.replace(/\s+/g, '-').toLowerCase()}
          onChange={handleChange}
          onBlur={handleBlur}
          {...props}
        />
        {symbol}
      </div>
    </div>
  );
};

export default Input;