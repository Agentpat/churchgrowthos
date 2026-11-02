import Visitor from "../models/Visitor.js";
import Member from "../models/Member.js";
import Attendance from "../models/Attendance.js";
import AttendanceSession from "../models/AttendanceSession.js";
import Service from "../models/Service.js";

import followUpService from "./followUpService.js";

import ApiError from "../utils/ApiError.js";

// =====================================
// Check In Visitor
// =====================================
// Operational visitor attendance flow.
//
// This is intentionally separate from
// createVisitor().
//
// createVisitor()
// = creates a visitor CRM record
//
// checkInVisitor()
// = records a visitor's presence for
//   the current service
//
// Flow:
//
// OPEN SESSION
//      ↓
// Validate service
//      ↓
// Validate visitor information
//      ↓
// Find existing visitor by phone
//      ↓
// Create visitor if necessary
//      ↓
// Prevent duplicate attendance
//      ↓
// Create VISITOR attendance
//      ↓
// Return visitor + attendance
// =====================================

const checkInVisitor = async (churchId, userId, data) => {
  const {
    serviceId,
    firstName,
    lastName,
    phone,
    email = "",
    gender = null,
    source = "SERVICE",
    invitedBy = "",
    notes = "",
  } = data;

  // =====================================
  // Validate Required Information
  // =====================================

  if (!serviceId || !firstName || !lastName || !phone) {
    throw new ApiError(
      400,
      "Service, first name, last name and phone are required.",
    );
  }

  // =====================================
  // Find Service
  // =====================================

  const service = await Service.findOne({
    _id: serviceId,
    churchId,
    isActive: true,
  });

  if (!service) {
    throw new ApiError(404, "Service not found.");
  }

  // =====================================
  // Find Attendance Session
  // =====================================

  const session = await AttendanceSession.findOne({
    churchId,
    serviceId,
  });

  if (!session) {
    throw new ApiError(404, "Attendance session not found.");
  }

  // =====================================
  // Session Must Be Open
  // =====================================

  if (session.status !== "OPEN") {
    throw new ApiError(
      400,
      "Attendance is not currently open for this service.",
    );
  }

  // =====================================
  // Find Existing Visitor
  // =====================================
  // Phone number is the primary lookup
  // for a returning visitor.
  // =====================================

  let visitor = await Visitor.findOne({
    churchId,
    phone,
    isActive: true,
  });

  let visitorCreated = false;

  // =====================================
  // Create Visitor If New
  // =====================================

  if (!visitor) {
    visitor = await Visitor.create({
      churchId,

      firstName,

      lastName,

      phone,

      email,

      gender,

      source,

      invitedBy,

      notes,

      visitDate: new Date(),

      serviceAttended: service._id,

      status: "NEW",

      followUpStage: "WELCOME",

      isActive: true,
    });

    visitorCreated = true;

    // =====================================
    // Create Follow-up Sequence
    // =====================================

    await followUpService.createVisitorFollowUps(churchId, visitor._id, userId);
  }

  // =====================================
  // Existing Visitor
  // =====================================

  if (!visitorCreated) {
    visitor.visitDate = new Date();

    visitor.serviceAttended = service._id;

    // A returning visitor should no longer
    // remain NEW after another visit.

    if (visitor.status === "NEW") {
      visitor.status = "RETURNING";
    }

    await visitor.save();
  }

  // =====================================
  // Prevent Duplicate Visitor Check-in
  // =====================================

  const existingAttendance = await Attendance.findOne({
    churchId,
    serviceId,
    visitorId: visitor._id,
  });

  if (existingAttendance) {
    return {
      alreadyCheckedIn: true,

      visitorCreated,

      visitor,

      attendance: existingAttendance,
    };
  }

  // =====================================
  // Create Visitor Attendance
  // =====================================

  const attendance = await Attendance.create({
    churchId,

    serviceId,

    visitorId: visitor._id,

    personType: "VISITOR",

    status: "PRESENT",

    checkInMethod: "MANUAL",

    recordedBy: userId,

    checkedInAt: new Date(),

    notes,
  });

  // =====================================
  // Update Service Statistics
  // =====================================

  service.totalAttendance = (service.totalAttendance || 0) + 1;

  service.firstTimers = (service.firstTimers || 0) + 1;

  await service.save();

  // =====================================
  // Return Result
  // =====================================

  return {
    alreadyCheckedIn: false,

    visitorCreated,

    visitor,

    attendance,
  };
};

// =====================================
// Create Visitor
// =====================================

const createVisitor = async (churchId, data, performedBy = null) => {
  const { firstName, lastName, phone } = data;

  if (!firstName || !lastName || !phone) {
    throw new ApiError(400, "First name, last name and phone are required.");
  }

  const existingVisitor = await Visitor.findOne({
    churchId,
    phone,
    isActive: true,
  });

  if (existingVisitor) {
    throw new ApiError(400, "Visitor with this phone number already exists.");
  }

  const visitor = await Visitor.create({
    churchId,

    ...data,

    status: "NEW",

    isActive: true,
  });

  // =====================================
  // Automatically Create Follow-up
  // =====================================

  await followUpService.createVisitorFollowUps(
    churchId,
    visitor._id,
    performedBy,
  );

  return visitor;
};

// =====================================
// Get Visitors
// =====================================

const getVisitors = async (churchId, queryParams) => {
  const { page = 1, limit = 20, search = "", status } = queryParams;

  const pageNumber = Number(page);

  const limitNumber = Number(limit);

  const skip = (pageNumber - 1) * limitNumber;

  const filter = {
    churchId,

    isActive: true,
  };

  if (status) {
    filter.status = status;
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

  const visitors = await Visitor.find(filter)
    .sort({
      createdAt: -1,
    })
    .skip(skip)
    .limit(limitNumber);

  const total = await Visitor.countDocuments(filter);

  return {
    visitors,

    pagination: {
      total,

      page: pageNumber,

      limit: limitNumber,

      pages: Math.ceil(total / limitNumber),
    },
  };
};

// =====================================
// Get Single Visitor
// =====================================

const getVisitorById = async (churchId, visitorId) => {
  const visitor = await Visitor.findOne({
    _id: visitorId,

    churchId,

    isActive: true,
  });

  if (!visitor) {
    throw new ApiError(404, "Visitor not found.");
  }

  return visitor;
};

// =====================================
// Update Visitor
// =====================================

const updateVisitor = async (churchId, visitorId, data) => {
  const visitor = await Visitor.findOneAndUpdate(
    {
      _id: visitorId,

      churchId,

      isActive: true,
    },

    {
      $set: data,
    },

    {
      new: true,

      runValidators: true,
    },
  );

  if (!visitor) {
    throw new ApiError(404, "Visitor not found.");
  }

  return visitor;
};

// =====================================
// Archive Visitor
// =====================================

const archiveVisitor = async (churchId, visitorId) => {
  const visitor = await Visitor.findOneAndUpdate(
    {
      _id: visitorId,

      churchId,
    },

    {
      $set: {
        status: "ARCHIVED",

        isActive: false,
      },
    },

    {
      new: true,
    },
  );

  if (!visitor) {
    throw new ApiError(404, "Visitor not found.");
  }

  return visitor;
};

// =====================================
// Convert Visitor To Member
// =====================================

const convertVisitorToMember = async (
  churchId,
  visitorId,
  performedBy = null,
) => {
  const visitor = await Visitor.findOne({
    _id: visitorId,

    churchId,

    isActive: true,
  });

  if (!visitor) {
    throw new ApiError(404, "Visitor not found.");
  }

  if (visitor.memberId) {
    throw new ApiError(400, "Visitor already converted.");
  }

  const member = await Member.create({
    churchId,

    firstName: visitor.firstName,

    lastName: visitor.lastName,

    email: visitor.email,

    phone: visitor.phone,

    gender: visitor.gender,

    address: visitor.address,

    occupation: visitor.occupation,

    membershipStatus: "MEMBER",
  });

  visitor.status = "CONVERTED";

  visitor.memberId = member._id;

  await visitor.save();

  return {
    visitor,

    member,
  };
};

// =====================================
// Export
// =====================================

export default {
  checkInVisitor,

  createVisitor,

  getVisitors,

  getVisitorById,

  updateVisitor,

  archiveVisitor,

  convertVisitorToMember,
};
