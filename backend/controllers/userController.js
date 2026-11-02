import userService from "../services/userService.js";
import asyncHandler from "../utils/asyncHandler.js";

// =========================
// Get all church users
// GET /api/users
// =========================

const getUsers = asyncHandler(async (req, res) => {
  const users = await userService.getUsers(
    req.user.churchId,
  );

  res.status(200).json({
    success: true,
    data: users,
  });
});

// =========================
// Get single user
// GET /api/users/:id
// =========================

const getUser = asyncHandler(async (req, res) => {
  const user = await userService.getUserById(
    req.user.churchId,
    req.params.id,
  );

  res.status(200).json({
    success: true,
    data: user,
  });
});

// =========================
// Create user
// POST /api/users
// =========================

const createUser = asyncHandler(async (req, res) => {
  const result = await userService.createUser(
    req.user.churchId,
    req.body,
  );

  res.status(201).json({
    success: true,
    message: "Staff user created successfully.",
    data: result,
  });
});

// =========================
// Update user role
// PUT /api/users/:id/role
// =========================

const updateUserRole = asyncHandler(async (req, res) => {
  const user = await userService.updateUserRole(
    req.user.churchId,
    req.params.id,
    req.body.roleId,
  );

  res.status(200).json({
    success: true,
    message: "User role updated successfully.",
    data: user,
  });
});

// =========================
// Activate user
// PATCH /api/users/:id/activate
// =========================

const activateUser = asyncHandler(async (req, res) => {
  const user = await userService.activateUser(
    req.user.churchId,
    req.params.id,
  );

  res.status(200).json({
    success: true,
    message: "User activated successfully.",
    data: user,
  });
});

// =========================
// Deactivate user
// PATCH /api/users/:id/deactivate
// =========================

const deactivateUser = asyncHandler(async (req, res) => {
  const user = await userService.deactivateUser(
    req.user.churchId,
    req.params.id,
  );

  res.status(200).json({
    success: true,
    message: "User deactivated successfully.",
    data: user,
  });
});

// =========================
// Current logged-in user
// GET /api/users/me
// =========================

const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await userService.getCurrentUser(
    req.user.userId,
  );

  res.status(200).json({
    success: true,
    data: user,
  });
});

export {
  getUsers,
  getUser,
  createUser,
  updateUserRole,
  activateUser,
  deactivateUser,
  getCurrentUser,
};