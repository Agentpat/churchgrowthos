import mongoose from "mongoose";

const memberActivitySchema = new mongoose.Schema(
  {
    churchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Church",
      required: true,
    },

    memberId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
      required: true,
    },

    type: {
      type: String,

      enum: [
        // Member lifecycle
        "created",
        "updated",
        "deactivated",
        "reactivated",

        // Attendance
        "attendance",

        // Follow-up
        "followup",

        // Group activities
        "group_joined",
        "group_left",
        "leader_assigned",
        "leader_removed",
      ],

      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    performedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    // Optional data for future modules
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("MemberActivity", memberActivitySchema);
