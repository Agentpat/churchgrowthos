import express from "express";

import {
  getAttendanceSession,
  openAttendanceSession,
  closeAttendanceSession,
  finalizeAttendanceSession,
} from "../controllers/attendanceSessionController.js";

import protect from "../middleware/authMiddleware.js";

import authorize from "../middleware/permissionMiddleware.js";

import permissions from "../config/permissions.js";

const router = express.Router();

// =====================================
// Protect All Routes
// =====================================

router.use(protect);

// =====================================
// Get Attendance Session
// GET /api/attendance/sessions/:serviceId
// =====================================

router.get(
  "/:serviceId",
  authorize(permissions.ATTENDANCE_VIEW),
  getAttendanceSession,
);

// =====================================
// Open Attendance
// POST /api/attendance/sessions/:serviceId/open
// =====================================

router.post(
  "/:serviceId/open",
  authorize(permissions.ATTENDANCE_CREATE),
  openAttendanceSession,
);

// =====================================
// Close Attendance
// POST /api/attendance/sessions/:serviceId/close
// =====================================

router.post(
  "/:serviceId/close",
  authorize(permissions.ATTENDANCE_UPDATE),
  closeAttendanceSession,
);

// =====================================
// Finalize Attendance
// POST /api/attendance/sessions/:serviceId/finalize
// =====================================

router.post(
  "/:serviceId/finalize",
  authorize(permissions.ATTENDANCE_UPDATE),
  finalizeAttendanceSession,
);

export default router;
