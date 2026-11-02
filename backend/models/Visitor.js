import mongoose from "mongoose";

const visitorSchema = new mongoose.Schema(
  {
    churchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Church",
      required: true,
      index: true,
    },

    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: "",
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    gender: {
      type: String,
      enum: ["MALE", "FEMALE"],
      default: null,
    },

    dateOfBirth: {
      type: Date,
      default: null,
    },

    maritalStatus: {
      type: String,
      enum: ["SINGLE", "MARRIED", "DIVORCED", "WIDOWED"],
      default: null,
    },

    occupation: {
      type: String,
      trim: true,
      default: "",
    },

    address: {
      type: String,
      trim: true,
      default: "",
    },

    visitDate: {
      type: Date,
      default: Date.now,
    },

    serviceAttended: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      default: null,
    },

    source: {
      type: String,
      enum: ["SERVICE", "ONLINE", "EVENT", "REFERRAL", "OUTREACH", "OTHER"],
      default: "SERVICE",
    },

    invitedBy: {
      type: String,
      trim: true,
      default: "",
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    status: {
      type: String,
      enum: ["NEW", "FOLLOW_UP", "RETURNING", "CONVERTED", "ARCHIVED"],
      default: "NEW",
      index: true,
    },

    followUpStage: {
      type: String,
      enum: ["WELCOME", "DAY_3", "DAY_7", "COMPLETED"],
      default: "WELCOME",
    },

    lastFollowUpDate: {
      type: Date,
      default: null,
    },

    prayerRequests: {
      type: String,
      default: "",
    },

    notes: {
      type: String,
      default: "",
    },

    memberId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
      default: null,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Visitor", visitorSchema);
