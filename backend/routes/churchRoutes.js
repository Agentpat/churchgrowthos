import express from "express";

import {
  getProfile,
  createProfile,
  updateProfile,
} from "../controllers/churchController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// All church routes require authentication
router.use(protect);

// Get church profile
router.get("/profile", getProfile);

// Create church profile
router.post("/profile", createProfile);

// Update church profile
router.put("/profile", updateProfile);

export default router;
