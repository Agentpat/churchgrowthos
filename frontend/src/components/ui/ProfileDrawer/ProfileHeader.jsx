import { FaTimes } from "react-icons/fa";

import {
    Header,
    HeaderLeft,
    HeaderRight,
    Avatar,
    TitleSection,
    Name,
    StatusBadge,
    ActionButtons,
    CloseButton,
} from "./ProfileDrawer.styles";

const ProfileHeader = ({
    avatar,
    title,
    status,
    statusActive = true,
    actions,
    onClose,
}) => {
    return (
        <Header>
            <HeaderLeft>
                <Avatar>{avatar}</Avatar>

                <TitleSection>
                    <Name>{title}</Name>

                    <StatusBadge active={statusActive}>
                        {status}
                    </StatusBadge>
                </TitleSection>
            </HeaderLeft>

            <HeaderRight>
                {actions && (
                    <ActionButtons>
                        {actions}
                    </ActionButtons>
                )}

                <CloseButton
                    type="button"
                    onClick={onClose}
                    aria-label="Close profile"
                >
                    <FaTimes />
                </CloseButton>
            </HeaderRight>
        </Header>
    );
};

export default ProfileHeader;