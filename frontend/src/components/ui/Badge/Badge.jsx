import { StyledBadge } from "./Badge.styles";


const Badge = ({
  children,
  variant = "default",
  size = "md",
}) => {

  return (
    <StyledBadge
      $variant={variant}
      $size={size}
    >
      {children}
    </StyledBadge>
  );
};


export default Badge;