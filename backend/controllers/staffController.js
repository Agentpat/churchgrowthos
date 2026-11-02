import staffService from "../services/staffService.js";
import asyncHandler from "../utils/asyncHandler.js";

// =====================================
// Create Staff
// =====================================

// @desc    Create a staff record from an existing member
// @route   POST /api/staff
// @access  Private

const createStaff = asyncHandler(async (req, res) => {
  const staff = await staffService.createStaff(
    req.user.churchId,
    req.user.userId,
    req.body,
  );

  res.status(201).json({
    success: true,

    message: "Staff record created successfully.",

    data: staff,
  });
});

// =====================================
// Get Staff
// =====================================

// @desc    Get church staff
// @route   GET /api/staff
// @access  Private

const getStaff = asyncHandler(async (req, res) => {
  const result = await staffService.getStaff(req.user.churchId, req.query);

  res.status(200).json({
    success: true,

    data: result,
  });
});

// =====================================
// Get Single Staff
// =====================================

// @desc    Get a single staff record
// @route   GET /api/staff/:id
// @access  Private

const getStaffById = asyncHandler(async (req, res) => {
  const staff = await staffService.getStaffById(
    req.user.churchId,
    req.params.id,
  );

  res.status(200).json({
    success: true,

    data: staff,
  });
});

// =====================================
// Update Staff
// =====================================

// @desc    Update a staff record
// @route   PUT /api/staff/:id
// @access  Private

const updateStaff = asyncHandler(async (req, res) => {
  const staff = await staffService.updateStaff(
    req.user.churchId,
    req.params.id,
    req.body,
  );

  res.status(200).json({
    success: true,

    message: "Staff record updated successfully.",

    data: staff,
  });
});

// =====================================
// Delete / Archive Staff
// =====================================

// @desc    Archive a staff record
// @route   DELETE /api/staff/:id
// @access  Private

const deleteStaff = asyncHandler(async (req, res) => {
  const staff = await staffService.deleteStaff(
    req.user.churchId,
    req.params.id,
  );

  res.status(200).json({
    success: true,

    message: "Staff record archived successfully.",

    data: staff,
  });
});

// =====================================
// Staff Summary
// =====================================

// @desc    Get staff summary
// @route   GET /api/staff/summary
// @access  Private

const getStaffSummary = asyncHandler(async (req, res) => {
  const summary = await staffService.getStaffSummary(req.user.churchId);

  res.status(200).json({
    success: true,

    data: summary,
  });
});

// =====================================
// Export
// =====================================

export {
  createStaff,
  getStaff,
  getStaffById,
  updateStaff,
  deleteStaff,
  getStaffSummary,
};
