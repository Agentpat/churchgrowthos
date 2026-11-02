import FollowUp from "../models/FollowUp.js";
import Visitor from "../models/Visitor.js";
import Member from "../models/Member.js";

import ApiError from "../utils/ApiError.js";

// =====================================
// Create visitor follow-up sequence
// =====================================

const createVisitorFollowUps = async (churchId, visitorId, userId) => {
  const visitor = await Visitor.findOne({
    _id: visitorId,

    churchId,

    isActive: true,
  });

  if (!visitor) {
    throw new ApiError(404, "Visitor not found.");
  }

  const now = new Date();

  const day3 = new Date(now);

  day3.setDate(day3.getDate() + 3);

  const day7 = new Date(now);

  day7.setDate(day7.getDate() + 7);

  const followUps = await FollowUp.insertMany([
    {
      churchId,

      visitorId,

      type: "WELCOME",

      message: `Hello ${visitor.firstName}, welcome to our church. We are excited to have you worship with us.`,

      scheduledDate: now,

      channel: "SMS",

      createdBy: userId,
    },

    {
      churchId,

      visitorId,

      type: "DAY_3",

      message: `Hello ${visitor.firstName}, we hope you enjoyed your time with us. We would love to connect with you.`,

      scheduledDate: day3,

      channel: "SMS",

      createdBy: userId,
    },

    {
      churchId,

      visitorId,

      type: "DAY_7",

      message: `Hello ${visitor.firstName}, we would love to see you again this Sunday.`,

      scheduledDate: day7,

      channel: "SMS",

      createdBy: userId,
    },
  ]);

  return followUps;
};

// =====================================
// Create member follow-up
// =====================================

const createMemberFollowUp = async (churchId, memberId, data, userId) => {
  const member = await Member.findOne({
    _id: memberId,

    churchId,

    isActive: true,
  });

  if (!member) {
    throw new ApiError(404, "Member not found.");
  }

  if (!data.message) {
    throw new ApiError(400, "Follow-up message is required.");
  }

  const followUp = await FollowUp.create({
    churchId,

    memberId,

    type: data.type || "CARE",

    message: data.message,

    scheduledDate: data.scheduledDate || new Date(),

    channel: data.channel || "MANUAL",

    createdBy: userId,
  });

  return followUp;
};

// =====================================
// Get pending follow-ups
// =====================================

const getPendingFollowUps = async (churchId) => {
  const followUps = await FollowUp.find({
    churchId,

    status: "PENDING",

    isActive: true,

    scheduledDate: {
      $lte: new Date(),
    },
  })

    .populate("visitorId", "firstName lastName phone email")

    .populate("memberId", "firstName lastName phone email")

    .sort({
      scheduledDate: 1,
    });

  return followUps;
};

// =====================================
// Get member follow-up history
// =====================================

const getMemberFollowUps = async (churchId, memberId) => {
  const followUps = await FollowUp.find({
    churchId,

    memberId,

    isActive: true,
  })

    .populate("createdBy", "firstName lastName")

    .sort({
      scheduledDate: -1,
    });

  return followUps;
};

// =====================================
// Get visitor follow-up history
// =====================================

const getVisitorFollowUps = async (
  churchId,
  visitorId,
) => {

  const followUps = await FollowUp.find({
    churchId,

    visitorId,

    isActive: true,
  })

    .populate(
      "createdBy",
      "firstName lastName",
    )

    .sort({
      scheduledDate: -1,
    });

  return followUps;

};

// =====================================
// Mark follow-up as sent
// =====================================

const markAsSent = async (churchId, followUpId) => {
  const followUp = await FollowUp.findOneAndUpdate(
    {
      _id: followUpId,

      churchId,
    },

    {
      status: "SENT",

      sentDate: new Date(),
    },

    {
      new: true,
    },
  )

    .populate("memberId", "firstName lastName")

    .populate("visitorId", "firstName lastName");

  if (!followUp) {
    throw new ApiError(404, "Follow-up not found.");
  }

  return followUp;
};

// =====================================
// Mark follow-up as failed
// =====================================

const markAsFailed = async (churchId, followUpId, reason) => {
  const followUp = await FollowUp.findOneAndUpdate(
    {
      _id: followUpId,

      churchId,
    },

    {
      status: "FAILED",

      failureReason: reason || "Unknown reason",
    },

    {
      new: true,
    },
  )

    .populate("memberId", "firstName lastName")

    .populate("visitorId", "firstName lastName");

  if (!followUp) {
    throw new ApiError(404, "Follow-up not found.");
  }

  return followUp;
};

export default {
  createVisitorFollowUps,

  createMemberFollowUp,

  getPendingFollowUps,

  getMemberFollowUps,

  getVisitorFollowUps,

  markAsSent,

  markAsFailed,
};
