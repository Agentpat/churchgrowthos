import express from "express";

import {
  createStaff,
  getStaff,
  getStaffById,
  updateStaff,
  deleteStaff,
  getStaffSummary,
} from "../controllers/staffController.js";

import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/permissionMiddleware.js";

import permissions from "../config/permissions.js";

const router = express.Router();

// =====================================
// Authentication
// =====================================

router.use(protect);

// =====================================
// Staff Summary
// =====================================

// GET /api/staff/summary

router.get("/summary", authorize(permissions.STAFF_VIEW), getStaffSummary);

// =====================================
// Create Staff
// =====================================

// POST /api/staff

router.post("/", authorize(permissions.STAFF_CREATE), createStaff);

// =====================================
// Get Staff
// Search + Filter + Pagination
// =====================================

// GET /api/staff

router.get("/", authorize(permissions.STAFF_VIEW), getStaff);

// =====================================
// Get Single Staff
// =====================================

// GET /api/staff/:id

router.get("/:id", authorize(permissions.STAFF_VIEW), getStaffById);

// =====================================
// Update Staff
// =====================================

// PUT /api/staff/:id

router.put("/:id", authorize(permissions.STAFF_UPDATE), updateStaff);

// =====================================
// Delete / Archive Staff
// =====================================

// DELETE /api/staff/:id

router.delete("/:id", authorize(permissions.STAFF_DELETE), deleteStaff);

// =====================================
// Export
// =====================================

export default router;
