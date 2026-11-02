import roleService from "../services/roleService.js";
import asyncHandler from "../utils/asyncHandler.js";

// =====================================
// Create Role
// POST /api/roles
// =====================================

const createRole = asyncHandler(async (req, res) => {
  const role = await roleService.createRole(req.user.churchId, req.body);

  res.status(201).json({
    success: true,
    message: "Role created successfully.",
    data: role,
  });
});

// =====================================
// Get All Roles
// GET /api/roles
// =====================================

const getRoles = asyncHandler(async (req, res) => {
  const roles = await roleService.getRoles(req.user.churchId);

  res.status(200).json({
    success: true,
    data: roles,
  });
});

// =====================================
// Get Single Role
// GET /api/roles/:id
// =====================================

const getRole = asyncHandler(async (req, res) => {
  const role = await roleService.getRoleById(req.user.churchId, req.params.id);

  res.status(200).json({
    success: true,
    data: role,
  });
});

// =====================================
// Update Role
// PUT /api/roles/:id
// =====================================

const updateRole = asyncHandler(async (req, res) => {
  const role = await roleService.updateRole(
    req.user.churchId,
    req.params.id,
    req.body,
  );

  res.status(200).json({
    success: true,
    message: "Role updated successfully.",
    data: role,
  });
});

// =====================================
// Delete Role
// DELETE /api/roles/:id
// =====================================

const deleteRole = asyncHandler(async (req, res) => {
  await roleService.deleteRole(req.user.churchId, req.params.id);

  res.status(200).json({
    success: true,
    message: "Role deleted successfully.",
  });
});

export { createRole, getRoles, getRole, updateRole, deleteRole };
