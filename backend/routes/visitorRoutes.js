import express from "express";

import {
  checkInVisitor,
  createVisitor,
  getVisitors,
  getVisitor,
  updateVisitor,
  archiveVisitor,
  convertVisitor,
} from "../controllers/visitorController.js";

import protect from "../middleware/authMiddleware.js";

import authorize from "../middleware/permissionMiddleware.js";

import permissions from "../config/permissions.js";

const router = express.Router();

// =====================================
// Protect All Visitor Routes
// =====================================

router.use(protect);

// =====================================
// Check In Visitor
// POST /api/visitors/check-in
// =====================================
// Primary operational visitor check-in.
//
// Used by:
// - Usher quick capture
// - Visitor desk
// - Manual visitor registration
// =====================================

router.post(
  "/check-in",
  authorize(permissions.VISITORS_CREATE),
  checkInVisitor,
);

// =====================================
// Create Visitor
// POST /api/visitors
// =====================================
// General visitor CRM creation.
// Does NOT automatically represent
// attendance.
// =====================================

router.post("/", authorize(permissions.VISITORS_CREATE), createVisitor);

// =====================================
// Get All Visitors
// GET /api/visitors
// =====================================

router.get("/", authorize(permissions.VISITORS_VIEW), getVisitors);

// =====================================
// Get Single Visitor
// GET /api/visitors/:id
// =====================================

router.get("/:id", authorize(permissions.VISITORS_VIEW), getVisitor);

// =====================================
// Update Visitor
// PUT /api/visitors/:id
// =====================================

router.put("/:id", authorize(permissions.VISITORS_UPDATE), updateVisitor);

// =====================================
// Archive Visitor
// PATCH /api/visitors/:id/archive
// =====================================

router.patch(
  "/:id/archive",
  authorize(permissions.VISITORS_UPDATE),
  archiveVisitor,
);

// =====================================
// Convert Visitor To Member
// POST /api/visitors/:id/convert
// =====================================

router.post(
  "/:id/convert",
  authorize(permissions.VISITORS_UPDATE),
  convertVisitor,
);

export default router;
