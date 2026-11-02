import express from "express";

import {
  createGroup,
  getGroups,
  getGroup,
  updateGroup,
  deactivateGroup,
  addMemberToGroup,
  removeMemberFromGroup,
  getMemberGroups,
  getGroupMembers,
  getGroupOverview,
} from "../controllers/groupController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Protect all group routes

router.use(protect);

// =====================================
// Groups
// =====================================

// Create group

router.post("/", createGroup);

// Get all groups

router.get("/", getGroups);

router.get("/:groupId/overview", getGroupOverview);

// =====================================
// Member Related Routes
// =====================================

// Get groups a member belongs to
// GET /api/groups/member/:memberId

router.get("/member/:memberId", getMemberGroups);

// Get members inside a group
// GET /api/groups/:groupId/members

router.get("/:groupId/members", getGroupMembers);

// Add member to group
// POST /api/groups/:groupId/members

router.post("/:groupId/members", addMemberToGroup);

// Remove member from group
// DELETE /api/groups/:groupId/members/:memberId

router.delete("/:groupId/members/:memberId", removeMemberFromGroup);

// =====================================
// Single Group Routes
// =====================================

// Get single group

router.get("/:id", getGroup);

// Update group

router.put("/:id", updateGroup);

// Deactivate group

router.patch("/:id/deactivate", deactivateGroup);

export default router;
