import mongoose from "mongoose";

const followUpSchema = new mongoose.Schema(
  {
    churchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Church",
      required: true,
      index: true,
    },


    // Existing visitor followup
    visitorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Visitor",
      index: true,
    },


    // NEW: Member followup
    memberId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
      index: true,
    },


    type: {
      type: String,
      enum: [
        "WELCOME",
        "DAY_3",
        "DAY_7",
        "CARE",
        "CHECK_IN",
        "ABSENT_MEMBER",
      ],
      required: true,
    },


    status: {
      type: String,
      enum: [
        "PENDING",
        "SENT",
        "FAILED",
        "COMPLETED",
      ],
      default: "PENDING",
    },


    message: {
      type: String,
      required: true,
      trim: true,
    },


    scheduledDate: {
      type: Date,
      required: true,
    },


    sentDate: {
      type: Date,
      default: null,
    },


    completedDate: {
      type: Date,
      default: null,
    },


    channel: {
      type: String,
      enum: [
        "SMS",
        "WHATSAPP",
        "EMAIL",
        "MANUAL",
      ],
      default: "SMS",
    },


    failureReason: {
      type: String,
      default: "",
    },


    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },


    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps:true,
  }
);


export default mongoose.model(
  "FollowUp",
  followUpSchema
);