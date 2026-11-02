import analyticsService from "../services/analyticsService.js";
import asyncHandler from "../utils/asyncHandler.js";

// @desc    Get church dashboard analytics
// @route   GET /api/analytics/dashboard
// @access  Private

const getDashboardAnalytics = asyncHandler(async (req, res) => {
  const analytics = await analyticsService.getDashboardAnalytics(
    req.user.churchId,
  );

  res.status(200).json({
    success: true,

    data: analytics,
  });
});

export { getDashboardAnalytics };
