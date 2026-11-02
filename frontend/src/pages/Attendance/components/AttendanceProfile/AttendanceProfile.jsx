import {
    useState,
} from "react";

import {
    FaTimes,
    FaEdit,
    FaCalendarAlt,
    FaClock,
    FaClipboardCheck,
    FaUserEdit,
    FaQrcode,
    FaMobileAlt,
    FaCommentAlt,
} from "react-icons/fa";

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
} from "../../../../components/ui/ProfileDrawer/ProfileDrawer.styles";


const AttendanceProfile = ({
    attendance,
    onClose,
    onEdit,
}) => {

    const [activeTab, setActiveTab] =
        useState("overview");


    // =====================================
    // Guard
    // =====================================

    if (!attendance) {
        return null;
    }


    // =====================================
    // Member
    // =====================================

    const member = attendance.memberId;

    const memberName = member
        ? `${member.firstName || ""} ${member.lastName || ""}`.trim()
        : "Unknown Member";


    const initials = memberName
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((word) => word.charAt(0))
        .join("")
        .toUpperCase();


    // =====================================
    // Service
    // =====================================

    const service = attendance.serviceId;

    const serviceName =
        service?.title ||
        service?.name ||
        "Unknown Service";


    const serviceType =
        service?.serviceType ||
        "";


    // =====================================
    // Status
    // =====================================

    const status =
        attendance.status ||
        "UNKNOWN";


    const isPresent =
        status === "PRESENT";


    // =====================================
    // Check-in Method
    // =====================================

    const getCheckInMethod = () => {

        switch (
        attendance.checkInMethod
        ) {

            case "QR_CODE":
                return {
                    label: "QR Code",
                    icon: FaQrcode,
                };

            case "SELF_CHECK_IN":
                return {
                    label: "Self Check-in",
                    icon: FaMobileAlt,
                };

            case "SMS":
                return {
                    label: "SMS",
                    icon: FaMobileAlt,
                };

            case "MANUAL":
                return {
                    label: "Manual",
                    icon: FaUserEdit,
                };

            default:
                return {
                    label: "Unknown",
                    icon: FaClipboardCheck,
                };
        }
    };


    const checkInMethod =
        getCheckInMethod();

    const CheckInIcon =
        checkInMethod.icon;


    // =====================================
    // Date
    // =====================================

    const formattedDate =
        attendance.checkedInAt
            ? new Date(
                attendance.checkedInAt,
            ).toLocaleDateString(
                "en-NG",
                {
                    weekday: "short",
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                },
            )
            : "-";


    // =====================================
    // Time
    // =====================================

    const formattedTime =
        attendance.checkedInAt
            ? new Date(
                attendance.checkedInAt,
            ).toLocaleTimeString(
                "en-NG",
                {
                    hour: "2-digit",
                    minute: "2-digit",
                },
            )
            : "-";


    // =====================================
    // Recorded By
    // =====================================

    const recordedBy =
        attendance.recordedBy;


    const recordedByName =
        recordedBy?.firstName
            ? `${recordedBy.firstName} ${recordedBy.lastName || ""
                }`.trim()
            : "System";


    // =====================================
    // Membership Status
    // =====================================

    const membershipStatus =
        member?.membershipStatus ||
        "Member";


    // =====================================
    // Status Label
    // =====================================

    const statusLabel =
        status.charAt(0) +
        status.slice(1).toLowerCase();


    return (

        <Overlay
            onClick={onClose}
        >

            <Drawer
                onClick={(event) =>
                    event.stopPropagation()
                }
            >

                <DrawerContent>

                    {/* =================================
                        Header
                    ================================== */}

                    <Header>

                        <HeaderLeft>

                            <Avatar>

                                {initials || "?"}

                            </Avatar>


                            <TitleSection>

                                <Name>
                                    {memberName}
                                </Name>


                                <StatusBadge
                                    active={isPresent}
                                >
                                    {statusLabel}
                                </StatusBadge>

                            </TitleSection>

                        </HeaderLeft>


                        <HeaderRight>

                            <CloseButton
                                type="button"
                                onClick={onClose}
                                aria-label="Close attendance profile"
                            >

                                <FaTimes />

                            </CloseButton>

                        </HeaderRight>

                    </Header>


                    {/* =================================
                        Tabs
                    ================================== */}

                    <Tabs>

                        <Tab
                            type="button"
                            active={
                                activeTab ===
                                "overview"
                            }
                            onClick={() =>
                                setActiveTab(
                                    "overview",
                                )
                            }
                        >
                            Overview
                        </Tab>

                    </Tabs>


                    {/* =================================
                        Content
                    ================================== */}

                    <Content>

                        {activeTab ===
                            "overview" && (

                                <>

                                    {/* =========================
                                    Service
                                ========================== */}

                                    <InfoSection>

                                        <SectionLabel>
                                            Service
                                        </SectionLabel>


                                        <ServiceCard>

                                            <ServiceIcon>
                                                <FaClipboardCheck />
                                            </ServiceIcon>


                                            <ServiceInfo>

                                                <ServiceName>
                                                    {serviceName}
                                                </ServiceName>


                                                {serviceType && (

                                                    <ServiceType>
                                                        {serviceType}
                                                    </ServiceType>

                                                )}

                                            </ServiceInfo>

                                        </ServiceCard>

                                    </InfoSection>


                                    {/* =========================
                                    Attendance Details
                                ========================== */}

                                    <InfoSection>

                                        <SectionLabel>
                                            Attendance Details
                                        </SectionLabel>


                                        <DetailsGrid>

                                            <DetailCard>

                                                <DetailIcon>
                                                    <FaCalendarAlt />
                                                </DetailIcon>


                                                <DetailContent>

                                                    <DetailLabel>
                                                        Date
                                                    </DetailLabel>

                                                    <DetailValue>
                                                        {formattedDate}
                                                    </DetailValue>

                                                </DetailContent>

                                            </DetailCard>


                                            <DetailCard>

                                                <DetailIcon>
                                                    <FaClock />
                                                </DetailIcon>


                                                <DetailContent>

                                                    <DetailLabel>
                                                        Check-in Time
                                                    </DetailLabel>

                                                    <DetailValue>
                                                        {formattedTime}
                                                    </DetailValue>

                                                </DetailContent>

                                            </DetailCard>


                                            <DetailCard>

                                                <DetailIcon>
                                                    <CheckInIcon />
                                                </DetailIcon>


                                                <DetailContent>

                                                    <DetailLabel>
                                                        Check-in Method
                                                    </DetailLabel>

                                                    <DetailValue>
                                                        {checkInMethod.label}
                                                    </DetailValue>

                                                </DetailContent>

                                            </DetailCard>


                                            <DetailCard>

                                                <DetailIcon>
                                                    <FaUserEdit />
                                                </DetailIcon>


                                                <DetailContent>

                                                    <DetailLabel>
                                                        Recorded By
                                                    </DetailLabel>

                                                    <DetailValue>
                                                        {recordedByName}
                                                    </DetailValue>

                                                </DetailContent>

                                            </DetailCard>

                                        </DetailsGrid>

                                    </InfoSection>


                                    {/* =========================
                                    Member Information
                                ========================== */}

                                    <InfoSection>

                                        <SectionLabel>
                                            Member
                                        </SectionLabel>


                                        <MemberCard>

                                            <MemberRow>

                                                <MemberLabel>
                                                    Membership
                                                </MemberLabel>

                                                <MemberValue>
                                                    {membershipStatus}
                                                </MemberValue>

                                            </MemberRow>


                                            {member?.phone && (

                                                <MemberRow>

                                                    <MemberLabel>
                                                        Phone
                                                    </MemberLabel>

                                                    <MemberValue>
                                                        {member.phone}
                                                    </MemberValue>

                                                </MemberRow>

                                            )}


                                            {member?.email && (

                                                <MemberRow>

                                                    <MemberLabel>
                                                        Email
                                                    </MemberLabel>

                                                    <MemberValue>
                                                        {member.email}
                                                    </MemberValue>

                                                </MemberRow>

                                            )}

                                        </MemberCard>

                                    </InfoSection>


                                    {/* =========================
                                    Notes
                                ========================== */}

                                    <InfoSection>

                                        <SectionLabel>
                                            Notes
                                        </SectionLabel>


                                        <NotesCard>

                                            <NotesIcon>
                                                <FaCommentAlt />
                                            </NotesIcon>


                                            <NotesText>

                                                {attendance.notes ||
                                                    "No notes were added to this attendance record."}

                                            </NotesText>

                                        </NotesCard>

                                    </InfoSection>

                                </>

                            )}

                    </Content>

                </DrawerContent>


                {/* =================================
                    Footer
                ================================== */}

                <Footer>

                    <ActionButtons>

                        <ActionButton
                            type="button"
                            variant="secondary"
                            onClick={() =>
                                onEdit?.(
                                    attendance,
                                )
                            }
                        >

                            <FaEdit />

                            Edit Attendance

                        </ActionButton>

                    </ActionButtons>

                </Footer>

            </Drawer>

        </Overlay>

    );

};


// =====================================
// Information Section
// =====================================

const InfoSection = ({
    children,
}) => {

    return (
        <section>
            {children}
        </section>
    );
};


// =====================================
// Section Label
// =====================================

const SectionLabel = ({
    children,
}) => {

    return (
        <div
            style={{
                marginBottom: "8px",
                fontSize: "9px",
                fontWeight: 700,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "#94a3b8",
            }}
        >
            {children}
        </div>
    );
};


// =====================================
// Service Card
// =====================================

const ServiceCard = ({
    children,
}) => {

    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "11px 12px",
                border: "1px solid rgba(15, 23, 42, 0.07)",
                borderRadius: "9px",
                background: "#fafbfc",
            }}
        >
            {children}
        </div>
    );
};


const ServiceIcon = ({
    children,
}) => {

    return (
        <div
            style={{
                width: "30px",
                height: "30px",
                minWidth: "30px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "8px",
                background: "rgba(37, 99, 235, 0.07)",
                color: "#2563eb",
                fontSize: "11px",
            }}
        >
            {children}
        </div>
    );
};


const ServiceInfo = ({
    children,
}) => {

    return (
        <div
            style={{
                minWidth: 0,
                display: "flex",
                flexDirection: "column",
                gap: "2px",
            }}
        >
            {children}
        </div>
    );
};


const ServiceName = ({
    children,
}) => {

    return (
        <div
            style={{
                fontSize: "12px",
                fontWeight: 600,
                color: "#334155",
            }}
        >
            {children}
        </div>
    );
};


const ServiceType = ({
    children,
}) => {

    return (
        <div
            style={{
                fontSize: "9px",
                fontWeight: 600,
                color: "#94a3b8",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
            }}
        >
            {children}
        </div>
    );
};


// =====================================
// Details Grid
// =====================================

const DetailsGrid = ({
    children,
}) => {

    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns:
                    "repeat(2, minmax(0, 1fr))",
                gap: "7px",
            }}
        >
            {children}
        </div>
    );
};


// =====================================
// Detail Card
// =====================================

const DetailCard = ({
    children,
}) => {

    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                minWidth: 0,
                padding: "10px",
                border: "1px solid rgba(15, 23, 42, 0.06)",
                borderRadius: "8px",
                background: "#ffffff",
            }}
        >
            {children}
        </div>
    );
};


const DetailIcon = ({
    children,
}) => {

    return (
        <div
            style={{
                width: "27px",
                height: "27px",
                minWidth: "27px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "7px",
                background: "rgba(100, 116, 139, 0.07)",
                color: "#64748b",
                fontSize: "10px",
            }}
        >
            {children}
        </div>
    );
};


const DetailContent = ({
    children,
}) => {

    return (
        <div
            style={{
                minWidth: 0,
                display: "flex",
                flexDirection: "column",
                gap: "2px",
            }}
        >
            {children}
        </div>
    );
};


const DetailLabel = ({
    children,
}) => {

    return (
        <div
            style={{
                fontSize: "8px",
                color: "#94a3b8",
                fontWeight: 600,
            }}
        >
            {children}
        </div>
    );
};


const DetailValue = ({
    children,
}) => {

    return (
        <div
            style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                fontSize: "10px",
                color: "#334155",
                fontWeight: 600,
            }}
        >
            {children}
        </div>
    );
};


// =====================================
// Member Card
// =====================================

const MemberCard = ({
    children,
}) => {

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                border: "1px solid rgba(15, 23, 42, 0.06)",
                borderRadius: "9px",
                overflow: "hidden",
                background: "#ffffff",
            }}
        >
            {children}
        </div>
    );
};


const MemberRow = ({
    children,
}) => {

    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "12px",
                padding: "9px 11px",
                borderBottom: "1px solid rgba(15, 23, 42, 0.05)",
            }}
        >
            {children}
        </div>
    );
};


const MemberLabel = ({
    children,
}) => {

    return (
        <span
            style={{
                fontSize: "9px",
                color: "#94a3b8",
                fontWeight: 500,
            }}
        >
            {children}
        </span>
    );
};


const MemberValue = ({
    children,
}) => {

    return (
        <span
            style={{
                maxWidth: "60%",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                fontSize: "10px",
                color: "#475569",
                fontWeight: 600,
                textAlign: "right",
            }}
        >
            {children}
        </span>
    );
};


// =====================================
// Notes
// =====================================

const NotesCard = ({
    children,
}) => {

    return (
        <div
            style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "9px",
                padding: "11px 12px",
                border: "1px solid rgba(15, 23, 42, 0.06)",
                borderRadius: "9px",
                background: "#fafbfc",
            }}
        >
            {children}
        </div>
    );
};


const NotesIcon = ({
    children,
}) => {

    return (
        <div
            style={{
                width: "27px",
                height: "27px",
                minWidth: "27px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "7px",
                background: "rgba(100, 116, 139, 0.07)",
                color: "#64748b",
                fontSize: "9px",
            }}
        >
            {children}
        </div>
    );
};


const NotesText = ({
    children,
}) => {

    return (
        <div
            style={{
                fontSize: "10px",
                lineHeight: 1.5,
                color: "#64748b",
            }}
        >
            {children}
        </div>
    );
};


export default AttendanceProfile;