import { useState } from "react";

import {
  FaTimes,
  FaUserEdit,
  FaUserCheck,
  FaArchive,
} from "react-icons/fa";

import OverviewTab from "./OverviewTab/OverViewTab";
import FollowUpsTab from "./FollowUpsTab/FollowUpsTab";
import NotesTab from "./NotesTab/NotesTab";

import {
  Overlay,
  Drawer,
  DrawerContent,
  Header,
  HeaderLeft,
  HeaderRight,
  Avatar,
  TitleSection,
  Name,
  StatusBadge,
  CloseButton,
  Tabs,
  Tab,
  Content,
  Footer,
  ActionButtons,
  ActionButton,
} from "../../../components/ui/ProfileDrawer/ProfileDrawer.styles";

const VisitorProfile = ({
  visitor,
  onClose,
  onEdit,
  onConvert,
  onArchive,
}) => {

  const [activeTab, setActiveTab] = useState("overview");

  if (!visitor) {
    return null;
  }

  return (
    <Overlay onClick={onClose}>

      <Drawer onClick={(e) => e.stopPropagation()}>

        <DrawerContent>

          <Header>

            <HeaderLeft>

              <Avatar>
                {visitor.firstName?.charAt(0)?.toUpperCase()}
              </Avatar>

              <TitleSection>

                <Name>
                  {visitor.firstName} {visitor.lastName}
                </Name>

                <StatusBadge active={visitor.isActive}>
                  {visitor.status?.replaceAll("_", " ")}
                </StatusBadge>

              </TitleSection>

            </HeaderLeft>

            <HeaderRight>

              <CloseButton onClick={onClose}>
                <FaTimes />
              </CloseButton>

            </HeaderRight>

          </Header>

          <Tabs>

            <Tab
              active={activeTab === "overview"}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </Tab>

            <Tab
              active={activeTab === "followups"}
              onClick={() => setActiveTab("followups")}
            >
              Follow Ups
            </Tab>

            <Tab
              active={activeTab === "notes"}
              onClick={() => setActiveTab("notes")}
            >
              Notes
            </Tab>

          </Tabs>

          <Content>

            {activeTab === "overview" && (
              <OverviewTab visitor={visitor} />
            )}

            {activeTab === "followups" && (
              <FollowUpsTab visitor={visitor} />
            )}

            {activeTab === "notes" && (
              <NotesTab visitor={visitor} />
            )}

          </Content>

        </DrawerContent>

        <Footer>

          <ActionButtons>

            <ActionButton
              variant="secondary"
              onClick={() => onEdit?.(visitor)}
            >
              <FaUserEdit />
              Edit
            </ActionButton>

            {!visitor.convertedToMember && (

              <ActionButton
                variant="success"
                onClick={() => onConvert?.(visitor)}
              >
                <FaUserCheck />
                Convert
              </ActionButton>

            )}

            <ActionButton
              variant="danger"
              onClick={() => onArchive?.(visitor)}
            >
              <FaArchive />
              Archive
            </ActionButton>

          </ActionButtons>

        </Footer>

      </Drawer>

    </Overlay>
  );

};

export default VisitorProfile;