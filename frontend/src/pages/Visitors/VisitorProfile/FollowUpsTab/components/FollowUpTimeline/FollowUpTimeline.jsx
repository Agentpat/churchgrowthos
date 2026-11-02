import {
  Container,
} from "./FollowUpTimeline.styles";

import FollowUpCard from "../FollowUpCard/FollowUpCard";

const FollowUpTimeline = ({
  followUps,
  onSent,
  onFailed,
}) => {
  return (
    <Container>
      {followUps.map((followUp) => (
        <FollowUpCard
          key={followUp._id}
          followUp={followUp}
          onSent={onSent}
          onFailed={onFailed}
        />
      ))}
    </Container>
  );
};

export default FollowUpTimeline;