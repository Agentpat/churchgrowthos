import {
    FaUsers,
    FaUserCheck,
    FaUserClock,
    FaChartLine,
} from "react-icons/fa6";


import MetricCard from "../MetricCard/MetricCard";


import {
    Container,
    Header,
    Title,
    Grid,
} from "./MemberEngagement.styles";




const MemberEngagement = ({
    engagement = {},
}) => {


    const metrics = [

        {
            title: "Total Members",

            value:
                engagement.totalMembers || 0,

            description:
                "Registered members",

            icon:
                FaUsers,

        },



        {
            title: "Active Members",

            value:
                engagement.activeMembers || 0,

            description:
                "Attended in last 30 days",

            icon:
                FaUserCheck,

        },



        {
            title: "Inactive Members",

            value:
                engagement.inactiveMembers || 0,

            description:
                "No recent attendance",

            icon:
                FaUserClock,

        },



        {
            title: "Engagement Rate",

            value:
                `${engagement.engagementRate || 0}%`,

            description:
                "Member participation",

            icon:
                FaChartLine,

        },

    ];






    return (

        <Container>


            <Header>


                <Title>

                    Member Engagement

                </Title>


            </Header>





            <Grid>


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

                            icon={
                                metric.icon
                            }

                        />

                    ))
                }


            </Grid>



        </Container>

    );

};



export default MemberEngagement;