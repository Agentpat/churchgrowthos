import mongoose from "mongoose";

const offeringSchema = new mongoose.Schema(
  {
    // =========================
    // Tenant Isolation
    // =========================

    churchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Church",
      required: true,
      index: true,
    },

    // =========================
    // Related Service
    // =========================

    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: false,
      index: true,
    },

    // =========================
    // Financial Details
    // =========================

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    type: {
      type: String,

      enum: ["OFFERING", "TITHE", "DONATION", "SPECIAL_SEED", "OTHER"],

      default: "OFFERING",
    },

    paymentMethod: {
      type: String,

      enum: ["CASH", "TRANSFER", "CARD", "ONLINE", "OTHER"],

      default: "CASH",
    },

    // =========================
    // Recording Information
    // =========================

    recordedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    transactionDate: {
      type: Date,
      default: Date.now,
    },

    notes: {
      type: String,
      default: "",
      trim: true,
    },

    // =========================
    // Soft Delete
    // =========================

    isActive: {
      type: Boolean,
      default: true,
    },
  },

  {
    timestamps: true,
  },
);

// =========================
// Indexes
// =========================

// Church finance history
offeringSchema.index({
  churchId: 1,
  transactionDate: -1,
});

// Service offering lookup
offeringSchema.index({
  churchId: 1,
  serviceId: 1,
});

const Offering = mongoose.model("Offering", offeringSchema);

export default Offering;
