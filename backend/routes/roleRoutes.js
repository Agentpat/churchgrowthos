import express from "express";

import {
  createRole,
  getRoles,
  getRole,
  updateRole,
  deleteRole,
} from "../controllers/roleController.js";

import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/permissionMiddleware.js";

import permissions from "../config/permissions.js";

const router = express.Router();

// =====================================
// Authentication
// =====================================

router.use(protect);

// =====================================
// Role Management
// =====================================

// Create Role
router.post("/", authorize(permissions.ROLES_CREATE), createRole);

// Get All Roles
router.get("/", authorize(permissions.ROLES_VIEW), getRoles);

// Get Single Role
router.get("/:id", authorize(permissions.ROLES_VIEW), getRole);

// Update Role
router.put("/:id", authorize(permissions.ROLES_UPDATE), updateRole);

// Delete Role
router.delete("/:id", authorize(permissions.ROLES_DELETE), deleteRole);

export default router;
