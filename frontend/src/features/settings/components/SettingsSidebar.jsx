import {
    FaChurch,
    FaUser,
    FaPalette,
} from "react-icons/fa";

import {
    Sidebar,
    SidebarItem,
    SidebarIcon,
    SidebarText,
    SidebarLabel,
} from "./SettingsSidebar.styles";

const sections = [
    {
        id: "church",
        label: "Church Profile",
        description:
            "Church information",
        icon: FaChurch,
    },
    {
        id: "account",
        label: "Account",
        description:
            "Personal account",
        icon: FaUser,
    },
    {
        id: "appearance",
        label: "Appearance",
        description:
            "Branding preferences",
        icon: FaPalette,
    },
];

const SettingsSidebar = ({
    activeSection,
    setActiveSection,
}) => {
    return (
        <Sidebar>
            <SidebarLabel>
                SETTINGS
            </SidebarLabel>

            {sections.map(
                (section) => {
                    const Icon =
                        section.icon;

                    const isActive =
                        activeSection ===
                        section.id;

                    return (
                        <SidebarItem
                            key={
                                section.id
                            }
                            type="button"
                            $active={
                                isActive
                            }
                            onClick={() =>
                                setActiveSection(
                                    section.id,
                                )
                            }
                        >
                            <SidebarIcon
                                $active={
                                    isActive
                                }
                            >
                                <Icon />
                            </SidebarIcon>

                            <SidebarText>
                                <strong>
                                    {
                                        section.label
                                    }
                                </strong>

                                <span>
                                    {
                                        section.description
                                    }
                                </span>
                            </SidebarText>
                        </SidebarItem>
                    );
                },
            )}
        </Sidebar>
    );
};

export default SettingsSidebar;