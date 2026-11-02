import mongoose from "mongoose";

const churchProfileSchema = new mongoose.Schema(
  {
    churchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Church",
      required: true,
      unique: true,
    },

    // Basic Information
    churchName: {
      type: String,
      required: true,
      trim: true,
    },

    pastorName: {
      type: String,
      trim: true,
      default: "",
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    // Contact Information
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      trim: true,
    },

    address: {
      type: String,
      trim: true,
    },

    city: {
      type: String,
      trim: true,
    },

    state: {
      type: String,
      trim: true,
    },

    country: {
      type: String,
      default: "Nigeria",
    },

    // Branding
    logo: {
      type: String,
      default: "",
    },

    coverImage: {
      type: String,
      default: "",
    },

    primaryColor: {
      type: String,
      default: "#1E40AF",
    },

    // Settings
    membershipEnabled: {
      type: Boolean,
      default: true,
    },

    attendanceEnabled: {
      type: Boolean,
      default: true,
    },

    financeEnabled: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

const ChurchProfile = mongoose.model("ChurchProfile", churchProfileSchema);

export default ChurchProfile;
