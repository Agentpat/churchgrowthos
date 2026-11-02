import api from "../utils/api";

const attendanceService = {
  // =================================================
  // CHECK IN MEMBER
  // =================================================

  checkInMember: async (attendanceData) => {
    const response = await api.post(
      "/attendance/check-in",
      attendanceData,
    );

    return response.data;
  },

  // =================================================
  // RECORD SINGLE ATTENDANCE
  // =================================================

  recordAttendance: async (attendanceData) => {
    const response = await api.post(
      "/attendance",
      attendanceData,
    );

    return response.data;
  },

  // =================================================
  // RECORD BULK ATTENDANCE
  // =================================================

  recordBulkAttendance: async (attendanceData) => {
    const response = await api.post(
      "/attendance/bulk",
      attendanceData,
    );

    return response.data;
  },

  // =================================================
  // GET LIVE ATTENDANCE
  // =================================================

  getLiveAttendance: async (serviceId) => {
    const response = await api.get(
      `/attendance/live/${serviceId}`,
    );

    return response.data;
  },

  // =================================================
  // GET ALL ATTENDANCE
  // =================================================

  getAttendance: async (params = {}) => {
    const response = await api.get(
      "/attendance",
      {
        params,
      },
    );

    return response.data;
  },

  // =================================================
  // GET ATTENDANCE BY SERVICE
  // =================================================

  getAttendanceByService: async (serviceId) => {
    const response = await api.get(
      `/attendance/service/${serviceId}`,
    );

    return response.data;
  },

  // =================================================
  // GET ATTENDANCE BY MEMBER
  // =================================================

  getAttendanceByMember: async (memberId) => {
    const response = await api.get(
      `/attendance/member/${memberId}`,
    );

    return response.data;
  },

  // =================================================
  // UPDATE ATTENDANCE
  // =================================================

  updateAttendance: async (
    attendanceId,
    data,
  ) => {
    const response = await api.put(
      `/attendance/${attendanceId}`,
      data,
    );

    return response.data;
  },

  // =================================================
  // DELETE ATTENDANCE
  // =================================================

  deleteAttendance: async (attendanceId) => {
    const response = await api.delete(
      `/attendance/${attendanceId}`,
    );

    return response.data;
  },

  // =================================================
  // ATTENDANCE SESSION
  // =================================================

  // -------------------------------------------------
  // Get Attendance Session
  // GET /api/attendance/sessions/:serviceId
  // -------------------------------------------------

  getAttendanceSession: async (serviceId) => {
    const response = await api.get(
      `/attendance/sessions/${serviceId}`,
    );

    return response.data;
  },

  // -------------------------------------------------
  // Open Attendance Session
  // POST /api/attendance/sessions/:serviceId/open
  // -------------------------------------------------

  openAttendanceSession: async (serviceId) => {
    const response = await api.post(
      `/attendance/sessions/${serviceId}/open`,
    );

    return response.data;
  },

  // -------------------------------------------------
  // Close Attendance Session
  // POST /api/attendance/sessions/:serviceId/close
  // -------------------------------------------------

  closeAttendanceSession: async (serviceId) => {
    const response = await api.post(
      `/attendance/sessions/${serviceId}/close`,
    );

    return response.data;
  },

  // -------------------------------------------------
  // Finalize Attendance Session
  // POST /api/attendance/sessions/:serviceId/finalize
  // -------------------------------------------------

  finalizeAttendanceSession: async (serviceId) => {
    const response = await api.post(
      `/attendance/sessions/${serviceId}/finalize`,
    );

    return response.data;
  },
};

export default attendanceService;