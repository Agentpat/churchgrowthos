import mongoose from "mongoose";

import Member from "../models/Member.js";
import Attendance from "../models/Attendance.js";
import FollowUp from "../models/FollowUp.js";
import MemberActivity from "../models/MemberActivity.js";
import MemberGroup from "../models/MemberGroup.js";

import ApiError from "../utils/ApiError.js";

// =====================================
// Create Member
// =====================================

const createMember = async (churchId, data, performedBy = null) => {
  const { firstName, lastName, phone } = data;

  if (!firstName || !lastName || !phone) {
    throw new ApiError(400, "First name, last name and phone are required.");
  }

  const existingMember = await Member.findOne({
    churchId,
    phone,
  });

  if (existingMember) {
    throw new ApiError(400, "Member with this phone number already exists.");
  }

  const member = await Member.create({
    churchId,

    ...data,

    isActive: true,

    deactivatedAt: null,
  });

  await MemberActivity.create({
    churchId,

    memberId: member._id,

    type: "created",

    title: "Member created",

    description: `${member.firstName} ${member.lastName} was added as a new member.`,

    performedBy,
  });

  return member;
};

// =====================================
// Get All Members
// =====================================

const getMembers = async (churchId, queryParams) => {
  const { page = 1, limit = 20, search = "", status } = queryParams;

  const pageNumber = Number(page);

  const limitNumber = Number(limit);

  const skip = (pageNumber - 1) * limitNumber;

  const filter = {
    churchId: new mongoose.Types.ObjectId(churchId),
  };

  if (status) {
    filter.isActive = status === "active";
  }

  if (search) {
    filter.$or = [
      {
        firstName: {
          $regex: search,
          $options: "i",
        },
      },

      {
        lastName: {
          $regex: search,
          $options: "i",
        },
      },

      {
        phone: {
          $regex: search,
          $options: "i",
        },
      },

      {
        email: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  const members = await Member.aggregate([
    {
      $match: filter,
    },

    {
      $sort: {
        createdAt: -1,
      },
    },

    {
      $skip: skip,
    },

    {
      $limit: limitNumber,
    },

    // Attendance count
    {
      $lookup: {
        from: "attendances",

        let: {
          memberId: "$_id",
        },

        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $eq: ["$memberId", "$$memberId"],
                  },

                  {
                    $eq: ["$status", "PRESENT"],
                  },
                ],
              },
            },
          },
        ],

        as: "attendanceRecords",
      },
    },

    // Follow up count
    {
      $lookup: {
        from: "followups",

        localField: "_id",

        foreignField: "memberId",

        as: "followUpRecords",
      },
    },

    // Active groups count
    {
      $lookup: {
        from: "membergroups",

        let: {
          memberId: "$_id",
        },

        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $eq: ["$memberId", "$$memberId"],
                  },

                  {
                    $eq: ["$status", "ACTIVE"],
                  },
                ],
              },
            },
          },
        ],

        as: "groupRecords",
      },
    },

    {
      $addFields: {
        attendanceCount: {
          $size: "$attendanceRecords",
        },

        followUps: {
          $size: "$followUpRecords",
        },

        groupsCount: {
          $size: "$groupRecords",
        },
      },
    },

    {
      $project: {
        attendanceRecords: 0,

        followUpRecords: 0,

        groupRecords: 0,
      },
    },
  ]);

  const total = await Member.countDocuments(filter);

  return {
    members,

    pagination: {
      total,

      page: pageNumber,

      limit: limitNumber,

      pages: Math.ceil(total / limitNumber),
    },
  };
};

// =====================================
// Get Single Member Details
// =====================================

const getMemberById = async (churchId, memberId) => {
  const member = await Member.findOne({
    _id: memberId,

    churchId,
  });

  if (!member) {
    throw new ApiError(404, "Member not found.");
  }

  const attendanceCount = await Attendance.countDocuments({
    memberId,

    status: "PRESENT",
  });

  const followUps = await FollowUp.countDocuments({
    memberId,
  });

  const groupsCount = await MemberGroup.countDocuments({
    memberId,

    status: "ACTIVE",
  });

  const groups = await MemberGroup.find({
    memberId,

    churchId,

    status: "ACTIVE",
  })
    .populate("groupId", "name type")
    .sort({
      createdAt: -1,
    });

  const activities = await MemberActivity.find({
    churchId,

    memberId,
  })
    .sort({
      createdAt: -1,
    })
    .limit(10)
    .populate("performedBy", "firstName lastName");

  return {
    ...member.toObject(),

    attendanceCount,

    followUps,

    groupsCount,

    groups,

    activities,
  };
};

// =====================================
// Update Member
// =====================================

const updateMember = async (churchId, memberId, data, performedBy = null) => {
  const member = await Member.findOneAndUpdate(
    {
      _id: memberId,

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

  if (!member) {
    throw new ApiError(404, "Member not found.");
  }

  await MemberActivity.create({
    churchId,

    memberId: member._id,

    type: "updated",

    title: "Profile updated",

    description: `${member.firstName} ${member.lastName}'s profile was updated.`,

    performedBy,
  });

  return member;
};

// =====================================
// Deactivate Member
// =====================================

const deactivateMember = async (churchId, memberId, performedBy = null) => {
  const member = await Member.findOneAndUpdate(
    {
      _id: memberId,

      churchId,
    },

    {
      $set: {
        isActive: false,

        deactivatedAt: new Date(),
      },
    },

    {
      new: true,
    },
  );

  if (!member) {
    throw new ApiError(404, "Member not found.");
  }

  await MemberActivity.create({
    churchId,

    memberId: member._id,

    type: "deactivated",

    title: "Member deactivated",

    description: `${member.firstName} ${member.lastName} was deactivated.`,

    performedBy,
  });

  return member;
};

// =====================================
// Reactivate Member
// =====================================

const reactivateMember = async (churchId, memberId, performedBy = null) => {
  const member = await Member.findOneAndUpdate(
    {
      _id: memberId,

      churchId,
    },

    {
      $set: {
        isActive: true,

        deactivatedAt: null,
      },
    },

    {
      new: true,
    },
  );

  if (!member) {
    throw new ApiError(404, "Member not found.");
  }

  await MemberActivity.create({
    churchId,

    memberId: member._id,

    type: "reactivated",

    title: "Member reactivated",

    description: `${member.firstName} ${member.lastName} was reactivated.`,

    performedBy,
  });

  return member;
};

export default {
  createMember,

  getMembers,

  getMemberById,

  updateMember,

  deactivateMember,

  reactivateMember,
};
