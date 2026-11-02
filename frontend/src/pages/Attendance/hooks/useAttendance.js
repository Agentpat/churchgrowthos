
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import attendanceService from "../../../services/attendanceService";
import serviceService from "../../../services/serviceService";
import memberService from "../../../services/memberService";

const useAttendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [services, setServices] = useState([]);
  const [members, setMembers] = useState([]);

  const [attendanceSession, setAttendanceSession] =
    useState(null);

  const [loading, setLoading] = useState(true);
  const [sessionLoading, setSessionLoading] =
    useState(false);
  const [error, setError] = useState("");

  // =====================================
  // Load Attendance Data
  // =====================================

  const loadAttendance = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const [
        attendanceResponse,
        servicesResponse,
        membersResponse,
      ] = await Promise.all([
        attendanceService.getAttendance(),
        serviceService.getServices(),
        memberService.getMembers(),
      ]);

      // =====================================
      // Normalize Attendance
      // =====================================

      const attendanceData =
        attendanceResponse?.data?.attendance ||
        attendanceResponse?.data?.records ||
        attendanceResponse?.attendance ||
        attendanceResponse?.records ||
        (Array.isArray(attendanceResponse?.data)
          ? attendanceResponse.data
          : []);

      // =====================================
      // Normalize Services
      // =====================================

      const servicesData =
        servicesResponse?.data?.services ||
        servicesResponse?.services ||
        (Array.isArray(servicesResponse?.data)
          ? servicesResponse.data
          : []);

      // =====================================
      // Normalize Members
      // =====================================

      const membersData =
        membersResponse?.data?.members ||
        membersResponse?.members ||
        (Array.isArray(membersResponse?.data)
          ? membersResponse.data
          : []);

      setAttendance(
        Array.isArray(attendanceData)
          ? attendanceData
          : [],
      );

      setServices(
        Array.isArray(servicesData)
          ? servicesData
          : [],
      );

      setMembers(
        Array.isArray(membersData)
          ? membersData
          : [],
      );
    } catch (err) {
      console.error(
        "FAILED TO LOAD ATTENDANCE DATA:",
        err,
      );

      setError(
        err.response?.data?.message ||
          "Unable to load attendance.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // =====================================
  // Active Service
  // =====================================
  //
  // "Active" only means the service record
  // is enabled in the system.
  //
  // It does NOT mean the service is live
  // or that attendance is open.
  // =====================================

  const activeService = useMemo(() => {
    return (
      services.find(
        (service) => service.isActive,
      ) || null
    );
  }, [services]);

  // =====================================
  // Live Service
  // =====================================
  //
  // Service.status === "LIVE" means the
  // service is currently happening.
  //
  // It does NOT automatically mean attendance
  // has been opened.
  // =====================================

  const liveService = useMemo(() => {
    return (
      services.find(
        (service) =>
          service.status === "LIVE",
      ) || null
    );
  }, [services]);

  // =====================================
  // Get Service Start Date/Time
  // =====================================

  const getServiceStart = useCallback(
    (service) => {
      if (!service?.serviceDate) {
        return null;
      }

      const date = new Date(
        service.serviceDate,
      );

      if (Number.isNaN(date.getTime())) {
        return null;
      }

      if (service.startTime) {
        const [hours, minutes] =
          service.startTime
            .split(":")
            .map(Number);

        if (
          !Number.isNaN(hours) &&
          !Number.isNaN(minutes)
        ) {
          date.setHours(
            hours,
            minutes,
            0,
            0,
          );
        }
      }

      return date;
    },
    [],
  );

  // =====================================
  // Next Scheduled Service
  // =====================================
  //
  // Scheduled services are display-only.
  //
  // They cannot open attendance.
  // =====================================

  const nextService = useMemo(() => {
    const now = new Date();

    return (
      services
        .filter(
          (service) =>
            service.status ===
            "SCHEDULED",
        )
        .map((service) => ({
          service,
          start: getServiceStart(
            service,
          ),
        }))
        .filter(
          ({ start }) =>
            start &&
            start >= now,
        )
        .sort(
          (a, b) =>
            a.start - b.start,
        )
        .map(
          ({ service }) =>
            service,
        )[0] || null
    );
  }, [services, getServiceStart]);

  // =====================================
  // Service Live State
  // =====================================

  const isLive =
    Boolean(liveService);

  // =====================================
  // Service Status
  // =====================================

  const serviceStatus =
    liveService?.status ||
    "NOT_STARTED";

  // =====================================
  // Load Attendance Session
  // =====================================
  //
  // Only the current LIVE service needs
  // an attendance session loaded.
  //
  // A scheduled service should not create
  // or open an attendance session simply
  // because it exists.
  // =====================================

  const loadAttendanceSession =
    useCallback(async () => {
      if (!liveService?._id) {
        setAttendanceSession(null);
        return null;
      }

      try {
        setSessionLoading(true);

        const response =
          await attendanceService.getAttendanceSession(
            liveService._id,
          );

        const session =
          response?.data ||
          response?.session ||
          null;

        setAttendanceSession(session);

        return session;
      } catch (err) {
        console.error(
          "FAILED TO LOAD ATTENDANCE SESSION:",
          err,
        );

        setAttendanceSession(null);

        return null;
      } finally {
        setSessionLoading(false);
      }
    }, [liveService?._id]);

  // =====================================
  // Attendance Session State
  // =====================================
  //
  // Service lifecycle:
  //
  // SCHEDULED
  //    ↓
  // LIVE
  //
  // Attendance lifecycle:
  //
  // NOT_STARTED
  //    ↓
  // OPEN
  //    ↓
  // CLOSED
  //    ↓
  // FINALIZED
  //
  // Attendance can only actually be taken
  // when BOTH are true:
  //
  // service.status === LIVE
  // session.status === OPEN
  // =====================================

  const attendanceSessionStatus =
    attendanceSession?.status ||
    "NOT_STARTED";

  const isAttendanceOpen =
    isLive &&
    attendanceSessionStatus ===
      "OPEN";

  const canOpenAttendance =
    isLive &&
    attendanceSessionStatus ===
      "NOT_STARTED";

  const canTakeAttendance =
    isAttendanceOpen;

  const canScanAttendance =
    isAttendanceOpen;

  // =====================================
  // Open Attendance Session
  // =====================================

  const openAttendanceSession =
    useCallback(async () => {
      if (!liveService?._id) {
        throw new Error(
          "There is no live service.",
        );
      }

      if (!canOpenAttendance) {
        throw new Error(
          "Attendance cannot be opened for this service.",
        );
      }

      const response =
        await attendanceService.openAttendanceSession(
          liveService._id,
        );

      const session =
        response?.data ||
        response?.session ||
        null;

      setAttendanceSession(session);

      return session;
    }, [
      liveService?._id,
      canOpenAttendance,
    ]);

  // =====================================
  // Close Attendance Session
  // =====================================

  const closeAttendanceSession =
    useCallback(async () => {
      if (!liveService?._id) {
        throw new Error(
          "There is no live service.",
        );
      }

      const response =
        await attendanceService.closeAttendanceSession(
          liveService._id,
        );

      const session =
        response?.data ||
        response?.session ||
        null;

      setAttendanceSession(session);

      return session;
    }, [liveService?._id]);

  // =====================================
  // Finalize Attendance Session
  // =====================================

  const finalizeAttendanceSession =
    useCallback(async () => {
      if (!liveService?._id) {
        throw new Error(
          "There is no live service.",
        );
      }

      const response =
        await attendanceService.finalizeAttendanceSession(
          liveService._id,
        );

      const session =
        response?.data ||
        response?.session ||
        null;

      setAttendanceSession(session);

      return session;
    }, [liveService?._id]);

  // =====================================
  // Record Bulk Attendance
  // =====================================

  const recordBulkAttendance =
    useCallback(
      async (payload) => {
        const response =
          await attendanceService.recordBulkAttendance(
            payload,
          );

        return response;
      },
      [],
    );

  // =====================================
  // Load Attendance Session When
  // A Live Service Exists
  // =====================================

  useEffect(() => {
    if (!liveService?._id) {
      setAttendanceSession(null);
      return;
    }

    loadAttendanceSession();
  }, [
    liveService?._id,
    loadAttendanceSession,
  ]);

  // =====================================
  // Initial Load
  // =====================================

  useEffect(() => {
    loadAttendance();
  }, [loadAttendance]);

  // =====================================
  // Return
  // =====================================

  return {
    attendance,

    services,

    members,

    // -------------------------------------
    // General active service record
    // -------------------------------------

    activeService,

    // -------------------------------------
    // Service currently happening
    // -------------------------------------

    liveService,

    // -------------------------------------
    // Next future scheduled service
    // -------------------------------------

    nextService,

    // -------------------------------------
    // Service live convenience flag
    // -------------------------------------

    isLive,

    // -------------------------------------
    // Current service status
    // -------------------------------------

    serviceStatus,

    // -------------------------------------
    // Attendance session
    // -------------------------------------

    attendanceSession,

    attendanceSessionStatus,

    // -------------------------------------
    // Attendance state
    // -------------------------------------

    isAttendanceOpen,

    canOpenAttendance,

    canTakeAttendance,

    canScanAttendance,

    // -------------------------------------
    // Session actions
    // -------------------------------------

    openAttendanceSession,

    closeAttendanceSession,

    finalizeAttendanceSession,

    // -------------------------------------
    // Loading / error
    // -------------------------------------

    loading,

    sessionLoading,

    error,

    // -------------------------------------
    // Reload
    // -------------------------------------

    reload: loadAttendance,

    reloadAttendanceSession:
      loadAttendanceSession,

    // -------------------------------------
    // Attendance actions
    // -------------------------------------

    recordBulkAttendance,
  };
};

export default useAttendance;