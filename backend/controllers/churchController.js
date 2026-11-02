import churchService from "../services/churchService.js";
import asyncHandler from "../utils/asyncHandler.js";

// @desc    Get church profile
// @route   GET /api/church/profile
// @access  Private
const getProfile = asyncHandler(async (req, res) => {
  const profile = await churchService.getChurchProfile(req.user.churchId);

  res.status(200).json({
    success: true,

    data: profile,
  });
});

// @desc    Create church profile
// @route   POST /api/church/profile
// @access  Private
const createProfile = asyncHandler(async (req, res) => {
  const profile = await churchService.createChurchProfile(
    req.user.churchId,
    req.body,
  );

  res.status(201).json({
    success: true,

    message: "Church profile created successfully.",

    data: profile,
  });
});

// @desc    Update church profile
// @route   PUT /api/church/profile
// @access  Private
const updateProfile = asyncHandler(async (req, res) => {
  const profile = await churchService.updateChurchProfile(
    req.user.churchId,
    req.body,
  );

  res.status(200).json({
    success: true,

    message: "Church profile updated successfully.",

    data: profile,
  });
});

export { getProfile, createProfile, updateProfile };
