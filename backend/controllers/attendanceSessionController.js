import attendanceSessionService from "../services/attendanceSessionService.js";

import asyncHandler from "../utils/asyncHandler.js";

// =====================================
// Get / Create Attendance Session
// GET /api/attendance/sessions/:serviceId
// =====================================

const getAttendanceSession = asyncHandler(async (req, res) => {
  const session = await attendanceSessionService.getOrCreateSession(
    req.user.churchId,
    req.params.serviceId,
  );

  res.status(200).json({
    success: true,
    data: session,
  });
});

// =====================================
// Open Attendance
// POST /api/attendance/sessions/:serviceId/open
// =====================================

const openAttendanceSession = asyncHandler(async (req, res) => {
  const session = await attendanceSessionService.openSession(
    req.user.churchId,
    req.params.serviceId,
    req.user.userId,
  );

  res.status(200).json({
    success: true,

    message: "Attendance session opened successfully.",

    data: session,
  });
});

// =====================================
// Close Attendance
// POST /api/attendance/sessions/:serviceId/close
// =====================================

const closeAttendanceSession = asyncHandler(async (req, res) => {
  const session = await attendanceSessionService.closeSession(
    req.user.churchId,
    req.params.serviceId,
    req.user.userId,
  );

  res.status(200).json({
    success: true,

    message: "Attendance session closed successfully.",

    data: session,
  });
});

// =====================================
// Finalize Attendance
// POST /api/attendance/sessions/:serviceId/finalize
// =====================================

const finalizeAttendanceSession = asyncHandler(async (req, res) => {
  const session = await attendanceSessionService.finalizeSession(
    req.user.churchId,
    req.params.serviceId,
    req.user.userId,
  );

  res.status(200).json({
    success: true,

    message: "Attendance session finalized successfully.",

    data: session,
  });
});

export {
  getAttendanceSession,
  openAttendanceSession,
  closeAttendanceSession,
  finalizeAttendanceSession,
};
