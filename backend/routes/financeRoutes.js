import express from "express";

import {
  createOffering,
  getOfferings,
  getOffering,
  updateOffering,
  deleteOffering,
  getFinanceSummary,
  getFinanceAnalytics,
} from "../controllers/financeController.js";

import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/permissionMiddleware.js";

import permissions from "../config/permissions.js";

const router = express.Router();

// =====================================
// Authentication
// =====================================

router.use(protect);

// =====================================
// Finance Dashboard
// =====================================

// GET /api/finance/summary

router.get(
  "/summary",

  authorize(permissions.FINANCE_VIEW),

  getFinanceSummary,
);

// =====================================
// Finance Analytics
// =====================================

// GET /api/finance/analytics

router.get(
  "/analytics",

  authorize(permissions.FINANCE_VIEW),

  getFinanceAnalytics,
);

// =====================================
// Offerings
// =====================================

// POST /api/finance/offerings

router.post(
  "/offerings",

  authorize(permissions.FINANCE_CREATE),

  createOffering,
);

// GET /api/finance/offerings

router.get(
  "/offerings",

  authorize(permissions.FINANCE_VIEW),

  getOfferings,
);

// GET /api/finance/offerings/:id

router.get(
  "/offerings/:id",

  authorize(permissions.FINANCE_VIEW),

  getOffering,
);

// PUT /api/finance/offerings/:id

router.put(
  "/offerings/:id",

  authorize(permissions.FINANCE_UPDATE),

  updateOffering,
);

// DELETE /api/finance/offerings/:id

router.delete(
  "/offerings/:id",

  authorize(permissions.FINANCE_DELETE),

  deleteOffering,
);

export default router;
