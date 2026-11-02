import {
    FaChartLine,
    FaCalendarDay,
} from "react-icons/fa";


import {
    WelcomeContainer,
    TopRow,
    Badge,
    DateBox,
    WelcomeText,
    Subtitle,
    GrowthCard,
    GrowthIcon,
    GrowthText,
} from "./WelcomeCard.styles";



const WelcomeCard = ({
    firstName,
}) => {


    const today = new Date()
        .toLocaleDateString(
            "en-NG",
            {
                weekday: "long",
                day: "numeric",
                month: "long",
            }
        );



    return (

        <WelcomeContainer>


            <TopRow>


                <Badge>

                    Church Overview

                </Badge>




                <DateBox>

                    <FaCalendarDay />

                    {today}

                </DateBox>


            </TopRow>





            <WelcomeText>

                Good morning, {firstName || "Admin"} 👋

            </WelcomeText>





            <Subtitle>

                Monitor your church growth, members,
                attendance, and finances from one place.

            </Subtitle>






            <GrowthCard>


                <GrowthIcon>

                    <FaChartLine />

                </GrowthIcon>



                <GrowthText>

                    <strong>
                        Growth Dashboard Active
                    </strong>


                    <span>
                        Your church operations are being tracked in real time.
                    </span>


                </GrowthText>


            </GrowthCard>





        </WelcomeContainer>

    );

};


export default WelcomeCard;