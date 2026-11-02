import {
    List,
    Card,
    Name,
    Info,
} from "./GroupList.styles";



const GroupList = ({
    groups,
}) => {


    return (

        <List>


            {
                groups.map((group) => (

                    <Card
                        key={group._id}
                    >

                        <Name>
                            {group.groupId?.name}
                        </Name>


                        <Info>
                            Type: {group.groupId?.type}
                        </Info>


                        <Info>
                            Role: {group.role}
                        </Info>


                        <Info>
                            Joined:
                            {" "}
                            {
                                new Date(
                                    group.joinedDate
                                )
                                    .toLocaleDateString()
                            }
                        </Info>


                    </Card>

                ))
            }


        </List>

    );

};


export default GroupList;