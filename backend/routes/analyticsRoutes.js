import express from "express";

import { getDashboardAnalytics } from "../controllers/analyticsController.js";

import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/permissionMiddleware.js";

import permissions from "../config/permissions.js";

const router = express.Router();

// Protect analytics routes
router.use(protect);

// Dashboard analytics
router.get(
  "/dashboard",
  authorize(permissions.ANALYTICS_VIEW),
  getDashboardAnalytics,
);

export default router;
