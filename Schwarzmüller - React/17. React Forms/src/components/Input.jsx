import { useInput } from "../hooks/useInput";
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';

const Input = ({ label, select, selectTitle, children, resetInput, onValidation, condition, ...props }) => {
  const formattedLabel = label.replace(/\s/g, '');
  const {
      input,
      handleChange,
      handleBlur,
  } = useInput({ formattedLabel, resetInput, onValidation });
  
  let symbol
  if (condition === undefined) {
    symbol = <HelpOutlineOutlinedIcon color='warning'/>;
  } else {
    if (condition) {
      symbol = <CheckCircleOutlinedIcon color='success'/>;
    } else {
      symbol = <ErrorOutlineOutlinedIcon color='error'/>;
    };
  };
  
  return (
    <div style={{ width: '100%' }}>
      <label htmlFor={label.replace(/\s+/g, '-').toLowerCase()}>{select ? selectTitle : label}</label>
      <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
        {!select ? (
          <input
            value={input.value}
            id={label.replace(/\s+/g, '-').toLowerCase()}
            name={label.replace(/\s+/g, '-').toLowerCase()}
            onChange={handleChange}
            onBlur={handleBlur}
            {...props}
          />
        ) : (
          <select
            id={label.replace(/\s+/g, '-').toLowerCase()}
            name={label.replace(/\s+/g, '-').toLowerCase()}
            onChange={handleChange}
            onBlur={handleBlur}
            {...props}
          >{children}</select>
        )}
        {symbol}
      </div>
    </div>
  );
};

export default Input;