import followUpService from "../services/followUpService.js";

import memberActivityService from "../services/memberActivityService.js";

import asyncHandler from "../utils/asyncHandler.js";

// @desc    Get pending follow-ups
// @route   GET /api/followups/pending
// @access  Private
const getPendingFollowUps = asyncHandler(async (req, res) => {
  const followUps = await followUpService.getPendingFollowUps(
    req.user.churchId,
  );

  res.status(200).json({
    success: true,

    count: followUps.length,

    data: followUps,
  });
});

// @desc    Mark follow-up as sent
// @route   PUT /api/followups/:id/sent
// @access  Private
const markFollowUpSent = asyncHandler(async (req, res) => {
  const followUp = await followUpService.markAsSent(
    req.user.churchId,

    req.params.id,
  );

  // Create member activity only for members

  if (followUp.memberId) {
    await memberActivityService.createActivity({
      churchId: req.user.churchId,

      memberId: followUp.memberId,

      type: "followup",

      title: "Follow-up completed",

      description: "Member follow-up was completed successfully.",

      performedBy: req.user.userId,
    });
  }

  res.status(200).json({
    success: true,

    message: "Follow-up marked as sent.",

    data: followUp,
  });
});

// @desc    Mark follow-up as failed
// @route   PUT /api/followups/:id/failed
// @access  Private
const markFollowUpFailed = asyncHandler(async (req, res) => {
  const followUp = await followUpService.markAsFailed(
    req.user.churchId,

    req.params.id,

    req.body.reason,
  );

  // Log failed member follow-up

  if (followUp.memberId) {
    await memberActivityService.createActivity({
      churchId: req.user.churchId,

      memberId: followUp.memberId,

      type: "followup",

      title: "Follow-up failed",

      description: `Follow-up failed: ${
        req.body.reason || "No reason provided"
      }`,

      performedBy: req.user.userId,
    });
  }

  res.status(200).json({
    success: true,

    message: "Follow-up marked as failed.",

    data: followUp,
  });
});

// @desc    Get member follow-up history
// @route   GET /api/followups/member/:memberId
// @access  Private
const getMemberFollowUps = asyncHandler(async (req, res) => {
  const followUps = await followUpService.getMemberFollowUps(
    req.user.churchId,

    req.params.memberId,
  );

  res.status(200).json({
    success: true,

    count: followUps.length,

    data: followUps,
  });
});

// =====================================
// Get visitor follow-up history
// GET /api/followups/visitor/:visitorId
// =====================================

const getVisitorFollowUps = asyncHandler(
  async (req, res) => {

    const followUps =
      await followUpService.getVisitorFollowUps(
        req.user.churchId,

        req.params.visitorId,
      );

    res.status(200).json({

      success: true,

      count: followUps.length,

      data: followUps,

    });

  },
);



export {
  getPendingFollowUps,
  getMemberFollowUps,
  getVisitorFollowUps,
  markFollowUpSent,
  markFollowUpFailed,
};
