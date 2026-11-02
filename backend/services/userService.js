import bcrypt from "bcryptjs";

import User from "../models/User.js";
import Role from "../models/Role.js";

import ApiError from "../utils/ApiError.js";

// =========================
// Get all church users
// =========================

const getUsers = async (churchId) => {
  const users = await User.find({
    churchId,
    isActive: true,
  })
    .populate("roleId", "name description permissions")
    .select("-password")
    .sort({
      createdAt: -1,
    });

  return users;
};

// =========================
// Get single user
// =========================

const getUserById = async (churchId, userId) => {
  const user = await User.findOne({
    _id: userId,
    churchId,
    isActive: true,
  })
    .populate("roleId", "name description permissions")
    .select("-password");

  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  return user;
};

// =========================
// Create User
// =========================

const createUser = async (churchId, data) => {
  const { firstName, lastName, email, roleId } = data;

  if (!firstName || !lastName || !email || !roleId) {
    throw new ApiError(
      400,
      "First name, last name, email and role are required.",
    );
  }

  const existingUser = await User.findOne({
    email,
  });

  if (existingUser) {
    throw new ApiError(400, "User already exists.");
  }

  const role = await Role.findOne({
    _id: roleId,
    churchId,
    isActive: true,
  });

  if (!role) {
    throw new ApiError(404, "Role not found.");
  }

  const temporaryPassword = "Welcome@123";

  const hashedPassword = await bcrypt.hash(temporaryPassword, 10);

  const user = await User.create({
    churchId,

    firstName,

    lastName,

    email,

    password: hashedPassword,

    roleId,
  });

  const populatedUser = await User.findById(user._id)
    .populate("roleId", "name description permissions")
    .select("-password");

  return {
    user: populatedUser,
    temporaryPassword,
  };
};

// =========================
// Update User Role
// =========================

const updateUserRole = async (churchId, userId, roleId) => {
  const role = await Role.findOne({
    _id: roleId,
    churchId,
    isActive: true,
  });

  if (!role) {
    throw new ApiError(404, "Role not found.");
  }

  const user = await User.findOneAndUpdate(
    {
      _id: userId,
      churchId,
      isActive: true,
    },
    {
      roleId,
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .populate("roleId", "name description permissions")
    .select("-password");

  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  return user;
};

// =========================
// Deactivate User
// =========================

const deactivateUser = async (churchId, userId) => {
  const user = await User.findOneAndUpdate(
    {
      _id: userId,
      churchId,
      isActive: true,
    },
    {
      isActive: false,
    },
    {
      new: true,
    },
  ).select("-password");

  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  return user;
};

// =========================
// Activate User
// =========================

const activateUser = async (churchId, userId) => {
  const user = await User.findOneAndUpdate(
    {
      _id: userId,
      churchId,
    },
    {
      isActive: true,
    },
    {
      new: true,
    },
  ).select("-password");

  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  return user;
};

// =========================
// Current User
// =========================

const getCurrentUser = async (userId) => {
  const user = await User.findById(userId)
    .populate("roleId", "name description permissions")
    .select("-password");

  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  return user;
};

export default {
  getUsers,
  getUserById,
  createUser,
  updateUserRole,
  deactivateUser,
  activateUser,
  getCurrentUser,
};
