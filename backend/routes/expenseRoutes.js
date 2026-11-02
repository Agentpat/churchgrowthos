import express from "express";

import {
  createExpense,
  getExpenses,
  getExpense,
  updateExpense,
  deleteExpense,
  getExpenseSummary,
} from "../controllers/expenseController.js";

import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/permissionMiddleware.js";

import permissions from "../config/permissions.js";

const router = express.Router();

// =====================================
// Authentication
// =====================================

router.use(protect);

// =====================================
// Expense Management
// =====================================

// Create Expense
router.post("/", authorize(permissions.FINANCE_CREATE), createExpense);

// Get All Expenses
router.get("/", authorize(permissions.FINANCE_VIEW), getExpenses);

// Expense Summary
router.get("/summary", authorize(permissions.FINANCE_VIEW), getExpenseSummary);

// Get Single Expense
router.get("/:id", authorize(permissions.FINANCE_VIEW), getExpense);

// Update Expense
router.put("/:id", authorize(permissions.FINANCE_UPDATE), updateExpense);

// Delete Expense
router.delete("/:id", authorize(permissions.FINANCE_DELETE), deleteExpense);

export default router;
