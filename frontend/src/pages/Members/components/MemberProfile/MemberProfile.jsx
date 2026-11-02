import { useState } from "react";

import {
  FaEdit,
  FaUserSlash,
  FaUserCheck,
} from "react-icons/fa";

import {
  Overlay,
  Drawer,
  DrawerContent,
} from "../../../../components/ui/ProfileDrawer/ProfileDrawer.styles";

import {
  Container,
  EditButton,
  DeactivateButton,
  ReactivateButton,
} from "./MemberProfile.styles";

import ProfileHeader from "../../../../components/ui/ProfileDrawer/ProfileHeader";
import ProfileTabs from "../../../../components/ui/ProfileDrawer/ProfileTabs";

import OverviewTab from "./components/OverviewTab/OverviewTab";
import AttendanceTab from "./components/AttendanceTab/AttendanceTab";
import FollowUpsTab from "./components/FollowUpsTab/FollowUpsTab";
import GroupsTab from "./components/GroupsTab/GroupsTab";
import GivingTab from "./components/GivingTab/GivingTab";
import ActivityTab from "./components/ActivityTab/ActivityTab";

const memberTabs = [
  {
    value: "overview",
    label: "Overview",
  },
  {
    value: "attendance",
    label: "Attendance",
  },
  {
    value: "followups",
    label: "Follow Ups",
  },
  {
    value: "groups",
    label: "Groups",
  },
  {
    value: "giving",
    label: "Giving",
  },
  {
    value: "activity",
    label: "Activity",
  },
];

const MemberProfile = ({
  member,
  onClose,
  onEdit,
  onDeactivate,
  onReactivate,
}) => {
  const [activeTab, setActiveTab] = useState("overview");

  if (!member) {
    return null;
  }

  return (
    <Overlay onClick={onClose}>
      <Drawer onClick={(e) => e.stopPropagation()}>
        <DrawerContent>
          <Container>
            <ProfileHeader
              avatar={member.firstName?.charAt(0)?.toUpperCase()}
              title={`${member.firstName} ${member.lastName}`}
              status={
                member.isActive
                  ? "Active Member"
                  : "Inactive Member"
              }
              statusActive={member.isActive}
              onClose={onClose}
              actions={
                <>
                  <EditButton
                    onClick={() => onEdit(member)}
                  >
                    <FaEdit />
                    Edit
                  </EditButton>

                  {member.isActive ? (
                    <DeactivateButton
                      onClick={() => onDeactivate(member)}
                    >
                      <FaUserSlash />
                      Deactivate
                    </DeactivateButton>
                  ) : (
                    <ReactivateButton
                      onClick={() => onReactivate(member)}
                    >
                      <FaUserCheck />
                      Reactivate
                    </ReactivateButton>
                  )}
                </>
              }
            />

            <ProfileTabs
              tabs={memberTabs}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />

            {activeTab === "overview" && (
              <OverviewTab member={member} />
            )}

            {activeTab === "attendance" && (
              <AttendanceTab member={member} />
            )}

            {activeTab === "followups" && (
              <FollowUpsTab member={member} />
            )}

            {activeTab === "groups" && (
              <GroupsTab member={member} />
            )}

            {activeTab === "giving" && (
              <GivingTab member={member} />
            )}

            {activeTab === "activity" && (
              <ActivityTab member={member} />
            )}
          </Container>
        </DrawerContent>
      </Drawer>
    </Overlay>
  );
};

export default MemberProfile;