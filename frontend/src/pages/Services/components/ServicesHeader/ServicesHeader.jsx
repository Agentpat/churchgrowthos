import {
  FaPlus,
} from "react-icons/fa";

import Button from "../../../../components/ui/Button/Button";

import {
  Header,
  Left,
  Title,
  Description,
  Right,
} from "./ServicesHeader.styles";

const ServicesHeader = ({
  onCreate,
}) => {

  const handleCreateClick = () => {

    console.log(
      "CREATE SERVICE BUTTON CLICKED",
    );

    onCreate?.();

  };

  return (

    <Header>

      <Left>

        <Title>
          Services
        </Title>

        <Description>
          Manage your church services and schedules.
        </Description>

      </Left>

      <Right>

        <Button
          type="button"
          onClick={handleCreateClick}
        >

          <FaPlus />

          Create Service

        </Button>

      </Right>

    </Header>

  );

};

export default ServicesHeader;