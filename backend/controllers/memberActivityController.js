import asyncHandler from "../utils/asyncHandler.js";

import memberActivityService from "../services/memberActivityService.js";

// =====================================
// Get Member Activity Timeline
// GET /api/members/:id/activity
// =====================================

const getMemberActivities = asyncHandler(async (req, res) => {
  const activities = await memberActivityService.getMemberActivities(
    req.user.churchId,

    req.params.id,
  );

  res.status(200).json({
    success: true,

    count: activities.length,

    data: activities,
  });
});

// =====================================
// Create Member Activity Manually
// POST /api/members/:id/activity
// =====================================

const createMemberActivity = asyncHandler(async (req, res) => {
  const activity = await memberActivityService.createActivity({
    churchId: req.user.churchId,

    memberId: req.params.id,

    performedBy: req.user.userId,

    ...req.body,
  });

  res.status(201).json({
    success: true,

    message: "Activity created successfully.",

    data: activity,
  });
});

// =====================================
// Export Controller
// =====================================

export { getMemberActivities, createMemberActivity };
