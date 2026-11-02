import {
  SelectWrapper,
  Label,
  SelectField,
  StyledSelect,
  Chevron,
} from "./Select.styles.js";

import { FaChevronDown } from "react-icons/fa";


const Select = ({
  label,
  children,
  compact = false,
  ...props
}) => {

  return (

    <SelectWrapper $compact={compact}>

      {label && (
        <Label>
          {label}
        </Label>
      )}

      <SelectField $compact={compact}>

        <StyledSelect
          {...props}
          $compact={compact}
        >
          {children}
        </StyledSelect>

        <Chevron
          $compact={compact}
          aria-hidden="true"
        >
          <FaChevronDown />
        </Chevron>

      </SelectField>

    </SelectWrapper>
  );
};


export default Select;