import mongoose from "mongoose";

const memberGroupSchema = new mongoose.Schema(
  {
    churchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Church",
      required: true,
      index: true,
    },

    memberId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
      required: true,
      index: true,
    },

    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
      required: true,
      index: true,
    },

    role: {
      type: String,

      enum: ["MEMBER", "LEADER", "ASSISTANT"],

      default: "MEMBER",
    },

    joinedDate: {
      type: Date,

      default: Date.now,
    },

    status: {
      type: String,

      enum: ["ACTIVE", "INACTIVE"],

      default: "ACTIVE",
    },

    assignedBy: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "User",
    },
  },

  {
    timestamps: true,
  },
);

// =====================================
// Indexes
// =====================================

// Prevent duplicate member assignment
// A member cannot belong to the same group twice

memberGroupSchema.index(
  {
    memberId: 1,
    groupId: 1,
  },

  {
    unique: true,
  },
);

// Faster lookup:
// "Show all groups this member belongs to"

memberGroupSchema.index({
  churchId: 1,
  memberId: 1,
  status: 1,
});

// Faster lookup:
// "Show all members inside this group"

memberGroupSchema.index({
  churchId: 1,
  groupId: 1,
  status: 1,
});

export default mongoose.model("MemberGroup", memberGroupSchema);
