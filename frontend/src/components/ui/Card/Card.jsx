import {
  StyledCard,
} from "./Card.styles";



const Card = ({
  children,
  padding = "medium",
  hover = false,
  className,
}) => {


  return (

    <StyledCard

      padding={padding}

      hover={hover}

      className={className}

    >

      {children}

    </StyledCard>

  );

};


export default Card;