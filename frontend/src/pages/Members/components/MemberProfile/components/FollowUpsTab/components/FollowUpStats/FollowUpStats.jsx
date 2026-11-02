import {
    StatsContainer,
    StatCard,
    Label,
    Value,
} from "./FollowUpStats.styles";



const FollowUpStats = ({
    followUps = [],
}) => {



    const total =
        followUps.length;




    const completed =
        followUps.filter(
            item =>
                item.status === "COMPLETED"
        ).length;





    const pending =
        followUps.filter(
            item =>
                item.status === "PENDING"
        ).length;





    const sent =
        followUps.filter(
            item =>
                item.status === "SENT"
        ).length;





    const failed =
        followUps.filter(
            item =>
                item.status === "FAILED"
        ).length;







    return (

        <StatsContainer>



            <StatCard>

                <Label>
                    Total Follow Ups
                </Label>


                <Value>
                    {total}
                </Value>


            </StatCard>






            <StatCard>

                <Label>
                    Pending
                </Label>


                <Value>
                    {pending}
                </Value>


            </StatCard>







            <StatCard>

                <Label>
                    Sent
                </Label>


                <Value>
                    {sent}
                </Value>


            </StatCard>







            <StatCard>

                <Label>
                    Completed
                </Label>


                <Value>
                    {completed}
                </Value>


            </StatCard>







            <StatCard>

                <Label>
                    Failed
                </Label>


                <Value>
                    {failed}
                </Value>


            </StatCard>





        </StatsContainer>

    );

};



export default FollowUpStats;