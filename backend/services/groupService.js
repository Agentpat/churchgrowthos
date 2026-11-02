import Group from "../models/Group.js";
import MemberGroup from "../models/MemberGroup.js";
import Member from "../models/Member.js";

import memberActivityService from "./memberActivityService.js";

import ApiError from "../utils/ApiError.js";

// =====================================
// Create Group
// =====================================

const createGroup = async (churchId, userId, data) => {
  const { name, description, type, leader } = data;

  if (!name) {
    throw new ApiError(400, "Group name is required.");
  }

  const existingGroup = await Group.findOne({
    churchId,
    name,
  });

  if (existingGroup) {
    throw new ApiError(400, "Group already exists.");
  }

  const group = await Group.create({
    churchId,

    name,

    description,

    type,

    leader: leader || null,

    createdBy: userId,
  });

  return group;
};

// =====================================
// Get All Groups
// =====================================

const getGroups = async (churchId) => {
  const groups = await Group.find({
    churchId,

    isActive: true,
  }).sort({
    createdAt: -1,
  });

  const groupsWithData = await Promise.all(
    groups.map(async (group) => {
      const members = await MemberGroup.find({
        churchId,

        groupId: group._id,

        status: "ACTIVE",
      }).populate("memberId", "firstName lastName");

      const leader = members.find((item) => item.role === "LEADER");

      return {
        ...group.toObject(),

        leader: leader?.memberId || null,

        memberCount: members.length,
      };
    }),
  );

  return groupsWithData;
};

// =====================================
// Get Single Group
// =====================================

const getGroupById = async (churchId, groupId) => {
  const group = await Group.findOne({
    _id: groupId,

    churchId,
  }).populate("leader", "firstName lastName phone email");

  if (!group) {
    throw new ApiError(404, "Group not found.");
  }

  const members = await MemberGroup.find({
    churchId,

    groupId,

    status: "ACTIVE",
  }).populate("memberId", "firstName lastName phone email membershipStatus");

  const leaders = members.filter((item) => item.role === "LEADER");

  return {
    ...group.toObject(),

    memberCount: members.length,

    leaders,

    primaryLeader: leaders[0]?.memberId || null,
  };
};

// =====================================
// Update Group
// =====================================

const updateGroup = async (churchId, groupId, data) => {
  const group = await Group.findOneAndUpdate(
    {
      _id: groupId,
      churchId,
    },

    {
      $set: data,
    },

    {
      new: true,
      runValidators: true,
    },
  );

  if (!group) {
    throw new ApiError(404, "Group not found.");
  }

  return group;
};

// =====================================
// Deactivate Group
// =====================================

const deactivateGroup = async (churchId, groupId) => {
  const group = await Group.findOneAndUpdate(
    {
      _id: groupId,
      churchId,
    },

    {
      isActive: false,
    },

    {
      new: true,
    },
  );

  if (!group) {
    throw new ApiError(404, "Group not found.");
  }

  return group;
};

// =====================================
// Add Member To Group
// =====================================

const addMemberToGroup = async (
  churchId,
  groupId,
  memberId,
  userId,
  role = "MEMBER",
) => {
  const group = await Group.findOne({
    _id: groupId,

    churchId,

    isActive: true,
  });

  if (!group) {
    throw new ApiError(404, "Group not found.");
  }

  const member = await Member.findOne({
    _id: memberId,

    churchId,

    isActive: true,
  });

  if (!member) {
    throw new ApiError(404, "Member not found.");
  }

  const existing = await MemberGroup.findOne({
    memberId,

    groupId,
  });

  if (existing) {
    throw new ApiError(400, "Member already belongs to this group.");
  }

  const memberGroup = await MemberGroup.create({
    churchId,

    memberId,

    groupId,

    role,

    assignedBy: userId,
  });

  // Sync leader

  if (role === "LEADER") {
    await Group.findByIdAndUpdate(
      groupId,

      {
        leader: memberId,
      },
    );
  }

  // Create activity

  await memberActivityService.logGroupJoined({
    churchId,

    memberId,

    performedBy: userId,

    memberName: `${member.firstName} ${member.lastName}`,

    groupId,

    groupName: group.name,
  });

  return memberGroup;
};

// =====================================
// Remove Member From Group
// =====================================

const removeMemberFromGroup = async (churchId, groupId, memberId, userId) => {
  const memberGroup = await MemberGroup.findOne({
    churchId,

    groupId,

    memberId,
  })
    .populate("memberId", "firstName lastName")
    .populate("groupId", "name");

  if (!memberGroup) {
    throw new ApiError(404, "Member group relationship not found.");
  }

  await MemberGroup.findByIdAndDelete(memberGroup._id);

  await memberActivityService.logGroupLeft({
    churchId,

    memberId,

    performedBy: userId,

    memberName: `${memberGroup.memberId.firstName} ${memberGroup.memberId.lastName}`,

    groupId,

    groupName: memberGroup.groupId.name,
  });

  if (memberGroup.role === "LEADER") {
    await Group.findByIdAndUpdate(
      groupId,

      {
        leader: null,
      },
    );
  }

  return memberGroup;
};

// =====================================
// Get Member Groups
// =====================================

const getMemberGroups = async (churchId, memberId) => {
  return await MemberGroup.find({
    churchId,

    memberId,

    status: "ACTIVE",
  })
    .populate("groupId")
    .sort({
      createdAt: -1,
    });
};

// =====================================
// Get Group Members
// =====================================

const getGroupMembers = async (churchId, groupId) => {
  return await MemberGroup.find({
    churchId,

    groupId,

    status: "ACTIVE",
  })
    .populate("memberId", "firstName lastName phone email membershipStatus")
    .populate("assignedBy", "firstName lastName")
    .sort({
      createdAt: -1,
    });
};

// =====================================
// Group Overview
// =====================================

const getGroupOverview = async (churchId, groupId) => {
  const group = await getGroupById(churchId, groupId);

  const members = await getGroupMembers(churchId, groupId);

  const leaders = members.filter((item) => item.role === "LEADER");

  return {
    group,

    leader: leaders[0]?.memberId || null,

    stats: {
      totalMembers: members.length,

      leaders: leaders.length,

      activeMembers: members.filter(
        (item) => item.memberId?.membershipStatus === "ACTIVE",
      ).length,
    },

    recentMembers: members.slice(0, 5),
  };
};

export default {
  createGroup,

  getGroups,

  getGroupById,

  getGroupOverview,

  updateGroup,

  deactivateGroup,

  addMemberToGroup,

  removeMemberFromGroup,

  getMemberGroups,

  getGroupMembers,
};
