import {
  Card,
  CardTitle,
  InfoList,
  Row,
  Label,
  Value,
} from "./VisitorInformationCard.styles";

const VisitorInformationCard = ({ visitor }) => {

  return (

    <Card>

      <CardTitle>

        Visitor Information

      </CardTitle>

      <InfoList>

        <Row>
          <Label>Name</Label>

          <Value>
            {visitor.firstName} {visitor.lastName}
          </Value>
        </Row>

        <Row>
          <Label>Phone</Label>

          <Value>
            {visitor.phone || "-"}
          </Value>
        </Row>

        <Row>
          <Label>Email</Label>

          <Value>
            {visitor.email || "-"}
          </Value>
        </Row>

        <Row>
          <Label>Address</Label>

          <Value>
            {visitor.address || "-"}
          </Value>
        </Row>

      </InfoList>

    </Card>

  );

};

export default VisitorInformationCard;