import mongoose from "mongoose";

const memberSchema = new mongoose.Schema(
  {
    // Tenant isolation
    churchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Church",
      required: true,
      index: true,
    },

    // Personal Information
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
      lowercase: true,
      trim: true,
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

    address: {
      type: String,
      trim: true,
      default: "",
    },

    // Church Relationship
    membershipStatus: {
      type: String,
      enum: ["FIRST_TIMER", "MEMBER", "WORKER", "LEADER", "INACTIVE"],
      default: "MEMBER",
    },

    joinedDate: {
      type: Date,
      default: Date.now,
    },

    lastAttendance: {
      type: Date,
      default: null,
    },

    // Future automation fields
    followUpStatus: {
      type: String,
      enum: ["PENDING", "CONTACTED", "COMPLETED"],
      default: "PENDING",
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

const Member = mongoose.model("Member", memberSchema);

export default Member;
