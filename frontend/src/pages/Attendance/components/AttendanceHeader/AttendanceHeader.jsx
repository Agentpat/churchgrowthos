
import {
    FaQrcode,
    FaClipboardCheck,
    FaCircle,
    FaPlay,
} from "react-icons/fa";

import Button from "../../../../components/ui/Button/Button";

import {
    Header,
    HeaderMain,
    Eyebrow,
    TitleRow,
    Title,
    Description,
    ServiceRow,
    ServiceInfo,
    ServiceLabel,
    ServiceTitle,
    Status,
    StatusDot,
    StatusText,
    Actions,
    PrimaryAction,
    SecondaryAction,
} from "./AttendanceHeader.styles";

const AttendanceHeader = ({
    services = [],
    activeService = null,
    liveService = null,
    nextService = null,

    attendanceSession = null,
    attendanceSessionStatus = "NOT_STARTED",

    canOpenAttendance = false,
    canTakeAttendance = false,
    canScanAttendance = false,

    onOpenAttendance,
    onScanAttendance,
    onTakeAttendance,
}) => {
    // =====================================
    // Determine Service Context
    // =====================================
    //
    // LIVE always has priority.
    //
    // If there is no LIVE service, show the
    // next scheduled service for context.
    //
    // Scheduled services remain display-only.
    // =====================================

    const currentService =
        liveService ||
        nextService ||
        null;

    // =====================================
    // Service Status
    // =====================================

    const serviceStatus =
        liveService?.status ||
        nextService?.status ||
        "NOT_STARTED";

    // =====================================
    // Attendance Session Status
    // =====================================

    const sessionStatus =
        liveService
            ? attendanceSession?.status ||
              attendanceSessionStatus ||
              "NOT_STARTED"
            : "NOT_STARTED";

    // =====================================
    // Status Configuration
    // =====================================

    const statusConfig = {
        SCHEDULED: {
            label: "Scheduled",
            type: "neutral",
        },

        LIVE: {
            label: "Live",
            type: "success",
        },

        COMPLETED: {
            label: "Completed",
            type: "muted",
        },

        CANCELLED: {
            label: "Cancelled",
            type: "warning",
        },

        NOT_STARTED: {
            label: "Not started",
            type: "neutral",
        },
    };

    const currentStatus =
        statusConfig[serviceStatus] ||
        statusConfig.NOT_STARTED;

    // =====================================
    // Date
    // =====================================

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
                },
            ).format(
                new Date(date),
            );
        } catch {
            return "";
        }
    };

    // =====================================
    // Service State
    // =====================================

    const isLive =
        serviceStatus === "LIVE";

    // =====================================
    // Attendance State
    // =====================================

    const isAttendanceNotStarted =
        isLive &&
        sessionStatus ===
            "NOT_STARTED";

    const isAttendanceOpen =
        isLive &&
        sessionStatus ===
            "OPEN";

    const isAttendanceClosed =
        isLive &&
        (
            sessionStatus ===
                "CLOSED" ||
            sessionStatus ===
                "FINALIZED"
        );

    // =====================================
    // Service Label
    // =====================================

    const serviceLabel = isLive
        ? "Current service"
        : currentService
            ? "Next service"
            : "Service";

    // =====================================
    // Final Action Permissions
    // =====================================
    //
    // SCHEDULED:
    // - Open: disabled
    // - Take: disabled
    // - Scan: disabled
    //
    // LIVE + NOT_STARTED:
    // - Open: enabled
    // - Take: disabled
    // - Scan: disabled
    //
    // LIVE + OPEN:
    // - Open: disabled
    // - Take: enabled
    // - Scan: enabled
    //
    // CLOSED / FINALIZED:
    // - Everything disabled
    // =====================================

    const openAttendanceEnabled =
        isAttendanceNotStarted &&
        canOpenAttendance;

    const takeAttendanceEnabled =
        isAttendanceOpen &&
        canTakeAttendance;

    const scanEnabled =
        isAttendanceOpen &&
        canScanAttendance;

    // =====================================
    // Primary Action
    // =====================================
    //
    // Before attendance is opened, the
    // primary action is "Open attendance".
    //
    // Once attendance is open, the primary
    // action becomes "Scan".
    // =====================================

    const showOpenAttendance =
        openAttendanceEnabled;

    const showScan =
        scanEnabled;

    // =====================================
    // Secondary Action
    // =====================================

    const showTakeAttendance =
        takeAttendanceEnabled;

    return (
        <Header>
            {/* =================================
                Main Information
            ================================== */}

            <HeaderMain>
                <Eyebrow>
                    Attendance
                </Eyebrow>

                <TitleRow>
                    <Title>
                        Attendance
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

                <Description>
                    Monitor service attendance
                    and manage member check-ins.
                </Description>

                {/* =================================
                    Service Context
                ================================== */}

                {currentService ? (
                    <ServiceRow>
                        <ServiceInfo>
                            <ServiceLabel>
                                {
                                    serviceLabel
                                }
                            </ServiceLabel>

                            <ServiceTitle>
                                {
                                    currentService.title ||
                                    currentService.name ||
                                    "Church Service"
                                }

                                {currentService.serviceDate && (
                                    <span>
                                        {" · "}
                                        {
                                            formatDate(
                                                currentService.serviceDate,
                                            )
                                        }
                                    </span>
                                )}
                            </ServiceTitle>
                        </ServiceInfo>
                    </ServiceRow>
                ) : (
                    <ServiceRow>
                        <ServiceInfo>
                            <ServiceLabel>
                                Service
                            </ServiceLabel>

                            <ServiceTitle>
                                No active service
                            </ServiceTitle>
                        </ServiceInfo>
                    </ServiceRow>
                )}
            </HeaderMain>

            {/* =================================
                Actions
            ================================== */}

            <Actions>
                {/* =================================
                    Primary Action
                ================================== */}

                <PrimaryAction>
                    {showOpenAttendance ? (
                        <Button
                            onClick={
                                onOpenAttendance
                            }
                            disabled={
                                !openAttendanceEnabled
                            }
                        >
                            <FaPlay />

                            <span>
                                Open attendance
                            </span>
                        </Button>
                    ) : (
                        <Button
                            onClick={
                                onScanAttendance
                            }
                            disabled={
                                !showScan
                            }
                        >
                            <FaQrcode />

                            <span>
                                Scan
                            </span>
                        </Button>
                    )}
                </PrimaryAction>

                {/* =================================
                    Secondary Action
                ================================== */}

                <SecondaryAction>
                    <Button
                        onClick={
                            onTakeAttendance
                        }
                        disabled={
                            !showTakeAttendance
                        }
                    >
                        <FaClipboardCheck />

                        <span>
                            Take attendance
                        </span>
                    </Button>
                </SecondaryAction>
            </Actions>
        </Header>
    );
};

export default AttendanceHeader;