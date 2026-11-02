import express from "express";

import {
  checkInMember,
  recordAttendance,
  recordBulkAttendance,
  getLiveAttendance,
  getAttendance,
  getServiceAttendance,
  getMemberAttendance,
  updateAttendance,
  deleteAttendance,
} from "../controllers/attendanceController.js";

import protect from "../middleware/authMiddleware.js";

import authorize from "../middleware/permissionMiddleware.js";

import permissions from "../config/permissions.js";

const router = express.Router();

// =====================================
// Protect All Attendance Routes
// =====================================

router.use(protect);

// =====================================
// Check In Member
// POST /api/attendance/check-in
// =====================================
// Primary operational check-in endpoint.
//
// Used by:
// - QR Scanner
// - Usher Search
// - Self Check-in
// - Manual Check-in
// =====================================

router.post(
  "/check-in",
  authorize(permissions.ATTENDANCE_CREATE),
  checkInMember,
);

// =====================================
// Get Live Attendance
// GET /api/attendance/live/:serviceId
// =====================================
// Returns the current state of an
// attendance session.
//
// Used by:
// - Attendance overview
// - Live attendance screen
// - Usher screen
// - Scanner interface
// =====================================

router.get(
  "/live/:serviceId",
  authorize(permissions.ATTENDANCE_VIEW),
  getLiveAttendance,
);

// =====================================
// Record Single Attendance
// POST /api/attendance
// =====================================
// Existing MVP/admin flow.
// =====================================

router.post("/", authorize(permissions.ATTENDANCE_CREATE), recordAttendance);

// =====================================
// Record Bulk Attendance
// POST /api/attendance/bulk
// =====================================

router.post(
  "/bulk",
  authorize(permissions.ATTENDANCE_CREATE),
  recordBulkAttendance,
);

// =====================================
// Get Attendance For A Service
// GET /api/attendance/service/:serviceId
// =====================================

router.get(
  "/service/:serviceId",
  authorize(permissions.ATTENDANCE_VIEW),
  getServiceAttendance,
);

// =====================================
// Get All Attendance
// GET /api/attendance
// =====================================

router.get("/", authorize(permissions.ATTENDANCE_VIEW), getAttendance);

// =====================================
// Get Attendance History For A Member
// GET /api/attendance/member/:memberId
// =====================================

router.get(
  "/member/:memberId",
  authorize(permissions.ATTENDANCE_VIEW),
  getMemberAttendance,
);

// =====================================
// Update Attendance
// PUT /api/attendance/:id
// =====================================

router.put("/:id", authorize(permissions.ATTENDANCE_UPDATE), updateAttendance);

// =====================================
// Delete Attendance
// DELETE /api/attendance/:id
// =====================================

router.delete(
  "/:id",
  authorize(permissions.ATTENDANCE_DELETE),
  deleteAttendance,
);

export default router;
