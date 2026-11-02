import {
    FaCheckCircle,
    FaClock,
    FaChartLine,
} from "react-icons/fa";

import {
    Container,
    Header,
    Title,
    MetricsGrid,
    MetricCard,
    IconWrapper,
    Content,
    Label,
    Value,
    Description,
    ProgressContainer,
    ProgressBar,
    ProgressFill,
    StatusBadge,
} from "./FollowUpPerformance.styles";

const FollowUpPerformance = ({
    followUps = {},
}) => {

    const completed = followUps?.completed || 0;

    const pending = followUps?.pending || 0;

    const total = completed + pending;

    const completionRate =
        total === 0
            ? 0
            : Math.round((completed / total) * 100);

    const getStatus = () => {

        if (completionRate >= 90) {
            return "Excellent";
        }

        if (completionRate >= 70) {
            return "Good";
        }

        if (completionRate >= 50) {
            return "Average";
        }

        return "Needs Attention";
    };

    const metrics = [

        {
            title: "Completed Follow Ups",
            value: completed,
            description: "Successfully handled",
            icon: FaCheckCircle,
        },

        {
            title: "Pending Follow Ups",
            value: pending,
            description: "Awaiting action",
            icon: FaClock,
        },

        {
            title: "Completion Rate",
            value: `${completionRate}%`,
            description: `${completed} of ${total} follow ups completed`,
            icon: FaChartLine,
        },

    ];

    return (

        <Container>

            <Header>

                <Title>
                    Follow Up Performance
                </Title>

                <StatusBadge>
                    {getStatus()}
                </StatusBadge>

            </Header>

            <MetricsGrid>

                {
                    metrics.map((metric) => {

                        const Icon = metric.icon;

                        return (

                            <MetricCard
                                key={metric.title}
                            >

                                <IconWrapper>

                                    <Icon />

                                </IconWrapper>

                                <Content>

                                    <Label>
                                        {metric.title}
                                    </Label>

                                    <Value>
                                        {metric.value}
                                    </Value>

                                    <Description>
                                        {metric.description}
                                    </Description>

                                </Content>

                            </MetricCard>

                        );

                    })
                }

            </MetricsGrid>

            <ProgressContainer>

                <Label>
                    Overall Follow-up Progress
                </Label>

                <ProgressBar>

                    <ProgressFill
                        style={{
                            width: `${completionRate}%`,
                        }}
                    />

                </ProgressBar>

                <Description>

                    {completionRate}% of all follow ups have been completed.

                </Description>

            </ProgressContainer>

        </Container>

    );

};

export default FollowUpPerformance;