import mongoose from "mongoose";

const roleSchema = new mongoose.Schema(
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
      trim: true,
      default: "",
    },

    permissions: [
      {
        type: String,
        required: true,
      },
    ],

    isSystemRole: {
      type: Boolean,
      default: false,
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

// Prevent duplicate role names within the same church
roleSchema.index(
  {
    churchId: 1,
    name: 1,
  },
  {
    unique: true,
  },
);

const Role = mongoose.model("Role", roleSchema);

export default Role;
