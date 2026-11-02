import groupService from "../../../../services/groupService";

import {
    Container,
    Header,
    Title,
    Count,
    Table,
    Row,
    Cell,
    Empty,
    Badge,
    RoleBadge,
    MemberName,
    SubText,
    Avatar,
    MemberInfo,
    RemoveButton,
} from "./GroupMembersList.styles";

const GroupMembersList = ({
    members = [],
    groupId,
    onUpdated,
}) => {

    console.log("✅ GroupMembersList received groupId:", groupId);

    const formatDate = (date) => {
        if (!date) return "-";

        return new Date(date).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    };

    const getInitials = (member) => {
        return `${member.firstName?.[0] || ""}${member.lastName?.[0] || ""}`.toUpperCase();
    };

    const handleRemove = async (memberId) => {

        console.log("========== REMOVE ==========");
        console.log("groupId:", groupId);
        console.log("memberId:", memberId);
        console.log("============================");

        if (!groupId) {

            alert("groupId is undefined");

            return;

        }

        try {

            await groupService.removeMemberFromGroup(
                groupId,
                memberId
            );

            onUpdated?.();

        } catch (err) {

            console.error(err);

        }

    };

    if (!members.length) {

        return (

            <Container>

                <Header>

                    <Title>Group Members</Title>

                    <Count>0 Members</Count>

                </Header>

                <Empty>
                    No members assigned to this group yet.
                </Empty>

            </Container>

        );

    }

    return (

        <Container>

            <Header>

                <Title>
                    Group Members
                </Title>

                <Count>
                    {members.length} Members
                </Count>

            </Header>

            <Table>

                <Row $header>

                    <Cell>Member</Cell>

                    <Cell>Phone</Cell>

                    <Cell>Status</Cell>

                    <Cell>Role</Cell>

                    <Cell>Joined</Cell>

                    <Cell>Action</Cell>

                </Row>

                {members.map((item) => {

                    const member = item.memberId || {};

                    return (

                        <Row key={item._id}>

                            <Cell>

                                <MemberInfo>

                                    <Avatar>
                                        {getInitials(member)}
                                    </Avatar>

                                    <div>

                                        <MemberName>
                                            {member.firstName} {member.lastName}
                                        </MemberName>

                                        <SubText>
                                            {member.email || "No email"}
                                        </SubText>

                                    </div>

                                </MemberInfo>

                            </Cell>

                            <Cell>
                                {member.phone || "-"}
                            </Cell>

                            <Cell>

                                <Badge>
                                    {member.membershipStatus || "ACTIVE"}
                                </Badge>

                            </Cell>

                            <Cell>

                                <RoleBadge>
                                    {item.role}
                                </RoleBadge>

                            </Cell>

                            <Cell>

                                {formatDate(
                                    item.joinedDate || item.createdAt
                                )}

                            </Cell>

                            <Cell>

                                <RemoveButton
                                    onClick={() =>
                                        handleRemove(member._id)
                                    }
                                >
                                    Remove
                                </RemoveButton>

                            </Cell>

                        </Row>

                    );

                })}

            </Table>

        </Container>

    );

};

export default GroupMembersList;