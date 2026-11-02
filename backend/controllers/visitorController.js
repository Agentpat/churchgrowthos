import visitorService from "../services/visitorServices.js";

import asyncHandler from "../utils/asyncHandler.js";

// =====================================
// Check In Visitor
// POST /api/visitors/check-in
// =====================================
// Primary operational visitor attendance
// flow.
//
// Creates/finds the visitor and records
// their attendance against the active
// service session.
// =====================================

const checkInVisitor = asyncHandler(async (req, res) => {
  const result = await visitorService.checkInVisitor(
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

      message: "Visitor is already checked in.",

      data: result,
    });
  }

  // =====================================
  // Response
  // =====================================

  res.status(201).json({
    success: true,

    alreadyCheckedIn: false,

    message: result.visitorCreated
      ? "Visitor created and checked in successfully."
      : "Visitor checked in successfully.",

    data: result,
  });
});

// =====================================
// Create Visitor
// POST /api/visitors
// =====================================

const createVisitor = asyncHandler(async (req, res) => {
  const visitor = await visitorService.createVisitor(
    req.user.churchId,
    req.body,
    req.user.userId,
  );

  res.status(201).json({
    success: true,

    message: "Visitor created successfully.",

    data: visitor,
  });
});

// =====================================
// Get All Visitors
// GET /api/visitors
// =====================================

const getVisitors = asyncHandler(async (req, res) => {
  const visitors = await visitorService.getVisitors(
    req.user.churchId,
    req.query,
  );

  res.status(200).json({
    success: true,

    data: visitors,
  });
});

// =====================================
// Get Single Visitor
// GET /api/visitors/:id
// =====================================

const getVisitor = asyncHandler(async (req, res) => {
  const visitor = await visitorService.getVisitorById(
    req.user.churchId,
    req.params.id,
  );

  res.status(200).json({
    success: true,

    data: visitor,
  });
});

// =====================================
// Update Visitor
// PUT /api/visitors/:id
// =====================================

const updateVisitor = asyncHandler(async (req, res) => {
  const visitor = await visitorService.updateVisitor(
    req.user.churchId,
    req.params.id,
    req.body,
  );

  res.status(200).json({
    success: true,

    message: "Visitor updated successfully.",

    data: visitor,
  });
});

// =====================================
// Archive Visitor
// PATCH /api/visitors/:id/archive
// =====================================

const archiveVisitor = asyncHandler(async (req, res) => {
  const visitor = await visitorService.archiveVisitor(
    req.user.churchId,
    req.params.id,
  );

  res.status(200).json({
    success: true,

    message: "Visitor archived successfully.",

    data: visitor,
  });
});

// =====================================
// Convert Visitor To Member
// POST /api/visitors/:id/convert
// =====================================

const convertVisitor = asyncHandler(async (req, res) => {
  const result = await visitorService.convertVisitorToMember(
    req.user.churchId,
    req.params.id,
    req.user.userId,
  );

  res.status(200).json({
    success: true,

    message: "Visitor converted to member successfully.",

    data: result,
  });
});

// =====================================
// Exports
// =====================================

export {
  checkInVisitor,
  createVisitor,
  getVisitors,
  getVisitor,
  updateVisitor,
  archiveVisitor,
  convertVisitor,
};
