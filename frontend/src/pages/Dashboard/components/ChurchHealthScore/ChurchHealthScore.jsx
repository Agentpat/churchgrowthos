import HealthGauge from "./components/HealthGuage";
import HealthMetric from "./components/HealthMetric";
import StrengthList from "./components/StrengthList";
import RecommendationList from "./components/RecommendationList";

import {
    Container,
    Header,
    Title,
    Grid,
    LeftColumn,
    RightColumn,
    MetricsGrid,
} from "./ChurchHealthScore.styles";

const ChurchHealthScore = ({
    churchHealth = {},
}) => {

    return (

        <Container>

            <Header>

                <Title>

                    Church Health

                </Title>

            </Header>

            <Grid>

                <LeftColumn>

                    <HealthGauge
                        score={churchHealth.score}
                        status={churchHealth.status}
                    />

                </LeftColumn>

                <RightColumn>

                    <MetricsGrid>

                        <HealthMetric
                            title="Attendance"
                            value={churchHealth.attendanceScore}
                        />

                        <HealthMetric
                            title="Engagement"
                            value={churchHealth.engagementScore}
                        />

                        <HealthMetric
                            title="Visitors"
                            value={churchHealth.visitorScore}
                        />

                        <HealthMetric
                            title="Follow Ups"
                            value={churchHealth.followUpScore}
                        />

                        <HealthMetric
                            title="Growth"
                            value={churchHealth.growthScore}
                        />

                    </MetricsGrid>

                    <StrengthList
                        strengths={churchHealth.strengths}
                    />

                    <RecommendationList
                        recommendations={churchHealth.recommendations}
                    />

                </RightColumn>

            </Grid>

        </Container>

    );

};

export default ChurchHealthScore;