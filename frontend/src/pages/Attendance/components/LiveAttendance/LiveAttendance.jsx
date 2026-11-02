
import {
    FaCircle,
    FaUsers,
    FaUserCheck,
    FaPercentage,
    FaQrcode,
    FaClock,
    FaCalendarAlt,
    FaLock,
} from "react-icons/fa";

import {
    Container,
    Header,
    HeaderContent,
    Eyebrow,
    TitleRow,
    Title,
    Status,
    StatusDot,
    StatusText,
    ServiceMeta,
    ServiceDate,
    LiveBadge,
    Stats,
    Stat,
    StatIcon,
    StatContent,
    StatLabel,
    StatValue,
    StatSubtext,
    Main,
    RecentSection,
    SectionHeader,
    SectionTitle,
    SectionDescription,
    CheckInList,
    CheckInRow,
    Member,
    MemberAvatar,
    MemberInfo,
    MemberName,
    MemberMeta,
    CheckInDetails,
    CheckInMethod,
    CheckInTime,
    ScanAction,
    EmptyState,
    EmptyIcon,
    EmptyTitle,
    EmptyDescription,
} from "./LiveAttendance.styles";

const LiveAttendance = ({
    service = null,
    nextService = null,
    session = null,
    expectedMembers = 0,
    attendance = [],
    onScan,
}) => {
    // =====================================
    // SERVICE + ATTENDANCE LIFECYCLE
    // =====================================

    const serviceStatus =
        service?.status || "NOT_STARTED";

    const sessionStatus =
        session?.status || "NOT_STARTED";

    const isServiceLive =
        serviceStatus === "LIVE";

    const isAttendanceNotStarted =
        isServiceLive &&
        sessionStatus === "NOT_STARTED";

    const isAttendanceClosed =
        isServiceLive &&
        sessionStatus === "CLOSED";

    const isAttendanceFinalized =
        isServiceLive &&
        sessionStatus === "FINALIZED";

    // =====================================
    // SERVICE
    // =====================================

    const serviceTitle =
        service?.title ||
        service?.name ||
        "Church service";

    const serviceDate =
        service?.serviceDate
            ? new Date(service.serviceDate)
            : null;

    // =====================================
    // ATTENDANCE
    // =====================================

    const attendanceRecords =
        Array.isArray(attendance)
            ? attendance
            : [];

    const checkedIn =
        attendanceRecords.filter(
            (record) =>
                record.status === "PRESENT",
        ).length;

    const expected =
        Number(expectedMembers) || 0;

    const attendanceRate =
        expected > 0
            ? Math.min(
                100,
                Math.round(
                    (checkedIn / expected) * 100,
                ),
            )
            : 0;

    // =====================================
    // SERVICE STATUS
    // =====================================

    const getStatusConfig = () => {
        if (!service) {
            return {
                label: "Not live",
                type: "neutral",
            };
        }

        switch (serviceStatus) {
            case "LIVE":
                if (
                    sessionStatus ===
                    "OPEN"
                ) {
                    return {
                        label: "Attendance open",
                        type: "live",
                    };
                }

                if (
                    sessionStatus ===
                    "NOT_STARTED"
                ) {
                    return {
                        label: "Attendance not open",
                        type: "neutral",
                    };
                }

                if (
                    sessionStatus ===
                    "CLOSED"
                ) {
                    return {
                        label: "Attendance closed",
                        type: "closed",
                    };
                }

                if (
                    sessionStatus ===
                    "FINALIZED"
                ) {
                    return {
                        label: "Attendance finalized",
                        type: "closed",
                    };
                }

                return {
                    label: "Live",
                    type: "live",
                };

            case "SCHEDULED":
                return {
                    label: "Scheduled",
                    type: "neutral",
                };

            case "COMPLETED":
                return {
                    label: "Completed",
                    type: "closed",
                };

            case "CANCELLED":
                return {
                    label: "Cancelled",
                    type: "closed",
                };

            default:
                return {
                    label: "Not started",
                    type: "neutral",
                };
        }
    };

    const currentStatus =
        getStatusConfig();

    // =====================================
    // NEXT SERVICE
    // =====================================

    const nextServiceTitle =
        nextService?.title ||
        nextService?.name ||
        "Upcoming service";

    const nextServiceDate =
        nextService?.serviceDate
            ? new Date(nextService.serviceDate)
            : null;

    // =====================================
    // HELPERS
    // =====================================

    const getMemberName = (record) => {
        const member =
            record.memberId ||
            record.member ||
            null;

        if (!member) {
            return "Unknown member";
        }

        return (
            `${member.firstName || ""} ${
                member.lastName || ""
            }`
        ).trim() || "Unknown member";
    };

    const getInitials = (name) => {
        return (
            name
                .split(" ")
                .filter(Boolean)
                .slice(0, 2)
                .map(
                    (part) =>
                        part.charAt(0),
                )
                .join("")
                .toUpperCase() || "?"
        );
    };

    const getMethodLabel = (method) => {
        switch (method) {
            case "QR_CODE":
                return "QR check-in";

            case "SELF_CHECK_IN":
                return "Self check-in";

            case "MANUAL":
                return "Manual";

            case "SMS":
                return "SMS";

            default:
                return "Check-in";
        }
    };

    const formatDate = (date) => {
        if (!date) {
            return "";
        }

        try {
            return new Intl.DateTimeFormat(
                "en-NG",
                {
                    weekday: "short",
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                },
            ).format(date);
        } catch {
            return "";
        }
    };

    const formatTime = (date) => {
        if (!date) {
            return "-";
        }

        try {
            return new Intl.DateTimeFormat(
                "en-NG",
                {
                    hour: "2-digit",
                    minute: "2-digit",
                },
            ).format(
                new Date(date),
            );
        } catch {
            return "-";
        }
    };

    // =====================================
    // RECENT ATTENDANCE
    // =====================================

    const recentAttendance =
        [...attendanceRecords]
            .sort(
                (a, b) =>
                    new Date(
                        b.checkedInAt || 0,
                    ) -
                    new Date(
                        a.checkedInAt || 0,
                    ),
            )
            .slice(0, 8);

    // =====================================
    // NO LIVE SERVICE
    // =====================================

    if (!isServiceLive) {
        const title =
            serviceStatus === "SCHEDULED"
                ? "Service scheduled"
                : serviceStatus === "COMPLETED"
                    ? "Service completed"
                    : serviceStatus === "CANCELLED"
                        ? "Service cancelled"
                        : "No live service";

        const description =
            serviceStatus === "SCHEDULED"
                ? "Attendance will become available when this service goes live."
                : serviceStatus === "COMPLETED"
                    ? "This service has ended. Attendance is no longer active."
                    : serviceStatus === "CANCELLED"
                        ? "Attendance is unavailable because this service was cancelled."
                        : "There is currently no service taking attendance.";

        return (
            <Container>
                <Header>
                    <HeaderContent>
                        <Eyebrow>
                            Live attendance
                        </Eyebrow>

                        <TitleRow>
                            <Title>
                                {title}
                            </Title>

                            <Status
                                $type={
                                    currentStatus.type
                                }
                            >
                                <StatusDot>
                                    <FaCircle />
                                </StatusDot>

                                <StatusText>
                                    {
                                        currentStatus.label
                                    }
                                </StatusText>
                            </Status>
                        </TitleRow>

                        {service ? (
                            <ServiceMeta>
                                <ServiceDate>
                                    {serviceTitle}

                                    {serviceDate
                                        ? ` · ${formatDate(
                                            serviceDate,
                                        )}`
                                        : ""}
                                </ServiceDate>
                            </ServiceMeta>
                        ) : (
                            <ServiceMeta>
                                <ServiceDate>
                                    Attendance is not
                                    currently active.
                                </ServiceDate>
                            </ServiceMeta>
                        )}
                    </HeaderContent>
                </Header>

                <Main>
                    <RecentSection>
                        <EmptyState>
                            <EmptyIcon>
                                <FaCalendarAlt />
                            </EmptyIcon>

                            <EmptyTitle>
                                {title}
                            </EmptyTitle>

                            <EmptyDescription>
                                {description}

                                {!service &&
                                    nextService && (
                                        <>
                                            {" "}
                                            The next
                                            service is{" "}
                                            <strong>
                                                {
                                                    nextServiceTitle
                                                }
                                            </strong>
                                            {nextServiceDate
                                                ? ` on ${formatDate(
                                                    nextServiceDate,
                                                )}.`
                                                : "."}
                                        </>
                                    )}
                            </EmptyDescription>
                        </EmptyState>
                    </RecentSection>
                </Main>
            </Container>
        );
    }

    // =====================================
    // LIVE SERVICE — ATTENDANCE NOT OPEN
    // =====================================

    if (isAttendanceNotStarted) {
        return (
            <Container>
                <Header>
                    <HeaderContent>
                        <Eyebrow>
                            Live attendance
                        </Eyebrow>

                        <TitleRow>
                            <Title>
                                {serviceTitle}
                            </Title>

                            <Status
                                $type="neutral"
                            >
                                <StatusDot>
                                    <FaCircle />
                                </StatusDot>

                                <StatusText>
                                    Attendance not open
                                </StatusText>
                            </Status>
                        </TitleRow>

                        {serviceDate && (
                            <ServiceMeta>
                                <ServiceDate>
                                    {formatDate(
                                        serviceDate,
                                    )}
                                </ServiceDate>

                                <LiveBadge>
                                    <FaCircle />
                                    Service is live
                                </LiveBadge>
                            </ServiceMeta>
                        )}
                    </HeaderContent>
                </Header>

                <Main>
                    <RecentSection>
                        <EmptyState>
                            <EmptyIcon>
                                <FaClock />
                            </EmptyIcon>

                            <EmptyTitle>
                                Open attendance to begin
                            </EmptyTitle>

                            <EmptyDescription>
                                The service is currently
                                live, but attendance has
                                not been opened yet. Open
                                attendance from the
                                header to begin recording
                                member check-ins.
                            </EmptyDescription>
                        </EmptyState>
                    </RecentSection>
                </Main>
            </Container>
        );
    }

    // =====================================
    // LIVE SERVICE — CLOSED / FINALIZED
    // =====================================

    if (
        isAttendanceClosed ||
        isAttendanceFinalized
    ) {
        const finalized =
            isAttendanceFinalized;

        return (
            <Container>
                <Header>
                    <HeaderContent>
                        <Eyebrow>
                            Live attendance
                        </Eyebrow>

                        <TitleRow>
                            <Title>
                                {serviceTitle}
                            </Title>

                            <Status
                                $type="closed"
                            >
                                <StatusDot>
                                    <FaCircle />
                                </StatusDot>

                                <StatusText>
                                    {finalized
                                        ? "Finalized"
                                        : "Attendance closed"}
                                </StatusText>
                            </Status>
                        </TitleRow>

                        {serviceDate && (
                            <ServiceMeta>
                                <ServiceDate>
                                    {formatDate(
                                        serviceDate,
                                    )}
                                </ServiceDate>

                                <LiveBadge>
                                    <FaLock />
                                    {finalized
                                        ? "Attendance finalized"
                                        : "Attendance closed"}
                                </LiveBadge>
                            </ServiceMeta>
                        )}
                    </HeaderContent>
                </Header>

                <Stats>
                    <Stat>
                        <StatIcon>
                            <FaUserCheck />
                        </StatIcon>

                        <StatContent>
                            <StatLabel>
                                Checked in
                            </StatLabel>

                            <StatValue>
                                {checkedIn.toLocaleString()}
                            </StatValue>

                            <StatSubtext>
                                Members present
                            </StatSubtext>
                        </StatContent>
                    </Stat>

                    <Stat>
                        <StatIcon>
                            <FaUsers />
                        </StatIcon>

                        <StatContent>
                            <StatLabel>
                                Expected
                            </StatLabel>

                            <StatValue>
                                {expected.toLocaleString()}
                            </StatValue>

                            <StatSubtext>
                                Expected members
                            </StatSubtext>
                        </StatContent>
                    </Stat>

                    <Stat>
                        <StatIcon>
                            <FaPercentage />
                        </StatIcon>

                        <StatContent>
                            <StatLabel>
                                Attendance rate
                            </StatLabel>

                            <StatValue>
                                {attendanceRate}%
                            </StatValue>

                            <StatSubtext>
                                Final service total
                            </StatSubtext>
                        </StatContent>
                    </Stat>
                </Stats>

                <Main>
                    <RecentSection>
                        <SectionHeader>
                            <div>
                                <SectionTitle>
                                    Attendance records
                                </SectionTitle>

                                <SectionDescription>
                                    No further check-ins
                                    can be recorded for
                                    this attendance
                                    session.
                                </SectionDescription>
                            </div>
                        </SectionHeader>

                        {recentAttendance.length > 0 ? (
                            <CheckInList>
                                {recentAttendance.map(
                                    (
                                        record,
                                        index,
                                    ) => {
                                        const name =
                                            getMemberName(
                                                record,
                                            );

                                        return (
                                            <CheckInRow
                                                key={
                                                    record._id ||
                                                    index
                                                }
                                            >
                                                <Member>
                                                    <MemberAvatar>
                                                        {getInitials(
                                                            name,
                                                        )}
                                                    </MemberAvatar>

                                                    <MemberInfo>
                                                        <MemberName>
                                                            {
                                                                name
                                                            }
                                                        </MemberName>

                                                        <MemberMeta>
                                                            {record
                                                                .memberId
                                                                ?.membershipStatus ||
                                                                record
                                                                    .member
                                                                    ?.membershipStatus ||
                                                                "Member"}
                                                        </MemberMeta>
                                                    </MemberInfo>
                                                </Member>

                                                <CheckInDetails>
                                                    <CheckInMethod>
                                                        {getMethodLabel(
                                                            record.checkInMethod,
                                                        )}
                                                    </CheckInMethod>

                                                    <CheckInTime>
                                                        <FaClock />

                                                        {formatTime(
                                                            record.checkedInAt,
                                                        )}
                                                    </CheckInTime>
                                                </CheckInDetails>
                                            </CheckInRow>
                                        );
                                    },
                                )}
                            </CheckInList>
                        ) : (
                            <EmptyState>
                                <EmptyIcon>
                                    <FaLock />
                                </EmptyIcon>

                                <EmptyTitle>
                                    No check-ins recorded
                                </EmptyTitle>

                                <EmptyDescription>
                                    This attendance session
                                    was closed without
                                    any recorded
                                    check-ins.
                                </EmptyDescription>
                            </EmptyState>
                        )}
                    </RecentSection>
                </Main>
            </Container>
        );
    }

    // =====================================
    // LIVE SERVICE — ATTENDANCE OPEN
    // =====================================

    return (
        <Container>
            <Header>
                <HeaderContent>
                    <Eyebrow>
                        Live attendance
                    </Eyebrow>

                    <TitleRow>
                        <Title>
                            {serviceTitle}
                        </Title>

                        <Status
                            $type="live"
                        >
                            <StatusDot>
                                <FaCircle />
                            </StatusDot>

                            <StatusText>
                                Attendance open
                            </StatusText>
                        </Status>
                    </TitleRow>

                    {serviceDate && (
                        <ServiceMeta>
                            <ServiceDate>
                                {formatDate(
                                    serviceDate,
                                )}
                            </ServiceDate>

                            <LiveBadge>
                                <FaCircle />
                                Attendance is live
                            </LiveBadge>
                        </ServiceMeta>
                    )}
                </HeaderContent>

                {onScan && (
                    <ScanAction
                        type="button"
                        onClick={onScan}
                        aria-label="Scan member attendance"
                    >
                        <FaQrcode />

                        <span>
                            Scan attendance
                        </span>
                    </ScanAction>
                )}
            </Header>

            {/* =================================
                LIVE STATS
            ================================== */}

            <Stats>
                <Stat>
                    <StatIcon>
                        <FaUserCheck />
                    </StatIcon>

                    <StatContent>
                        <StatLabel>
                            Checked in
                        </StatLabel>

                        <StatValue>
                            {checkedIn.toLocaleString()}
                        </StatValue>

                        <StatSubtext>
                            Members present
                        </StatSubtext>
                    </StatContent>
                </Stat>

                <Stat>
                    <StatIcon>
                        <FaUsers />
                    </StatIcon>

                    <StatContent>
                        <StatLabel>
                            Expected
                        </StatLabel>

                        <StatValue>
                            {expected.toLocaleString()}
                        </StatValue>

                        <StatSubtext>
                            Expected members
                        </StatSubtext>
                    </StatContent>
                </Stat>

                <Stat>
                    <StatIcon>
                        <FaPercentage />
                    </StatIcon>

                    <StatContent>
                        <StatLabel>
                            Attendance rate
                        </StatLabel>

                        <StatValue>
                            {attendanceRate}%
                        </StatValue>

                        <StatSubtext>
                            Current service
                        </StatSubtext>
                    </StatContent>
                </Stat>
            </Stats>

            {/* =================================
                RECENT CHECK-INS
            ================================== */}

            <Main>
                <RecentSection>
                    <SectionHeader>
                        <div>
                            <SectionTitle>
                                Recent check-ins
                            </SectionTitle>

                            <SectionDescription>
                                Latest attendance
                                activity for this
                                service.
                            </SectionDescription>
                        </div>
                    </SectionHeader>

                    {recentAttendance.length > 0 ? (
                        <CheckInList>
                            {recentAttendance.map(
                                (
                                    record,
                                    index,
                                ) => {
                                    const name =
                                        getMemberName(
                                            record,
                                        );

                                    return (
                                        <CheckInRow
                                            key={
                                                record._id ||
                                                index
                                            }
                                        >
                                            <Member>
                                                <MemberAvatar>
                                                    {getInitials(
                                                        name,
                                                    )}
                                                </MemberAvatar>

                                                <MemberInfo>
                                                    <MemberName>
                                                        {name}
                                                    </MemberName>

                                                    <MemberMeta>
                                                        {record
                                                            .memberId
                                                            ?.membershipStatus ||
                                                            record
                                                                .member
                                                                ?.membershipStatus ||
                                                            "Member"}
                                                    </MemberMeta>
                                                </MemberInfo>
                                            </Member>

                                            <CheckInDetails>
                                                <CheckInMethod>
                                                    {getMethodLabel(
                                                        record.checkInMethod,
                                                    )}
                                                </CheckInMethod>

                                                <CheckInTime>
                                                    <FaClock />

                                                    {formatTime(
                                                        record.checkedInAt,
                                                    )}
                                                </CheckInTime>
                                            </CheckInDetails>
                                        </CheckInRow>
                                    );
                                },
                            )}
                        </CheckInList>
                    ) : (
                        <EmptyState>
                            <EmptyIcon>
                                <FaUserCheck />
                            </EmptyIcon>

                            <EmptyTitle>
                                No check-ins yet
                            </EmptyTitle>

                            <EmptyDescription>
                                Attendance activity
                                will appear here as
                                members check in.
                            </EmptyDescription>
                        </EmptyState>
                    )}
                </RecentSection>
            </Main>
        </Container>
    );
};

export default LiveAttendance;
