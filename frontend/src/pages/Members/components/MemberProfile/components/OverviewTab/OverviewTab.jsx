import {
    FaUser,
    FaPhone,
    FaEnvelope,
    FaCalendar,
    FaCheckCircle,
    FaClipboardCheck,
    FaIdCard,
    FaUsers,
    FaLayerGroup,
} from "react-icons/fa";

import {
    Grid,
    Card,
    CardTitle,
    InfoRow,
    Icon,
    Label,
    Value,
    GroupList,
    GroupItem,
} from "./OverviewTab.styles";

import MemberQRCode from "../MemberQRCode/MemberQRCode";

const OverviewTab = ({
    member,
}) => {
    const joinedDate =
        member.createdAt
            ? new Date(
                member.createdAt,
            ).toLocaleDateString()
            : "-";

    const groups =
        member.groups || [];

    return (
        <Grid>
            {/* =================================
                Personal Information
            ================================== */}

            <Card>
                <CardTitle>
                    Personal Information
                </CardTitle>

                <InfoRow>
                    <Icon>
                        <FaUser />
                    </Icon>

                    <div>
                        <Label>
                            Gender
                        </Label>

                        <Value>
                            {member.gender || "-"}
                        </Value>
                    </div>
                </InfoRow>

                <InfoRow>
                    <Icon>
                        <FaCalendar />
                    </Icon>

                    <div>
                        <Label>
                            Joined Date
                        </Label>

                        <Value>
                            {joinedDate}
                        </Value>
                    </div>
                </InfoRow>

                <InfoRow>
                    <Icon>
                        <FaIdCard />
                    </Icon>

                    <div>
                        <Label>
                            Member ID
                        </Label>

                        <Value>
                            {member._id?.slice(-8) || "-"}
                        </Value>
                    </div>
                </InfoRow>
            </Card>

            {/* =================================
                Contact Details
            ================================== */}

            <Card>
                <CardTitle>
                    Contact Details
                </CardTitle>

                <InfoRow>
                    <Icon>
                        <FaPhone />
                    </Icon>

                    <div>
                        <Label>
                            Phone
                        </Label>

                        <Value>
                            {member.phone || "-"}
                        </Value>
                    </div>
                </InfoRow>

                <InfoRow>
                    <Icon>
                        <FaEnvelope />
                    </Icon>

                    <div>
                        <Label>
                            Email
                        </Label>

                        <Value>
                            {member.email || "-"}
                        </Value>
                    </div>
                </InfoRow>
            </Card>

            {/* =================================
                Engagement
            ================================== */}

            <Card>
                <CardTitle>
                    Engagement
                </CardTitle>

                <InfoRow>
                    <Icon>
                        <FaClipboardCheck />
                    </Icon>

                    <div>
                        <Label>
                            Attendance
                        </Label>

                        <Value>
                            {member.attendanceCount || 0}{" "}
                            services attended
                        </Value>
                    </div>
                </InfoRow>

                <InfoRow>
                    <Icon>
                        <FaCheckCircle />
                    </Icon>

                    <div>
                        <Label>
                            Follow Ups
                        </Label>

                        <Value>
                            {member.followUps || 0} completed
                        </Value>
                    </div>
                </InfoRow>
            </Card>

            {/* =================================
                Membership
            ================================== */}

            <Card>
                <CardTitle>
                    Membership
                </CardTitle>

                <InfoRow>
                    <Icon>
                        <FaUsers />
                    </Icon>

                    <div>
                        <Label>
                            Status
                        </Label>

                        <Value>
                            {member.isActive
                                ? "Active"
                                : "Inactive"}
                        </Value>
                    </div>
                </InfoRow>

                <InfoRow>
                    <Icon>
                        <FaLayerGroup />
                    </Icon>

                    <div>
                        <Label>
                            Groups
                        </Label>

                        <Value>
                            {member.groupsCount || 0}{" "}
                            active groups
                        </Value>
                    </div>
                </InfoRow>

                {groups.length > 0 && (
                    <GroupList>
                        {groups.map(
                            (item) => (
                                <GroupItem
                                    key={item._id}
                                >
                                    {item.groupId?.name ||
                                        "Unnamed Group"}
                                </GroupItem>
                            ),
                        )}
                    </GroupList>
                )}
            </Card>

            {/* =================================
                Attendance QR
            ================================== */}

            <MemberQRCode
                member={member}
            />
        </Grid>
    );
};

export default OverviewTab;