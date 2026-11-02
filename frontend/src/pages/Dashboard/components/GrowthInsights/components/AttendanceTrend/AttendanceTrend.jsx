import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    ResponsiveContainer,
    Tooltip,
} from "recharts";


import {
    ChartCard,
    ChartHeader,
    ChartTitle,
    ChartSubtitle,
    GrowthBadge,
    EmptyState,
} from "./AttendanceTrend.styles";





const AttendanceTrend = ({
    attendance = {},
}) => {



    const data =
        attendance?.trend || [];




    const hasData =
        data.length > 0;







    return (

        <ChartCard>


            <ChartHeader>


                <div>


                    <ChartTitle>

                        Attendance Trend

                    </ChartTitle>




                    <ChartSubtitle>

                        Weekly attendance performance

                    </ChartSubtitle>


                </div>






                {
                    attendance?.growth !== undefined && (

                        <GrowthBadge
                            positive={
                                attendance.growth >= 0
                            }
                        >

                            {
                                attendance.growth >= 0
                                    ? "+"
                                    : ""
                            }

                            {attendance.growth}%


                        </GrowthBadge>

                    )
                }



            </ChartHeader>







            {
                hasData ? (


                    <ResponsiveContainer

                        width="100%"

                        height={180}

                    >


                        <LineChart

                            data={data}

                            margin={{
                                top:10,
                                right:10,
                                left:0,
                                bottom:0,
                            }}

                        >



                            <XAxis

                                dataKey="label"

                                hide

                            />



                            <YAxis

                                hide

                            />






                            <Tooltip

                                formatter={
                                    (value)=>[
                                        `${value} people`,
                                        "Attendance"
                                    ]
                                }


                                labelFormatter={
                                    (label)=>label
                                }

                            />







                            <Line


                                type="monotone"


                                dataKey="value"


                                strokeWidth={3}


                                dot={false}


                                activeDot={{
                                    r:6,
                                }}


                            />




                        </LineChart>




                    </ResponsiveContainer>



                )



                :



                (

                    <EmptyState>

                        No attendance trend data available yet.

                    </EmptyState>

                )

            }







        </ChartCard>


    );

};





export default AttendanceTrend;