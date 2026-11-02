import memberService from "../services/memberService.js";

import asyncHandler from "../utils/asyncHandler.js";

// @desc    Create member
// @route   POST /api/members
// @access  Private
const createMember = asyncHandler(async (req, res) => {
  const member = await memberService.createMember(
    req.user.churchId,

    req.body,

    req.user._id,
  );

  res.status(201).json({
    success: true,

    message: "Member created successfully.",

    data: member,
  });
});

// @desc    Get all members
// @route   GET /api/members
// @access  Private
const getMembers = asyncHandler(async (req, res) => {
  const result = await memberService.getMembers(
    req.user.churchId,

    req.query,
  );

  res.status(200).json({
    success: true,

    data: result,
  });
});

// @desc    Get single member
// @route   GET /api/members/:id
// @access  Private
const getMember = asyncHandler(async (req, res) => {
  const member = await memberService.getMemberById(
    req.user.churchId,

    req.params.id,
  );

  res.status(200).json({
    success: true,

    data: member,
  });
});

// @desc    Update member
// @route   PUT /api/members/:id
// @access  Private
const updateMember = asyncHandler(async (req, res) => {
  const member = await memberService.updateMember(
    req.user.churchId,

    req.params.id,

    req.body,

    req.user._id,
  );

  res.status(200).json({
    success: true,

    message: "Member updated successfully.",

    data: member,
  });
});

// @desc    Deactivate member
// @route   PATCH /api/members/:id/deactivate
// @access  Private
const deactivateMember = asyncHandler(async (req, res) => {
  const member = await memberService.deactivateMember(
    req.user.churchId,

    req.params.id,

    req.user._id,
  );

  res.status(200).json({
    success: true,

    message: "Member deactivated successfully.",

    data: member,
  });
});

// @desc    Reactivate member
// @route   PATCH /api/members/:id/reactivate
// @access  Private
const reactivateMember = asyncHandler(async (req, res) => {
  const member = await memberService.reactivateMember(
    req.user.churchId,

    req.params.id,

    req.user._id,
  );

  res.status(200).json({
    success: true,

    message: "Member reactivated successfully.",

    data: member,
  });
});

export {
  createMember,
  getMembers,
  getMember,
  updateMember,
  deactivateMember,
  reactivateMember,
};
