import AttendanceTrend from "./AttendanceTrend/AttendanceTrend";

import InsightList from "./InsightList/InsightList";

import MetricCard from "./MetricCard/MetricCard";

import MemberEngagement from "./MemberEngagement/MemberEngagement";

import FollowUpPerformance from "./FollowUpPerformance/FollowUpPerformance";


import {
    Container,
    Header,
    Title,
    Subtitle,
    MetricsGrid,
    ContentGrid,
    LeftColumn,
    RightColumn,
} from "./GrowthInsights.styles";







const GrowthInsights = ({
    analytics = {},
}) => {



    const metrics = [


        {
            title: "Total Attendance",

            value:
                analytics?.attendance?.total || 0,

            description:
                "People tracked",

        },




        {
            title: "Average Service",

            value:
                analytics?.attendance?.average || 0,

            description:
                "Average gathering size",

        },





        {
            title: "First Timers",

            value:
                analytics?.insights?.firstTimersPendingFollowUp || 0,

            description:
                "Need follow up",

        },





        {
            title: "Growth",

            value:
                `${analytics?.attendance?.growth || 0}%`,

            description:
                "Compared to last period",

        },


    ];







    return (


        <Container>





            <Header>


                <Title>
                    Growth Insights
                </Title>



                <Subtitle>

                    Understand church growth,
                    attendance patterns, member engagement,
                    and leadership insights.

                </Subtitle>


            </Header>









            <MetricsGrid>


                {
                    metrics.map((metric) => (


                        <MetricCard


                            key={
                                metric.title
                            }


                            title={
                                metric.title
                            }


                            value={
                                metric.value
                            }


                            description={
                                metric.description
                            }


                        />


                    ))
                }



            </MetricsGrid>









            <ContentGrid>



                <LeftColumn>


                    <AttendanceTrend


                        attendance={
                            analytics.attendance
                        }


                    />


                </LeftColumn>







                <RightColumn>


                    <InsightList


                        analytics={
                            analytics
                        }


                    />


                </RightColumn>



            </ContentGrid>









            <MemberEngagement


                engagement={
                    analytics.engagement
                }


            />








            <FollowUpPerformance


                followUps={
                    analytics.followUps
                }


            />







        </Container>


    );

};







export default GrowthInsights;