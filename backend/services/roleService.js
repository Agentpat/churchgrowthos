import Role from "../models/Role.js";
import ApiError from "../utils/ApiError.js";

// =====================================
// Create Role
// =====================================

const createRole = async (churchId, data) => {
  const { name, description = "", permissions = [] } = data;

  if (!name?.trim()) {
    throw new ApiError(400, "Role name is required.");
  }

  const existingRole = await Role.findOne({
    churchId,
    name: name.trim(),
    isActive: true,
  });

  if (existingRole) {
    throw new ApiError(400, "A role with this name already exists.");
  }

  const role = await Role.create({
    churchId,

    name: name.trim(),

    description,

    permissions,

    isSystemRole: false,

    isActive: true,
  });

  return role;
};

// =====================================
// Get All Roles
// =====================================

const getRoles = async (churchId) => {
  const roles = await Role.find({
    churchId,
    isActive: true,
  }).sort({
    createdAt: 1,
  });

  return roles;
};

// =====================================
// Get Single Role
// =====================================

const getRoleById = async (churchId, roleId) => {
  const role = await Role.findOne({
    _id: roleId,
    churchId,
    isActive: true,
  });

  if (!role) {
    throw new ApiError(404, "Role not found.");
  }

  return role;
};

// =====================================
// Update Role
// =====================================

const updateRole = async (churchId, roleId, data) => {
  const role = await Role.findOne({
    _id: roleId,
    churchId,
    isActive: true,
  });

  if (!role) {
    throw new ApiError(404, "Role not found.");
  }

  if (role.isSystemRole) {
    throw new ApiError(403, "System roles cannot be edited.");
  }

  if (data.name && data.name !== role.name) {
    const existingRole = await Role.findOne({
      churchId,
      name: data.name,
      isActive: true,
      _id: {
        $ne: roleId,
      },
    });

    if (existingRole) {
      throw new ApiError(400, "Role name already exists.");
    }

    role.name = data.name;
  }

  if (data.description !== undefined) {
    role.description = data.description;
  }

  if (Array.isArray(data.permissions)) {
    role.permissions = data.permissions;
  }

  await role.save();

  return role;
};

// =====================================
// Delete Role
// =====================================

const deleteRole = async (churchId, roleId) => {
  const role = await Role.findOne({
    _id: roleId,
    churchId,
    isActive: true,
  });

  if (!role) {
    throw new ApiError(404, "Role not found.");
  }

  if (role.isSystemRole) {
    throw new ApiError(403, "System roles cannot be deleted.");
  }

  role.isActive = false;

  await role.save();

  return role;
};

export default {
  createRole,
  getRoles,
  getRoleById,
  updateRole,
  deleteRole,
};
