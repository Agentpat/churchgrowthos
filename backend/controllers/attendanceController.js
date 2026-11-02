import attendanceService from "../services/attendanceService.js";
import memberActivityService from "../services/memberActivityService.js";

import asyncHandler from "../utils/asyncHandler.js";

// =====================================
// Check In Member
// @route POST /api/attendance/check-in
// @access Private
// =====================================

const checkInMember = asyncHandler(async (req, res) => {
  const result = await attendanceService.checkInMember(
    req.user.churchId,
    req.user.userId,
    req.body,
  );

  // =====================================
  // Already Checked In
  // =====================================

  if (result.alreadyCheckedIn) {
    return res.status(200).json({
      success: true,

      alreadyCheckedIn: true,

      message: "Member is already checked in.",

      data: result,
    });
  }

  // =====================================
  // Create Member Activity
  // =====================================

  if (result.attendance?.memberId) {
    await memberActivityService.createActivity({
      churchId: req.user.churchId,

      memberId: result.attendance.memberId,

      type: "attendance",

      title: "Attended Church Service",

      description: "Member checked in to a church service.",

      performedBy: req.user.userId,
    });
  }

  // =====================================
  // Response
  // =====================================

  res.status(201).json({
    success: true,

    alreadyCheckedIn: false,

    message: "Member checked in successfully.",

    data: result,
  });
});

// =====================================
// Record Attendance
// @route POST /api/attendance
// @access Private
// =====================================

const recordAttendance = asyncHandler(async (req, res) => {
  const attendance = await attendanceService.recordAttendance(
    req.user.churchId,
    req.user.userId,
    req.body,
  );

  // =====================================
  // Create Member Activity
  // =====================================

  if (attendance.memberId) {
    await memberActivityService.createActivity({
      churchId: req.user.churchId,

      memberId: attendance.memberId,

      type: "attendance",

      title: "Attended Church Service",

      description: "Member attended a church service.",

      performedBy: req.user.userId,
    });
  }

  res.status(201).json({
    success: true,

    message: "Attendance recorded successfully.",

    data: attendance,
  });
});

// =====================================
// Record Bulk Attendance
// @route POST /api/attendance/bulk
// @access Private
// =====================================

const recordBulkAttendance = asyncHandler(async (req, res) => {
  const result = await attendanceService.recordBulkAttendance(
    req.user.churchId,
    req.user.userId,
    req.body,
  );

  // =====================================
  // Create Activity Logs
  // =====================================

  if (result.attendance.length > 0) {
    for (const attendance of result.attendance) {
      await memberActivityService.createActivity({
        churchId: req.user.churchId,

        memberId: attendance.memberId,

        type: "attendance",

        title: "Attended Church Service",

        description: "Member attended a church service.",

        performedBy: req.user.userId,
      });
    }
  }

  res.status(201).json({
    success: true,

    message: `${result.created} attendance records created successfully.`,

    data: result,
  });
});

// =====================================
// Get Live Attendance
// @route GET /api/attendance/live/:serviceId
// @access Private
// =====================================

const getLiveAttendance = asyncHandler(async (req, res) => {
  const liveAttendance = await attendanceService.getLiveAttendance(
    req.user.churchId,
    req.params.serviceId,
  );

  res.status(200).json({
    success: true,

    data: liveAttendance,
  });
});

// =====================================
// Get Service Attendance
// @route GET /api/attendance/service/:serviceId
// @access Private
// =====================================

const getServiceAttendance = asyncHandler(async (req, res) => {
  const attendance = await attendanceService.getServiceAttendance(
    req.user.churchId,
    req.params.serviceId,
  );

  res.status(200).json({
    success: true,

    count: attendance.length,

    data: attendance,
  });
});

// =====================================
// Get Member Attendance
// @route GET /api/attendance/member/:memberId
// @access Private
// =====================================

const getMemberAttendance = asyncHandler(async (req, res) => {
  const attendance = await attendanceService.getMemberAttendance(
    req.user.churchId,
    req.params.memberId,
  );

  res.status(200).json({
    success: true,

    count: attendance.length,

    data: attendance,
  });
});

// =====================================
// Update Attendance
// @route PUT /api/attendance/:id
// @access Private
// =====================================

const updateAttendance = asyncHandler(async (req, res) => {
  const attendance = await attendanceService.updateAttendance(
    req.user.churchId,
    req.params.id,
    req.body,
  );

  res.status(200).json({
    success: true,

    message: "Attendance updated successfully.",

    data: attendance,
  });
});

// =====================================
// Delete Attendance
// @route DELETE /api/attendance/:id
// @access Private
// =====================================

const deleteAttendance = asyncHandler(async (req, res) => {
  const attendance = await attendanceService.deleteAttendance(
    req.user.churchId,
    req.params.id,
  );

  res.status(200).json({
    success: true,

    message: "Attendance deleted successfully.",

    data: attendance,
  });
});

// =====================================
// Get All Attendance
// @route GET /api/attendance
// @access Private
// =====================================

const getAttendance = asyncHandler(async (req, res) => {
  const attendance = await attendanceService.getAttendance(req.user.churchId);

  res.status(200).json({
    success: true,

    count: attendance.length,

    data: attendance,
  });
});

// =====================================
// Exports
// =====================================

export {
  checkInMember,
  recordAttendance,
  recordBulkAttendance,
  getLiveAttendance,
  getServiceAttendance,
  getMemberAttendance,
  getAttendance,
  updateAttendance,
  deleteAttendance,
};
