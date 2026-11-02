import {
  StyledButton,
} from "./Button.styles";


const Button = ({
  children,
  variant = "primary",
  size = "medium",
  type = "button",
  disabled = false,
  onClick,
}) => {

  return (

    <StyledButton
      type={type}
      $variant={variant}
      $size={size}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </StyledButton>

  );
};


export default Button;