import {
    Tabs,
    Tab,
} from "./ProfileDrawer.styles";

const ProfileTabs = ({
    tabs,
    activeTab,
    setActiveTab,
}) => {
    return (
        <Tabs>
            {tabs.map((tab) => (
                <Tab
                    key={tab.value}
                    active={activeTab === tab.value}
                    onClick={() => setActiveTab(tab.value)}
                >
                    {tab.label}
                </Tab>
            ))}
        </Tabs>
    );
};

export default ProfileTabs;