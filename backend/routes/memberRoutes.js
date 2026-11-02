import express from "express";

import {
  createMember,
  getMembers,
  getMember,
  updateMember,
  deactivateMember,
  reactivateMember,
} from "../controllers/memberController.js";

import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/permissionMiddleware.js";

import permissions from "../config/permissions.js";

const router = express.Router();

// =====================================
// Authentication
// =====================================

router.use(protect);

// =====================================
// Members
// =====================================

// Create Member
router.post("/", authorize(permissions.MEMBERS_CREATE), createMember);

// Get All Members
router.get("/", authorize(permissions.MEMBERS_VIEW), getMembers);

// Get Single Member
router.get("/:id", authorize(permissions.MEMBERS_VIEW), getMember);

// Update Member
router.put("/:id", authorize(permissions.MEMBERS_UPDATE), updateMember);

// Deactivate Member
router.patch(
  "/:id/deactivate",
  authorize(permissions.MEMBERS_DELETE),
  deactivateMember,
);

// Reactivate Member
router.patch(
  "/:id/reactivate",
  authorize(permissions.MEMBERS_UPDATE),
  reactivateMember,
);

export default router;
