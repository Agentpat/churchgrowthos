import groupService from "../services/groupService.js";

import asyncHandler from "../utils/asyncHandler.js";

// =====================================
// Create Group
// POST /api/groups
// =====================================

const createGroup = asyncHandler(async (req, res) => {
  const group = await groupService.createGroup(
    req.user.churchId,

    req.user.userId,

    req.body,
  );

  res.status(201).json({
    success: true,

    message: "Group created successfully.",

    data: group,
  });
});

// =====================================
// Get All Groups
// GET /api/groups
// =====================================

const getGroups = asyncHandler(async (req, res) => {
  const groups = await groupService.getGroups(req.user.churchId);

  res.status(200).json({
    success: true,

    count: groups.length,

    data: groups,
  });
});

// =====================================
// Get Single Group
// GET /api/groups/:id
// =====================================

const getGroup = asyncHandler(async (req, res) => {
  const group = await groupService.getGroupById(
    req.user.churchId,

    req.params.id,
  );

  res.status(200).json({
    success: true,

    data: group,
  });
});

// =====================================
// Update Group
// PUT /api/groups/:id
// =====================================

const updateGroup = asyncHandler(async (req, res) => {
  const group = await groupService.updateGroup(
    req.user.churchId,

    req.params.id,

    req.body,
  );

  res.status(200).json({
    success: true,

    message: "Group updated successfully.",

    data: group,
  });
});

// =====================================
// Deactivate Group
// PATCH /api/groups/:id/deactivate
// =====================================

const deactivateGroup = asyncHandler(async (req, res) => {
  const group = await groupService.deactivateGroup(
    req.user.churchId,

    req.params.id,
  );

  res.status(200).json({
    success: true,

    message: "Group deactivated successfully.",

    data: group,
  });
});

// =====================================
// Add Member To Group
// POST /api/groups/:groupId/members
// =====================================

const addMemberToGroup = asyncHandler(async (req, res) => {
  const { memberId, role } = req.body;

  const memberGroup = await groupService.addMemberToGroup(
    req.user.churchId,

    req.params.groupId,

    memberId,

    req.user.userId,

    role,
  );

  res.status(201).json({
    success: true,

    message: "Member added to group successfully.",

    data: memberGroup,
  });
});

// =====================================
// Remove Member From Group
// DELETE /api/groups/:groupId/members/:memberId
// =====================================

const removeMemberFromGroup = asyncHandler(async (req, res) => {
  const result = await groupService.removeMemberFromGroup(
    req.user.churchId,

    req.params.groupId,

    req.params.memberId,
  );

  res.status(200).json({
    success: true,

    message: "Member removed from group.",

    data: result,
  });
});
// =====================================
// Get Groups A Member Belongs To
// GET /api/groups/member/:memberId
// =====================================

const getMemberGroups = asyncHandler(async (req, res) => {
  const groups = await groupService.getMemberGroups(
    req.user.churchId,

    req.params.memberId,
  );

  res.status(200).json({
    success: true,

    count: groups.length,

    data: groups,
  });
});

// =====================================
// Get Members In A Group
// GET /api/groups/:groupId/members
// =====================================

const getGroupMembers = asyncHandler(async (req, res) => {
  const members = await groupService.getGroupMembers(
    req.user.churchId,

    req.params.groupId,
  );

  res.status(200).json({
    success: true,

    count: members.length,

    data: members,
  });
});

// =====================================
// Get Group Overview
// GET /api/groups/:groupId/overview
// =====================================

const getGroupOverview = asyncHandler(
async(req,res)=>{


  const overview =
    await groupService.getGroupOverview(

      req.user.churchId,

      req.params.groupId

    );



  res.status(200).json({

    success:true,

    data:overview

  });



});

export {
  createGroup,
  getGroups,
  getGroup,
  getGroupOverview,
  updateGroup,
  deactivateGroup,
  addMemberToGroup,
  removeMemberFromGroup,
  getMemberGroups,
  getGroupMembers,
};
