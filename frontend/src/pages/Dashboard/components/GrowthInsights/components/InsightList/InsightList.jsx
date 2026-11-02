import {
    FaArrowTrendUp,
    FaUsers,
    FaCalendarCheck,
    FaUserClock,
} from "react-icons/fa6";


import {
    Container,
    Header,
    Title,
    List,
    InsightItem,
    IconWrapper,
    Content,
    InsightTitle,
    Description,
} from "./InsightList.styles";







const InsightList = ({
    analytics = {},
}) => {



    const attendanceGrowth =
        analytics?.attendance?.growth || 0;



    const strongestService =
        analytics?.insights?.strongestService;



    const firstTimers =
        analytics?.insights?.firstTimersPendingFollowUp || 0;



    const inactiveMembers =
        analytics?.insights?.inactiveMembers || 0;







    const insights = [

        {
            title:
                `Attendance ${attendanceGrowth >= 0
                    ? "increased"
                    : "decreased"
                } ${Math.abs(attendanceGrowth)
                }% this month`,

            description:
                attendanceGrowth >= 0

                    ?

                    "Your church is seeing consistent growth compared to the previous period."

                    :

                    "Attendance has reduced compared to the previous period.",


            icon:
                FaArrowTrendUp,

        },





        {
            title:

                strongestService

                    ?

                    `${strongestService.title} is your strongest gathering`

                    :

                    "No strongest gathering data yet",



            description:

                strongestService

                    ?

                    `${strongestService.title} recorded the highest attendance volume with ${strongestService.attendance} attendees.`

                    :

                    "Record more attendance to generate service insights.",


            icon:
                FaCalendarCheck,

        },







        {
            title:
                `${firstTimers} first timers need follow-up`,



            description:

                "New visitors have attended but need engagement and follow-up activity.",



            icon:
                FaUsers,

        },







        {
            title:
                `${inactiveMembers} members are inactive`,



            description:

                "These members have not recorded attendance recently and may need care.",



            icon:
                FaUserClock,

        },



    ];









    return (

        <Container>


            <Header>

                <Title>

                    Growth Insights

                </Title>


            </Header>








            <List>


                {
                    insights.map((item) => {


                        const Icon =
                            item.icon;




                        return (

                            <InsightItem

                                key={
                                    item.title
                                }

                            >



                                <IconWrapper>

                                    <Icon />

                                </IconWrapper>





                                <Content>


                                    <InsightTitle>

                                        {item.title}

                                    </InsightTitle>





                                    <Description>

                                        {item.description}

                                    </Description>




                                </Content>




                            </InsightItem>


                        );


                    })
                }



            </List>





        </Container>

    );

};






export default InsightList;