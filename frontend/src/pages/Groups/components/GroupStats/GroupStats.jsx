import {
    Container,
    Card,
    Label,
    Value,
} from "./GroupStats.styles";



const GroupStats = ({
    groups = [],
}) => {



    const totalGroups = groups.length;



    const ministries = groups.filter(
        (group) =>
            group.type === "MINISTRY"
    ).length;



    const departments = groups.filter(
        (group) =>
            group.type === "DEPARTMENT"
    ).length;



    const totalMembers = groups.reduce(
        (total, group) =>
            total + (group.memberCount || 0),
        0
    );




    const stats = [


        {
            label: "Total Groups",
            value: totalGroups,
        },


        {
            label: "Total Members",
            value: totalMembers,
        },


        {
            label: "Ministries",
            value: ministries,
        },


        {
            label: "Departments",
            value: departments,
        },


    ];






    return (

        <Container>


            {
                stats.map((stat) => (


                    <Card
                        key={stat.label}
                    >


                        <Label>

                            {stat.label}

                        </Label>



                        <Value>

                            {stat.value}

                        </Value>



                    </Card>


                ))
            }



        </Container>

    );

};



export default GroupStats;