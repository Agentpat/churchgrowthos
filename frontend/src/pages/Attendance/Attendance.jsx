
import {
    useCallback,
    useState,
} from "react";

import Loader from "../../components/ui/Loader/Loader";

import AttendanceHeader from "./components/AttendanceHeader";
import LiveAttendance from "./components/LiveAttendance/LiveAttendance";
import AttendanceFilters from "./components/AttendanceFilters";
import AttendanceTable from "./components/AttendanceTable";
import AttendanceProfile from "./components/AttendanceProfile";
import TakeAttendanceModal from "./components/TakeAttendanceModal";
import EditAttendanceModal from "./components/EditAttendanceModal";

import AttendanceScanner from "./components/LiveAttendance/AttendanceScanner/AttendanceScanner";

import attendanceService from "../../services/attendanceService";

import useAttendance from "./hooks/useAttendance";
import useAttendanceFilters from "./hooks/useAttendanceFilter";

import {
    MembersContainer as AttendanceContainer,
    Content,
    ErrorBox,
} from "../Members/Members.styles";

import {
    AttendanceTabs,
    AttendanceTab,
} from "./Attendance.styles";

const Attendance = () => {
    // =====================================
    // Attendance Data
    // =====================================

    const {
        attendance,
        services,
        members,

        // General active service record
        activeService,

        // Actual currently LIVE service
        liveService,

        // Next scheduled service
        nextService,

        // Attendance session
        attendanceSession,
        attendanceSessionStatus,

        // Attendance permissions
        canOpenAttendance,
        canTakeAttendance,
        canScanAttendance,

        // Session actions
        openAttendanceSession,

        loading,
        sessionLoading,
        error,

        reload,
        reloadAttendanceSession,
        recordBulkAttendance,
    } = useAttendance();

    // =====================================
    // Active Workspace Tab
    // =====================================

    const [
        activeTab,
        setActiveTab,
    ] = useState("live");

    // =====================================
    // Selected Attendance
    // =====================================

    const [
        selectedAttendance,
        setSelectedAttendance,
    ] = useState(null);

    // =====================================
    // Take Attendance Modal
    // =====================================

    const [
        showTakeAttendance,
        setShowTakeAttendance,
    ] = useState(false);

    // =====================================
    // Attendance Scanner
    // =====================================

    const [
        scannerOpen,
        setScannerOpen,
    ] = useState(false);

    // =====================================
    // QR Scan State
    // =====================================

    const [
        scannedMember,
        setScannedMember,
    ] = useState(null);

    const [
        scanError,
        setScanError,
    ] = useState("");

    const [
        isCheckingIn,
        setIsCheckingIn,
    ] = useState(false);

    const [
        checkInSuccess,
        setCheckInSuccess,
    ] = useState(false);

    // =====================================
    // Edit Attendance
    // =====================================

    const [
        editingAttendance,
        setEditingAttendance,
    ] = useState(null);

    // =====================================
    // Filters
    // =====================================

    const [
        filters,
        setFilters,
    ] = useState({
        search: "",
        service: "",
        status: "",
        date: "",
    });

    // =====================================
    // Action Loading
    // =====================================

    const [
        openingAttendance,
        setOpeningAttendance,
    ] = useState(false);

    // =====================================
    // Filter Attendance
    // =====================================

    const filteredAttendance =
        useAttendanceFilters(
            attendance,
            filters,
        );

    // =====================================
    // Open Attendance Session
    // =====================================

    const handleOpenAttendance =
        useCallback(async () => {
            if (!liveService) {
                alert(
                    "Attendance can only be opened while a service is live.",
                );

                return;
            }

            if (!canOpenAttendance) {
                return;
            }

            try {
                setOpeningAttendance(true);

                await openAttendanceSession();

                await reloadAttendanceSession();

                await reload();
            } catch (error) {
                console.error(
                    "FAILED TO OPEN ATTENDANCE:",
                    error,
                );

                alert(
                    error.response?.data?.message ||
                    error.message ||
                    "Unable to open attendance.",
                );
            } finally {
                setOpeningAttendance(false);
            }
        }, [
            liveService,
            canOpenAttendance,
            openAttendanceSession,
            reloadAttendanceSession,
            reload,
        ]);

    // =====================================
    // Open Take Attendance
    // =====================================

    const handleOpenTakeAttendance =
        useCallback(() => {
            if (!liveService) {
                alert(
                    "Attendance can only be taken while a service is live.",
                );

                return;
            }

            if (!canTakeAttendance) {
                alert(
                    "Open attendance before taking attendance.",
                );

                return;
            }

            setShowTakeAttendance(true);
        }, [
            liveService,
            canTakeAttendance,
        ]);

    // =====================================
    // Take Attendance
    // =====================================

    const handleTakeAttendance =
        useCallback(
            async (payload) => {
                try {
                    if (!liveService) {
                        alert(
                            "Attendance can only be taken while a service is live.",
                        );

                        return;
                    }

                    if (!canTakeAttendance) {
                        alert(
                            "Open attendance before recording attendance.",
                        );

                        return;
                    }

                    await recordBulkAttendance(
                        payload,
                    );

                    setShowTakeAttendance(
                        false,
                    );

                    await reload();

                    await reloadAttendanceSession();
                } catch (error) {
                    console.error(
                        "FAILED TO RECORD ATTENDANCE:",
                        error,
                    );

                    alert(
                        error.response?.data?.message ||
                        error.message ||
                        "Unable to record attendance.",
                    );
                }
            },
            [
                liveService,
                canTakeAttendance,
                recordBulkAttendance,
                reload,
                reloadAttendanceSession,
            ],
        );

    // =====================================
    // Scan Attendance
    // =====================================

    const handleScanAttendance =
        useCallback(() => {
            if (!liveService) {
                alert(
                    "Attendance can only be scanned while a service is live.",
                );

                return;
            }

            if (!canScanAttendance) {
                alert(
                    "Open attendance before scanning.",
                );

                return;
            }

            // Reset previous scan state.
            setScannedMember(null);
            setScanError("");
            setCheckInSuccess(false);
            setIsCheckingIn(false);

            setScannerOpen(true);
        }, [
            liveService,
            canScanAttendance,
        ]);

    // =====================================
    // QR Scan Result
    // =====================================
    //
    // QR contains only the member MongoDB ID.
    //
    // We first resolve the ID against the
    // currently loaded church members.
    //
    // No attendance is recorded at this point.
    // =====================================

    const handleQrScan =
        useCallback(
            (decodedValue) => {
                const memberId =
                    decodedValue?.trim();

                if (!memberId) {
                    setScanError(
                        "This QR code does not contain a valid member ID.",
                    );

                    return;
                }

                const member =
                    members.find(
                        (item) =>
                            String(
                                item._id,
                            ) === memberId,
                    );

                if (!member) {
                    setScanError(
                        "This QR code does not belong to a member in this church.",
                    );

                    return;
                }

                if (!member.isActive) {
                    setScanError(
                        "This member is currently inactive.",
                    );

                    return;
                }

                // Member is valid.
                setScanError("");
                setCheckInSuccess(false);
                setScannedMember(member);
            },
            [members],
        );

    // =====================================
    // Confirm QR Check-In
    // =====================================
    //
    // Backend remains the final authority.
    //
    // It validates:
    //
    // - Church
    // - Service
    // - Service LIVE
    // - Attendance session OPEN
    // - Member ACTIVE
    // - Duplicate attendance
    //
    // Attendance is recorded as QR_CODE.
    // =====================================

    const handleConfirmQrCheckIn =
        useCallback(async () => {
            if (
                !scannedMember ||
                !liveService
            ) {
                return;
            }

            if (!canScanAttendance) {
                setScanError(
                    "Attendance is no longer open for scanning.",
                );

                return;
            }

            if (isCheckingIn) {
                return;
            }

            try {
                setIsCheckingIn(true);
                setScanError("");
                setCheckInSuccess(false);

                const result =
                    await attendanceService.checkInMember(
                        {
                            serviceId:
                                liveService._id,

                            memberId:
                                scannedMember._id,

                            status: "PRESENT",

                            checkInMethod:
                                "QR_CODE",
                        },
                    );

                console.log(
                    "QR CHECK-IN RESPONSE:",
                    result,
                );

                // =================================
                // DUPLICATE CHECK-IN
                // =================================

                if (
                    result?.alreadyCheckedIn ||
                    result?.data
                        ?.alreadyCheckedIn
                ) {
                    setScanError(
                        "This member has already been checked in for this service.",
                    );

                    return;
                }

                // =================================
                // SUCCESS
                // =================================

                setCheckInSuccess(true);

                // Refresh the attendance data in
                // the background while the success
                // state remains visible.
                await Promise.all([
                    reload(),
                    reloadAttendanceSession(),
                ]);
            } catch (error) {
                console.error(
                    "QR CHECK-IN FAILED:",
                    error,
                );

                const message =
                    error.response
                        ?.data?.message ||
                    error.message ||
                    "Unable to record attendance. Please try again.";

                setScanError(message);
            } finally {
                setIsCheckingIn(false);
            }
        }, [
            scannedMember,
            liveService,
            canScanAttendance,
            isCheckingIn,
            reload,
            reloadAttendanceSession,
        ]);

    // =====================================
    // Reset QR Scan
    // =====================================

    const handleResetQrScan =
        useCallback(() => {
            setScannedMember(null);
            setScanError("");
            setCheckInSuccess(false);
            setIsCheckingIn(false);
        }, []);

    // =====================================
    // Close QR Scanner
    // =====================================

    const handleCloseScanner =
        useCallback(() => {
            setScannerOpen(false);
            setScannedMember(null);
            setScanError("");
            setCheckInSuccess(false);
            setIsCheckingIn(false);
        }, []);

    // =====================================
    // Loading
    // =====================================

    if (loading) {
        return (
            <Loader
                text="Loading attendance..."
            />
        );
    }

    // =====================================
    // Error
    // =====================================

    if (error) {
        return (
            <ErrorBox>
                {error}
            </ErrorBox>
        );
    }

    // =====================================
    // Render
    // =====================================

    return (
        <AttendanceContainer>
            {/* =================================
                MAIN ATTENDANCE HEADER
            ================================== */}

            <AttendanceHeader
                services={services}
                activeService={activeService}
                liveService={liveService}
                nextService={nextService}
                attendanceSession={
                    attendanceSession
                }
                attendanceSessionStatus={
                    attendanceSessionStatus
                }
                canOpenAttendance={
                    canOpenAttendance &&
                    !openingAttendance &&
                    !sessionLoading
                }
                canTakeAttendance={
                    canTakeAttendance
                }
                canScanAttendance={
                    canScanAttendance
                }
                onOpenAttendance={
                    handleOpenAttendance
                }
                onTakeAttendance={
                    handleOpenTakeAttendance
                }
                onScanAttendance={
                    handleScanAttendance
                }
            />

            <Content>
                {/* =================================
                    ATTENDANCE WORKSPACE TABS
                ================================== */}

                <AttendanceTabs>
                    <AttendanceTab
                        type="button"
                        $active={
                            activeTab ===
                            "live"
                        }
                        onClick={() =>
                            setActiveTab(
                                "live",
                            )
                        }
                    >
                        Live Attendance
                    </AttendanceTab>

                    <AttendanceTab
                        type="button"
                        $active={
                            activeTab ===
                            "records"
                        }
                        onClick={() =>
                            setActiveTab(
                                "records",
                            )
                        }
                    >
                        Attendance Records
                    </AttendanceTab>
                </AttendanceTabs>

                {/* =================================
                    LIVE ATTENDANCE
                ================================== */}

                {activeTab === "live" && (
                    <LiveAttendance
                        service={
                            liveService
                        }
                        session={
                            attendanceSession
                        }
                        expectedMembers={
                            members?.length ||
                            0
                        }
                        attendance={
                            attendance
                        }
                        nextService={
                            nextService
                        }
                        onScan={
                            handleScanAttendance
                        }
                    />
                )}

                {/* =================================
                    ATTENDANCE RECORDS
                ================================== */}

                {activeTab ===
                    "records" && (
                    <>
                        <AttendanceFilters
                            filters={
                                filters
                            }
                            setFilters={
                                setFilters
                            }
                            services={
                                services
                            }
                        />

                        <AttendanceTable
                            attendance={
                                filteredAttendance
                            }
                            onView={
                                setSelectedAttendance
                            }
                        />
                    </>
                )}
            </Content>

            {/* =================================
                ATTENDANCE PROFILE
            ================================== */}

            {selectedAttendance && (
                <AttendanceProfile
                    attendance={
                        selectedAttendance
                    }
                    onClose={() =>
                        setSelectedAttendance(
                            null,
                        )
                    }
                    onEdit={(attendance) => {
                        setSelectedAttendance(
                            null,
                        );

                        requestAnimationFrame(
                            () => {
                                setEditingAttendance(
                                    attendance,
                                );
                            },
                        );
                    }}
                />
            )}

            {/* =================================
                TAKE ATTENDANCE
            ================================== */}

            <TakeAttendanceModal
                isOpen={
                    showTakeAttendance &&
                    Boolean(
                        liveService,
                    ) &&
                    canTakeAttendance
                }
                onClose={() =>
                    setShowTakeAttendance(
                        false,
                    )
                }
                services={services}
                members={members}
                defaultServiceId={
                    liveService?._id
                }
                onSubmit={
                    handleTakeAttendance
                }
            />

            {/* =================================
                QR ATTENDANCE SCANNER
            ================================== */}

            <AttendanceScanner
                isOpen={
                    scannerOpen &&
                    Boolean(
                        liveService,
                    ) &&
                    canScanAttendance
                }
                onClose={
                    handleCloseScanner
                }
                onScan={
                    handleQrScan
                }
                scannedMember={
                    scannedMember
                }
                scanError={
                    scanError
                }
                isCheckingIn={
                    isCheckingIn
                }
                checkInSuccess={
                    checkInSuccess
                }
                onConfirm={
                    handleConfirmQrCheckIn
                }
                onReset={
                    handleResetQrScan
                }
            />

            {/* =================================
                EDIT ATTENDANCE
            ================================== */}

            <EditAttendanceModal
                isOpen={Boolean(
                    editingAttendance,
                )}
                attendance={
                    editingAttendance
                }
                onClose={() =>
                    setEditingAttendance(
                        null,
                    )
                }
                onSuccess={async () => {
                    setEditingAttendance(
                        null,
                    );

                    await reload();
                }}
            />
        </AttendanceContainer>
    );
};

export default Attendance;
