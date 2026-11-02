import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import groupService from "../../../services/groupService";

import AddMemberModal from "../components/AddMemberModal/AddMemberModal";
import GroupMembersList from "../components/GroupMemberList/GroupMembersList";

import {
  Container,
  HeaderCard,
  BackButton,
  HeaderTop,
  GroupInfo,
  GroupName,
  BadgeRow,
  TypeBadge,
  StatusBadge,
  Description,
  Meta,
  Actions,
  Button,
  Loader,
  Stats,
  StatCard,
  StatTitle,
  StatValue,
} from "./GroupDetails.styles";

const GroupDetails = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();

  const [group, setGroup] = useState(null);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (groupId) {
      loadGroup();
    }
  }, [groupId]);

  const loadGroup = async () => {
    try {
      setLoading(true);

      const [groupResponse, membersResponse] = await Promise.all([
        groupService.getGroupById(groupId),
        groupService.getGroupMembers(groupId),
      ]);

      const groupData = groupResponse.data || groupResponse;
      const membersData = membersResponse.data || membersResponse || [];

      setGroup(groupData);
      setMembers(membersData);
    } catch (error) {
      console.error("Failed loading group:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader>Loading group...</Loader>;
  }

  if (!group) {
    return <Loader>Group not found.</Loader>;
  }

  // Leaders from MemberGroup relationship
  const leaders = members.filter(
    (member) => member.role === "LEADER"
  );

  // Backend primary leader takes priority
  const groupLeader =
    group.primaryLeader ||
    group.leader ||
    leaders[0]?.memberId ||
    null;

  return (
    <Container>
      <HeaderCard>
        <BackButton
          onClick={() => navigate("/groups")}
        >
          ← Back to Groups
        </BackButton>

        <HeaderTop>
          <GroupInfo>
            <BadgeRow>
              <TypeBadge>
                {group.type}
              </TypeBadge>

              <StatusBadge>
                {group.isActive ? "Active" : "Inactive"}
              </StatusBadge>
            </BadgeRow>

            <GroupName>
              {group.name}
            </GroupName>

            <Description>
              {group.description || "No description available."}
            </Description>

            <Meta>
              <strong>Leader:</strong>{" "}
              {groupLeader
                ? `${groupLeader.firstName} ${groupLeader.lastName}`
                : "Not assigned"}
            </Meta>
          </GroupInfo>

          <Actions>
            <Button
              onClick={() => setShowModal(true)}
            >
              + Add Member
            </Button>
          </Actions>
        </HeaderTop>
      </HeaderCard>

      <Stats>
        <StatCard>
          <StatTitle>Total Members</StatTitle>

          <StatValue>
            {group.memberCount ?? members.length}
          </StatValue>
        </StatCard>

        <StatCard>
          <StatTitle>Leaders</StatTitle>

          <StatValue>
            {leaders.length}
          </StatValue>
        </StatCard>

        <StatCard>
          <StatTitle>Status</StatTitle>

          <StatValue>
            {group.isActive ? "Active" : "Inactive"}
          </StatValue>
        </StatCard>
      </Stats>

      <GroupMembersList
        groupId={groupId}
        members={members}
        onUpdated={loadGroup}
      />

      {showModal && (
        <AddMemberModal
          groupId={groupId}
          onClose={() => setShowModal(false)}
          onAdded={() => {
            setShowModal(false);
            loadGroup();
          }}
        />
      )}
    </Container>
  );
};

export default GroupDetails;