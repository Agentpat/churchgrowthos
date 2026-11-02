import {
    FaUsers,
    FaUserPlus,
    FaChartLine,
    FaArrowTrendUp,
} from "react-icons/fa6";


import {
    LineChart,
    Line,
    ResponsiveContainer,
} from "recharts";



import {
    Container,
    Header,
    Title,
    MetricGrid,
    MetricCard,
    IconWrapper,
    Content,
    Label,
    Value,
    Description,
    TrendContainer,
    TrendHeader,
    TrendTitle,
    TrendPeriod,
    GrowthBadge,
} from "./AttendanceInsights.styles";





const AttendanceInsights = ({
    attendance = {},
}) => {



    const metrics = [

        {
            label:
                "Total Attendance",

            value:
                attendance.total || 0,

            description:
                "People tracked",

            icon:
                FaUsers,

        },



        {
            label:
                "Average Gathering",

            value:
                attendance.average || 0,

            description:
                "Per service",

            icon:
                FaChartLine,

        },



        {
            label:
                "First Timers",

            value:
                attendance.firstTimers || 0,

            description:
                "New visitors",

            icon:
                FaUserPlus,

        },



        {
            label:
                "Growth Rate",

            value:
                `${attendance.growth || 0}%`,

            description:
                "Compared to previous period",

            icon:
                FaArrowTrendUp,

        },

    ];







    const chartData = [

        {
            value: 120,
        },

        {
            value: 180,
        },

        {
            value: 150,
        },

        {
            value: 240,
        },

        {
            value: 220,
        },

        {
            value: 320,
        },

        {
            value: 390,
        },

    ];








    return (

        <Container>


            <Header>

                <Title>

                    Attendance Intelligence

                </Title>


            </Header>





            <MetricGrid>


                {
                    metrics.map((item) => {


                        const Icon =
                            item.icon;



                        return (

                            <MetricCard
                                key={item.label}
                            >


                                <IconWrapper>

                                    <Icon />

                                </IconWrapper>





                                <Content>


                                    <Label>

                                        {item.label}

                                    </Label>




                                    <Value>

                                        {item.value}

                                    </Value>





                                    <Description>

                                        {item.description}

                                    </Description>


                                </Content>



                            </MetricCard>

                        );


                    })
                }



            </MetricGrid>









            <TrendContainer>


                <TrendHeader>


                    <TrendTitle>

                        Attendance Activity

                    </TrendTitle>



                    <TrendPeriod>

                        Last 7 services

                    </TrendPeriod>



                    <GrowthBadge>

                        +{attendance.growth || 0}% growth

                    </GrowthBadge>


                </TrendHeader>







                <ResponsiveContainer

                    width="100%"

                    height={100}

                >


                    <LineChart

                        data={chartData}

                    >


                        <Line

                            type="monotone"

                            dataKey="value"

                            strokeWidth={3}

                            dot={false}

                        />


                    </LineChart>


                </ResponsiveContainer>



            </TrendContainer>




        </Container>

    );

};



export default AttendanceInsights;