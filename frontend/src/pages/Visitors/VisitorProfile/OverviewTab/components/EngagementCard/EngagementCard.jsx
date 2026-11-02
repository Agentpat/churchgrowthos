import {
  Badge,
  Card,
  CardTitle,
  InfoList,
  Label,
  Row,
  Value,
} from "./EngagementCard.styles";

const getStatusColor = (status) => {

  switch (status) {

    case "CONNECTED":
      return "#16a34a";

    case "CONVERTED":
      return "#2563eb";

    case "FOLLOWING_UP":
      return "#f59e0b";

    case "CONTACTED":
      return "#8b5cf6";

    case "INACTIVE":
      return "#dc2626";

    default:
      return "#6b7280";
  }

};

const EngagementCard = ({ visitor }) => {

  return (

    <Card>

      <CardTitle>

        Engagement

      </CardTitle>

      <InfoList>

        <Row>

          <Label>

            Status

          </Label>

          <Badge color={getStatusColor(visitor.status)}>

            {visitor.status?.replaceAll("_", " ")}

          </Badge>

        </Row>

        <Row>

          <Label>

            Follow-up Stage

          </Label>

          <Value>

            {visitor.followUpStage?.replaceAll("_", " ") || "-"}

          </Value>

        </Row>

        <Row>

          <Label>

            Last Follow-up

          </Label>

          <Value>

            {
              visitor.lastFollowUpDate
                ? new Date(visitor.lastFollowUpDate).toLocaleDateString()
                : "Never"
            }

          </Value>

        </Row>

        <Row>

          <Label>

            Converted

          </Label>

          <Badge
            color={
              visitor.convertedToMember
                ? "#16a34a"
                : "#6b7280"
            }
          >

            {
              visitor.convertedToMember
                ? "Yes"
                : "No"
            }

          </Badge>

        </Row>

      </InfoList>

    </Card>

  );

};

export default EngagementCard;