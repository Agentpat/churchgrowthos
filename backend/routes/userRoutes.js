import express from "express";

import {
  getUsers,
  getUser,
  createUser,
  updateUserRole,
  activateUser,
  deactivateUser,
  getCurrentUser,
} from "../controllers/userController.js";

import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/permissionMiddleware.js";

import permissions from "../config/permissions.js";

const router = express.Router();

// =====================================
// Authentication
// =====================================

router.use(protect);

// =====================================
// Current User
// =====================================

router.get("/me", getCurrentUser);

// =====================================
// User Management
// =====================================

// Get all users
router.get("/", authorize(permissions.USERS_VIEW), getUsers);

// Get single user
router.get("/:id", authorize(permissions.USERS_VIEW), getUser);

// Create user
router.post("/", authorize(permissions.USERS_CREATE), createUser);

// Update user's role
router.put("/:id/role", authorize(permissions.USERS_UPDATE), updateUserRole);

// Activate user
router.patch(
  "/:id/activate",
  authorize(permissions.USERS_UPDATE),
  activateUser,
);

// Deactivate user
router.patch(
  "/:id/deactivate",
  authorize(permissions.USERS_DELETE),
  deactivateUser,
);

export default router;
