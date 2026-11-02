import mongoose from "mongoose";

import Staff from "../models/Staff.js";
import Member from "../models/Member.js";

import ApiError from "../utils/ApiError.js";

// =====================================
// Create Staff
// =====================================

const createStaff = async (churchId, userId, data) => {
  // =====================================
  // Validate Church
  // =====================================

  if (!churchId) {
    throw new ApiError(400, "Church ID is required.");
  }

  if (!mongoose.Types.ObjectId.isValid(churchId)) {
    throw new ApiError(400, "Invalid church ID.");
  }

  // =====================================
  // Validate Creator
  // =====================================

  if (!userId) {
    throw new ApiError(400, "User ID is required.");
  }

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new ApiError(400, "Invalid user ID.");
  }

  // =====================================
  // Extract Data
  // =====================================

  const {
    memberId,
    department,
    role,
    serviceAreas,
    startDate,
    status,
    notes,
    userId: linkedUserId,
  } = data;

  // =====================================
  // Validate Member
  // =====================================

  if (!memberId) {
    throw new ApiError(400, "Member is required.");
  }

  if (!mongoose.Types.ObjectId.isValid(memberId)) {
    throw new ApiError(400, "Invalid member ID.");
  }

  // =====================================
  // Find Member
  // =====================================

  const member = await Member.findOne({
    _id: memberId,
    churchId,
  });

  if (!member) {
    throw new ApiError(404, "Member not found in this church.");
  }

  // =====================================
  // Validate Member Status
  // =====================================

  if (member.isActive === false) {
    throw new ApiError(400, "Inactive members cannot be assigned as staff.");
  }

  // =====================================
  // Prevent Duplicate Staff
  // =====================================

  const existingStaff = await Staff.findOne({
    churchId,
    memberId,
    isActive: true,
  });

  if (existingStaff) {
    throw new ApiError(400, "This member is already a staff member.");
  }

  // =====================================
  // Validate Linked User
  // =====================================

  if (linkedUserId && !mongoose.Types.ObjectId.isValid(linkedUserId)) {
    throw new ApiError(400, "Invalid linked user ID.");
  }

  // =====================================
  // Create Staff
  // =====================================

  const staff = await Staff.create({
    churchId,

    memberId,

    userId: linkedUserId || null,

    department: department?.trim() || undefined,

    role: role?.trim() || undefined,

    serviceAreas: Array.isArray(serviceAreas) ? serviceAreas : [],

    startDate,

    status: status || "ACTIVE",

    notes: notes?.trim() || undefined,

    createdBy: userId,

    isActive: true,
  });

  // =====================================
  // Populate Member
  // =====================================

  await staff.populate("memberId", "firstName lastName email phone gender");

  return staff;
};

// =====================================
// Get Staff
// Search + Filters + Pagination
// =====================================

const getStaff = async (churchId, query = {}) => {
  if (!churchId) {
    throw new ApiError(400, "Church ID is required.");
  }

  if (!mongoose.Types.ObjectId.isValid(churchId)) {
    throw new ApiError(400, "Invalid church ID.");
  }

  const { search = "", department, status, page = 1, limit = 10 } = query;

  const currentPage = Math.max(Number(page) || 1, 1);

  const pageLimit = Math.min(Math.max(Number(limit) || 10, 1), 100);

  const skip = (currentPage - 1) * pageLimit;

  // =====================================
  // Base Filter
  // =====================================

  const filter = {
    churchId,

    isActive: true,
  };

  // =====================================
  // Department Filter
  // =====================================

  if (department && department.trim()) {
    filter.department = {
      $regex: `^${department.trim()}$`,
      $options: "i",
    };
  }

  // =====================================
  // Status Filter
  // =====================================

  if (status) {
    filter.status = status;
  }

  // =====================================
  // Search
  // =====================================

  /*
   * Staff personal information now
   * lives on Member.
   *
   * Search therefore needs to include
   * populated member information.
   */

  let staffQuery = Staff.find(filter);

  if (search && search.trim()) {
    const searchRegex = new RegExp(search.trim(), "i");

    const matchingMembers = await Member.find({
      churchId,

      isActive: true,

      $or: [
        {
          firstName: searchRegex,
        },

        {
          lastName: searchRegex,
        },

        {
          email: searchRegex,
        },

        {
          phone: searchRegex,
        },
      ],
    }).select("_id");

    const memberIds = matchingMembers.map((member) => member._id);

    filter.$or = [
      {
        memberId: {
          $in: memberIds,
        },
      },

      {
        department: searchRegex,
      },

      {
        role: searchRegex,
      },
    ];
  }

  // =====================================
  // Query Staff
  // =====================================

  const [staff, total] = await Promise.all([
    Staff.find(filter)

      .populate("memberId", "firstName lastName email phone gender")

      .populate("userId", "firstName lastName email role")

      .populate("createdBy", "firstName lastName email")

      .sort({
        createdAt: -1,
      })

      .skip(skip)

      .limit(pageLimit)

      .lean(),

    Staff.countDocuments(filter),
  ]);

  // =====================================
  // Normalize Staff Response
  // =====================================

  const normalizedStaff = staff.map((record) => {
    const member = record.memberId;

    return {
      ...record,

      firstName: member?.firstName || "",

      lastName: member?.lastName || "",

      email: member?.email || "",

      phone: member?.phone || "",

      fullName: `${member?.firstName || ""} ${member?.lastName || ""}`.trim(),
    };
  });

  return {
    staff: normalizedStaff,

    pagination: {
      total,

      page: currentPage,

      limit: pageLimit,

      pages: Math.ceil(total / pageLimit),
    },
  };
};

// =====================================
// Get Single Staff
// =====================================

const getStaffById = async (churchId, staffId) => {
  if (!churchId) {
    throw new ApiError(400, "Church ID is required.");
  }

  if (!mongoose.Types.ObjectId.isValid(churchId)) {
    throw new ApiError(400, "Invalid church ID.");
  }

  if (!mongoose.Types.ObjectId.isValid(staffId)) {
    throw new ApiError(400, "Invalid staff ID.");
  }

  const staff = await Staff.findOne({
    _id: staffId,

    churchId,

    isActive: true,
  })

    .populate(
      "memberId",
      "firstName lastName email phone gender dateOfBirth address",
    )

    .populate("userId", "firstName lastName email role")

    .populate("createdBy", "firstName lastName email");

  if (!staff) {
    throw new ApiError(404, "Staff member not found.");
  }

  return staff;
};

// =====================================
// Update Staff
// =====================================

const updateStaff = async (churchId, staffId, data) => {
  if (!churchId) {
    throw new ApiError(400, "Church ID is required.");
  }

  if (!mongoose.Types.ObjectId.isValid(churchId)) {
    throw new ApiError(400, "Invalid church ID.");
  }

  if (!mongoose.Types.ObjectId.isValid(staffId)) {
    throw new ApiError(400, "Invalid staff ID.");
  }

  // =====================================
  // Allowed Staff Fields
  // =====================================

  const allowedFields = [
    "department",

    "role",

    "serviceAreas",

    "startDate",

    "status",

    "notes",

    "userId",
  ];

  const updateData = {};

  for (const field of allowedFields) {
    if (Object.prototype.hasOwnProperty.call(data, field)) {
      updateData[field] = data[field];
    }
  }

  // =====================================
  // Validate User
  // =====================================

  if (
    updateData.userId &&
    !mongoose.Types.ObjectId.isValid(updateData.userId)
  ) {
    throw new ApiError(400, "Invalid linked user ID.");
  }

  // =====================================
  // Clean String Fields
  // =====================================

  const stringFields = ["department", "role", "notes"];

  stringFields.forEach((field) => {
    if (updateData[field] !== undefined) {
      updateData[field] = String(updateData[field]).trim();
    }
  });

  // =====================================
  // Validate Service Areas
  // =====================================

  if (updateData.serviceAreas !== undefined) {
    if (!Array.isArray(updateData.serviceAreas)) {
      throw new ApiError(400, "Service areas must be an array.");
    }
  }

  // =====================================
  // Update
  // =====================================

  const staff = await Staff.findOneAndUpdate(
    {
      _id: staffId,

      churchId,

      isActive: true,
    },

    updateData,

    {
      new: true,

      runValidators: true,
    },
  )

    .populate("memberId", "firstName lastName email phone gender")

    .populate("userId", "firstName lastName email role")

    .populate("createdBy", "firstName lastName email");

  if (!staff) {
    throw new ApiError(404, "Staff member not found.");
  }

  return staff;
};

// =====================================
// Soft Delete / Archive Staff
// =====================================

const deleteStaff = async (churchId, staffId) => {
  if (!churchId) {
    throw new ApiError(400, "Church ID is required.");
  }

  if (!mongoose.Types.ObjectId.isValid(churchId)) {
    throw new ApiError(400, "Invalid church ID.");
  }

  if (!mongoose.Types.ObjectId.isValid(staffId)) {
    throw new ApiError(400, "Invalid staff ID.");
  }

  const staff = await Staff.findOneAndUpdate(
    {
      _id: staffId,

      churchId,

      isActive: true,
    },

    {
      isActive: false,

      status: "INACTIVE",
    },

    {
      new: true,
    },
  );

  if (!staff) {
    throw new ApiError(404, "Staff member not found.");
  }

  return staff;
};

// =====================================
// Staff Summary
// =====================================

const getStaffSummary = async (churchId) => {
  if (!churchId) {
    throw new ApiError(400, "Church ID is required.");
  }

  if (!mongoose.Types.ObjectId.isValid(churchId)) {
    throw new ApiError(400, "Invalid church ID.");
  }

  const churchObjectId = new mongoose.Types.ObjectId(churchId);

  const summary = await Staff.aggregate([
    {
      $match: {
        churchId: churchObjectId,

        isActive: true,
      },
    },

    {
      $group: {
        _id: null,

        totalStaff: {
          $sum: 1,
        },

        activeStaff: {
          $sum: {
            $cond: [
              {
                $eq: ["$status", "ACTIVE"],
              },

              1,

              0,
            ],
          },
        },

        inactiveStaff: {
          $sum: {
            $cond: [
              {
                $eq: ["$status", "INACTIVE"],
              },

              1,

              0,
            ],
          },
        },
      },
    },
  ]);

  const data = summary[0] || {
    totalStaff: 0,

    activeStaff: 0,

    inactiveStaff: 0,
  };

  return {
    totalStaff: Number(data.totalStaff) || 0,

    activeStaff: Number(data.activeStaff) || 0,

    inactiveStaff: Number(data.inactiveStaff) || 0,
  };
};

// =====================================
// Export
// =====================================

export default {
  createStaff,

  getStaff,

  getStaffById,

  updateStaff,

  deleteStaff,

  getStaffSummary,
};
