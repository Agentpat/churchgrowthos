import MemberActivity from "../models/MemberActivity.js";

// =====================================
// Create Activity
// =====================================

const createActivity = async ({
  churchId,
  memberId,
  type,
  title,
  description = "",
  performedBy,
  metadata = {},
}) => {
  const activity = await MemberActivity.create({
    churchId,

    memberId,

    type,

    title,

    description,

    performedBy,

    metadata,
  });

  return activity;
};

// =====================================
// Get Member Activities
// =====================================

const getMemberActivities = async (churchId, memberId) => {
  const activities = await MemberActivity.find({
    churchId,

    memberId,
  })

    .sort({
      createdAt: -1,
    })

    .populate("performedBy", "firstName lastName email");

  return activities;
};

// =====================================
// Member Created
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

// =====================================
// Member Updated
// =====================================

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

// =====================================
// Member Deactivated
// =====================================

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

// =====================================
// Member Reactivated
// =====================================

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
// Attendance
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
// Group Joined
// =====================================

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

// =====================================
// Group Left
// =====================================

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

    title: "Removed from group",

    description: `${memberName} was removed from ${groupName}.`,

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
};
