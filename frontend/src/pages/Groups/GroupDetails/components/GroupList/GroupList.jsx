import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import groupService from "../../../../services/groupService";

import {
    Container,
    List,
    Card,
    GroupName,
    Description,
    Loader,
    Empty,
} from "./GroupList.styles";

const GroupList = () => {

    const navigate = useNavigate();

    const [groups, setGroups] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadGroups();

    }, []);

    const loadGroups = async () => {

        try {

            setLoading(true);

            const response =
                await groupService.getGroups();

            setGroups(response.data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (

            <Loader>

                Loading groups...

            </Loader>

        );

    }

    if (!groups.length) {

        return (

            <Empty>

                No groups have been created yet.

            </Empty>

        );

    }

    return (

        <Container>

            <List>

                {

                    groups.map((group) => (

                        <Card

                            key={group._id}

                            onClick={() =>
                                navigate(
                                    `/groups/${group._id}`
                                )
                            }

                            style={{
                                cursor: "pointer",
                            }}

                        >

                            <GroupName>

                                {group.name}

                            </GroupName>

                            <Description>

                                {group.description ||
                                    "No description"}

                            </Description>

                        </Card>

                    ))

                }

            </List>

        </Container>

    );

};

export default GroupList;