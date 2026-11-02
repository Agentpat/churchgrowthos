import financeService from "../services/financeService.js";
import financeAnalyticsService from "../services/financeAnalyticsService.js";

import asyncHandler from "../utils/asyncHandler.js";

// =========================
// Create Offering
// =========================

// @desc Create offering
// @route POST /api/finance/offerings
// @access Private

const createOffering = asyncHandler(async (req, res) => {
  const offering = await financeService.createOffering(
    req.user.churchId,
    req.user.userId,
    req.body,
  );

  res.status(201).json({
    success: true,

    message: "Offering recorded successfully.",

    data: offering,
  });
});

// =========================
// Get Offerings
// =========================

// @desc Get all offerings
// @route GET /api/finance/offerings
// @access Private

const getOfferings = asyncHandler(async (req, res) => {
  const result = await financeService.getOfferings(
    req.user.churchId,
    req.query,
  );

  res.status(200).json({
    success: true,

    data: result,
  });
});

// =========================
// Get Single Offering
// =========================

// @desc Get single offering
// @route GET /api/finance/offerings/:id
// @access Private

const getOffering = asyncHandler(async (req, res) => {
  const offering = await financeService.getOfferingById(
    req.user.churchId,
    req.params.id,
  );

  res.status(200).json({
    success: true,

    data: offering,
  });
});

// =========================
// Update Offering
// =========================

// @desc Update offering
// @route PUT /api/finance/offerings/:id
// @access Private

const updateOffering = asyncHandler(async (req, res) => {
  const offering = await financeService.updateOffering(
    req.user.churchId,
    req.params.id,
    req.body,
  );

  res.status(200).json({
    success: true,

    message: "Offering updated successfully.",

    data: offering,
  });
});

// =========================
// Delete Offering
// =========================

// @desc Soft delete offering
// @route DELETE /api/finance/offerings/:id
// @access Private

const deleteOffering = asyncHandler(async (req, res) => {
  const offering = await financeService.deleteOffering(
    req.user.churchId,
    req.params.id,
  );

  res.status(200).json({
    success: true,

    message: "Offering removed successfully.",

    data: offering,
  });
});

// =========================
// Finance Summary
// =========================

// @desc Get finance summary
// @route GET /api/finance/summary
// @access Private

const getFinanceSummary = asyncHandler(async (req, res) => {
  const summary = await financeService.getFinanceSummary(req.user.churchId);

  res.status(200).json({
    success: true,

    data: summary,
  });
});

// =========================
// Finance Analytics
// =========================

// @desc Get complete finance analytics
// @route GET /api/finance/analytics
// @access Private

const getFinanceAnalytics = asyncHandler(async (req, res) => {
  const analytics = await financeAnalyticsService.getFinanceAnalytics(
    req.user.churchId,
    {
      startDate: req.query.startDate,

      endDate: req.query.endDate,
    },
  );

  res.status(200).json({
    success: true,

    data: analytics,
  });
});

// =========================
// Export Controllers
// =========================

export {
  createOffering,
  getOfferings,
  getOffering,
  updateOffering,
  deleteOffering,
  getFinanceSummary,
  getFinanceAnalytics,
};
