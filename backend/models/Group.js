import mongoose from "mongoose";

const groupSchema = new mongoose.Schema(
  {
    churchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Church",
      required: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    type: {
      type: String,

      enum: ["MINISTRY", "DEPARTMENT", "FELLOWSHIP", "UNIT", "OTHER"],

      default: "MINISTRY",
    },

    leader: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
      default: null,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
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

const Group = mongoose.model("Group", groupSchema);

export default Group;
