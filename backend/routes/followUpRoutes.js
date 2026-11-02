import express from "express";

import {
  getPendingFollowUps,
  getMemberFollowUps,
  getVisitorFollowUps,
  markFollowUpSent,
  markFollowUpFailed,
} from "../controllers/followUpController.js";

import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/permissionMiddleware.js";

import permissions from "../config/permissions.js";

const router = express.Router();

// =====================================
// Authentication
// =====================================

router.use(protect);

// =====================================
// Pending Follow-Ups
// =====================================

// GET /api/followups/pending
router.get(
  "/pending",
  authorize(permissions.FOLLOWUPS_VIEW),
  getPendingFollowUps,
);

// =====================================
// Member Follow-Up History
// =====================================

// GET /api/followups/member/:memberId
router.get(
  "/member/:memberId",
  authorize(permissions.FOLLOWUPS_VIEW),
  getMemberFollowUps,
);

// =====================================
// Visitor Follow-Up History
// =====================================

// GET /api/followups/visitor/:visitorId
router.get(
  "/visitor/:visitorId",
  authorize(permissions.FOLLOWUPS_VIEW),
  getVisitorFollowUps,
);

// =====================================
// Mark Follow-Up as Sent
// =====================================

// PUT /api/followups/:id/sent
router.put(
  "/:id/sent",
  authorize(permissions.FOLLOWUPS_UPDATE),
  markFollowUpSent,
);

// =====================================
// Mark Follow-Up as Failed
// =====================================

// PUT /api/followups/:id/failed
router.put(
  "/:id/failed",
  authorize(permissions.FOLLOWUPS_UPDATE),
  markFollowUpFailed,
);

export default router;
