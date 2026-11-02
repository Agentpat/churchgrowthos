import {
  Card,
  Header,
  Type,
  Badge,
  Grid,
  Item,
  Label,
  Value,
  Message,
  Actions,
  Button,
} from "./FollowUpCard.styles";

const statusColor = {
  PENDING: "#f59e0b",
  SENT: "#2563eb",
  COMPLETED: "#16a34a",
  FAILED: "#dc2626",
};

const FollowUpCard = ({
  followUp,
  onSent,
  onFailed,
}) => {
  return (
    <Card>
      <Header>
        <Type>
          {followUp.type?.replaceAll("_", " ")}
        </Type>

        <Badge
          color={
            statusColor[followUp.status] ||
            "#6b7280"
          }
        >
          {followUp.status}
        </Badge>
      </Header>

      <Grid>
        <Item>
          <Label>
            Channel
          </Label>

          <Value>
            {followUp.channel}
          </Value>
        </Item>

        <Item>
          <Label>
            Scheduled
          </Label>

          <Value>
            {new Date(
              followUp.scheduledDate,
            ).toLocaleDateString()}
          </Value>
        </Item>

        <Item>
          <Label>
            Sent
          </Label>

          <Value>
            {followUp.sentDate
              ? new Date(
                followUp.sentDate,
              ).toLocaleDateString()
              : "-"}
          </Value>
        </Item>

        <Item>
          <Label>
            Completed
          </Label>

          <Value>
            {followUp.completedDate
              ? new Date(
                followUp.completedDate,
              ).toLocaleDateString()
              : "-"}
          </Value>
        </Item>
      </Grid>

      {followUp.failureReason && (
        <Item>
          <Label>
            Failure Reason
          </Label>

          <Value>
            {followUp.failureReason}
          </Value>
        </Item>
      )}

      <Message>
        {followUp.message}
      </Message>

      {followUp.status === "PENDING" && (
        <Actions>
          <Button
            success
            onClick={() =>
              onSent?.(followUp)
            }
          >
            ✓ Mark Sent
          </Button>

          <Button
            danger
            onClick={() =>
              onFailed?.(followUp)
            }
          >
            ✕ Mark Failed
          </Button>
        </Actions>
      )}
    </Card>
  );
};

export default FollowUpCard;