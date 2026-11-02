import MemberActivity from "../models/MemberActivity.js";

import ApiError from "../utils/ApiError.js";

// =====================================
// Create member activity (single or bulk)
// =====================================

const createActivity = async (data) => {
  // Bulk activity creation

  if (Array.isArray(data)) {
    if (!data.length) {
      throw new ApiError(400, "Activity data is empty.");
    }

    return await MemberActivity.insertMany(data);
  }

  // Single activity creation

  const { churchId, memberId, type, title } = data;

  if (!churchId || !memberId || !type || !title) {
    throw new ApiError(400, "Activity data is incomplete.");
  }

  return await MemberActivity.create(data);
};

// =====================================
// Get member activity timeline
// =====================================

const getMemberActivities = async (churchId, memberId) => {
  const activities = await MemberActivity.find({
    churchId,

    memberId,
  })

    .sort({
      createdAt: -1,
    })

    .populate("performedBy", "firstName lastName");

  return activities;
};

// =====================================
// Member Activities
// =====================================

const logMemberCreated = async ({
  churchId,
  memberId,
  performedBy,
  memberName,
}) => {
  return createActivity({
    churchId,

    memberId,

    type: "created",

    title: "Member created",

    description: `${memberName} joined the church.`,

    performedBy,
  });
};

const logMemberUpdated = async ({
  churchId,
  memberId,
  performedBy,
  memberName,
}) => {
  return createActivity({
    churchId,

    memberId,

    type: "updated",

    title: "Profile updated",

    description: `${memberName}'s profile was updated.`,

    performedBy,
  });
};

const logMemberDeactivated = async ({
  churchId,
  memberId,
  performedBy,
  memberName,
}) => {
  return createActivity({
    churchId,

    memberId,

    type: "deactivated",

    title: "Member deactivated",

    description: `${memberName} was deactivated.`,

    performedBy,
  });
};

const logMemberReactivated = async ({
  churchId,
  memberId,
  performedBy,
  memberName,
}) => {
  return createActivity({
    churchId,

    memberId,

    type: "reactivated",

    title: "Member reactivated",

    description: `${memberName} became active again.`,

    performedBy,
  });
};

// =====================================
// Attendance Activity
// =====================================

const logAttendance = async ({ churchId, memberId, performedBy }) => {
  return createActivity({
    churchId,

    memberId,

    type: "attendance",

    title: "Attended Sunday Service",

    description: "Member attended a church service.",

    performedBy,
  });
};

// =====================================
// Group Activities
// =====================================

// Member added to group

const logGroupJoined = async ({
  churchId,
  memberId,
  performedBy,
  memberName,
  groupId,
  groupName,
}) => {
  return createActivity({
    churchId,

    memberId,

    type: "group_joined",

    title: "Joined group",

    description: `${memberName} joined ${groupName}.`,

    performedBy,

    metadata: {
      groupId,

      groupName,
    },
  });
};

// Member removed from group

const logGroupLeft = async ({
  churchId,
  memberId,
  performedBy,
  memberName,
  groupId,
  groupName,
}) => {
  return createActivity({
    churchId,

    memberId,

    type: "group_left",

    title: "Left group",

    description: `${memberName} was removed from ${groupName}.`,

    performedBy,

    metadata: {
      groupId,

      groupName,
    },
  });
};

// Member assigned as leader

const logLeaderAssigned = async ({
  churchId,
  memberId,
  performedBy,
  memberName,
  groupId,
  groupName,
}) => {
  return createActivity({
    churchId,

    memberId,

    type: "leader_assigned",

    title: "Assigned as group leader",

    description: `${memberName} became leader of ${groupName}.`,

    performedBy,

    metadata: {
      groupId,

      groupName,
    },
  });
};

// Leader removed

const logLeaderRemoved = async ({
  churchId,
  memberId,
  performedBy,
  memberName,
  groupId,
  groupName,
}) => {
  return createActivity({
    churchId,

    memberId,

    type: "leader_removed",

    title: "Removed as group leader",

    description: `${memberName} is no longer leader of ${groupName}.`,

    performedBy,

    metadata: {
      groupId,

      groupName,
    },
  });
};

export default {
  createActivity,

  getMemberActivities,

  // Member

  logMemberCreated,

  logMemberUpdated,

  logMemberDeactivated,

  logMemberReactivated,

  // Attendance

  logAttendance,

  // Groups

  logGroupJoined,

  logGroupLeft,

  logLeaderAssigned,

  logLeaderRemoved,
};
