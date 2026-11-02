import VisitorInformationCard from "./components/VisitorInformationCard/VisitorInformationCard";
import VisitInformationCard from "./components/VisitInformationCard/VisitInformationCard";
import EngagementCard from "./components/EngagementCard/EngagementCard";
import NotesCard from "./components/NotesCard/NotesCard";

import {
  Container,
  Grid,
} from "./OverviewTab.styles";

const OverviewTab = ({ visitor }) => {

  return (

    <Container>

      <Grid>

        <VisitorInformationCard
          visitor={visitor}
        />

        <VisitInformationCard
          visitor={visitor}
        />

        <EngagementCard
          visitor={visitor}
        />

        <NotesCard
          visitor={visitor}
        />

      </Grid>

    </Container>

  );

};

export default OverviewTab;