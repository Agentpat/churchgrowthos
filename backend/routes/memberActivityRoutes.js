import express from "express";

import protect from "../middleware/authMiddleware.js";

import authorize from "../middleware/permissionMiddleware.js";

import permissions from "../config/permissions.js";

import {
  getMemberActivities,
  createMemberActivity,
} from "../controllers/memberActivityController.js";

const router = express.Router();

// Protect all routes

router.use(protect);

// =====================================
// Get Member Activity Timeline
// GET /api/members/:id/activity
// =====================================

router.get(
  "/:id/activity",

  authorize(permissions.MEMBERS_VIEW),

  getMemberActivities,
);

// =====================================
// Create Member Activity
// POST /api/members/:id/activity
// =====================================

router.post(
  "/:id/activity",

  authorize(permissions.MEMBERS_UPDATE),

  createMemberActivity,
);

export default router;
