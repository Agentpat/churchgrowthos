import {
    useEffect,
    useState,
} from "react";

import {
    SettingsLayout,
    SettingsSidebarWrapper,
    SettingsContent,
    SettingsHeader,
    SettingsTitle,
    SettingsDescription,
} from "./Settings.styles";

import SettingsSidebar from "./components/SettingsSidebar";
import ChurchProfile from "./components/ChurchProfile";
import AccountSettings from "./components/AccountSettings";
import AppearanceSettings from "./components/AppearanceSettings";

const Settings = () => {
    const [activeSection, setActiveSection] =
        useState("church");

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, [activeSection]);

    const renderSection = () => {
        switch (activeSection) {
            case "church":
                return <ChurchProfile />;

            case "account":
                return <AccountSettings />;

            case "appearance":
                return <AppearanceSettings />;

            default:
                return <ChurchProfile />;
        }
    };

    return (
        <SettingsLayout>
            <SettingsHeader>
                <SettingsTitle>
                    Settings
                </SettingsTitle>

                <SettingsDescription>
                    Manage your church,
                    account, and platform
                    preferences.
                </SettingsDescription>
            </SettingsHeader>

            <SettingsContent>
                <SettingsSidebarWrapper>
                    <SettingsSidebar
                        activeSection={
                            activeSection
                        }
                        setActiveSection={
                            setActiveSection
                        }
                    />
                </SettingsSidebarWrapper>

                <div>
                    {renderSection()}
                </div>
            </SettingsContent>
        </SettingsLayout>
    );
};

export default Settings;