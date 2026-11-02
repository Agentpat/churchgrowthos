import expenseService from "../services/expenseService.js";

import asyncHandler from "../utils/asyncHandler.js";

// =========================
// Create Expense
// ===============á==========

const createExpense = asyncHandler(async (req, res) => {
  const expense = await expenseService.createExpense(
    req.user.churchId,

    req.user.userId,

    req.body,
  );

  return res.status(201).json({
    success: true,

    message: "Expense recorded successfully.",

    data: expense,
  });
});

// =========================
// Get Expenses
// =========================

const getExpenses = asyncHandler(async (req, res) => {
  const expenses = await expenseService.getExpenses(
    req.user.churchId,

    req.query,
  );

  return res.status(200).json({
    success: true,

    data: expenses,
  });
});

// =========================
// Get Single Expense
// =========================

const getExpense = asyncHandler(async (req, res) => {
  const expense = await expenseService.getExpenseById(
    req.user.churchId,

    req.params.id,
  );

  return res.status(200).json({
    success: true,

    data: expense,
  });
});

// =========================
// Update Expense
// =========================

const updateExpense = asyncHandler(async (req, res) => {
  const expense = await expenseService.updateExpense(
    req.user.churchId,

    req.params.id,

    req.body,
  );

  return res.status(200).json({
    success: true,

    message: "Expense updated successfully.",

    data: expense,
  });
});

// =========================
// Delete Expense
// =========================

const deleteExpense = asyncHandler(async (req, res) => {
  await expenseService.deleteExpense(
    req.user.churchId,

    req.params.id,
  );

  return res.status(200).json({
    success: true,

    message: "Expense removed successfully.",
  });
});

// =========================
// Expense Summary
// =========================

const getExpenseSummary = asyncHandler(async (req, res) => {
  const summary = await expenseService.getExpenseSummary(req.user.churchId);

  return res.status(200).json({
    success: true,

    data: summary,
  });
});

export {
  createExpense,
  getExpenses,
  getExpense,
  updateExpense,
  deleteExpense,
  getExpenseSummary,
};
