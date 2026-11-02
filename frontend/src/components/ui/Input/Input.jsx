import {
  InputWrapper,
  Label,
  StyledInput,
  ErrorMessage,
} from "./Input.styles";


const Input = ({
  label,
  error,
  type = "text",
  placeholder,
  value,
  onChange,
  name,
  disabled = false,
  required = false,

  // Used for compact controls such as filters/toolbars
  compact = false,
}) => {

  return (
    <InputWrapper $compact={compact}>

      {label && (
        <Label>
          {label}
        </Label>
      )}

      <StyledInput
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        $hasError={Boolean(error)}
        $compact={compact}
      />

      {error && (
        <ErrorMessage>
          {error}
        </ErrorMessage>
      )}

    </InputWrapper>
  );
};


export default Input;