import {
  FaPlus,
  FaMoneyBillWave,
} from "react-icons/fa";

import Button from "../../../components/ui/Button/Button";

import {
  Header,
  Left,
  Right,
  Title,
  Description,
} from "./FinanceHeader.styles";

const FinanceHeader = ({
  onRecordOffering,
  onRecordExpense,
}) => {
  return (
    <Header>
      <Left>
        <Title>
          Finance
        </Title>

        <Description>
          Track church income, expenses,
          giving, and financial activity
          in one place.
        </Description>
      </Left>

      <Right>
        <Button
          variant="secondary"
          onClick={
            onRecordExpense
          }
        >
          <FaPlus />

          Record Expense
        </Button>

        <Button
          onClick={
            onRecordOffering
          }
        >
          <FaMoneyBillWave />

          Record Offering
        </Button>
      </Right>
    </Header>
  );
};

export default FinanceHeader;