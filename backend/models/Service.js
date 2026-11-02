import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    // Tenant Isolation
    churchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Church",
      required: true,
      index: true,
    },

    // Basic Information
    title: {
      type: String,
      required: true,
      trim: true,
    },

    serviceType: {
      type: String,
      enum: [
        "SUNDAY_SERVICE",
        "MIDWEEK_SERVICE",
        "PRAYER_MEETING",
        "WORKERS_MEETING",
        "SPECIAL_PROGRAMME",
        "BIBLE_STUDY",
        "VIGIL",
        "OTHER",
      ],
      required: true,
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    // Schedule
    serviceDate: {
      type: Date,
      required: true,
      index: true,
    },

    startTime: {
      type: String,
      required: true,
    },

    endTime: {
      type: String,
      default: "",
    },

    // Status
    status: {
      type: String,
      enum: ["SCHEDULED", "LIVE", "COMPLETED", "CANCELLED"],
      default: "SCHEDULED",
    },

    // Statistics (updated automatically)
    totalAttendance: {
      type: Number,
      default: 0,
    },

    firstTimers: {
      type: Number,
      default: 0,
    },

    membersPresent: {
      type: Number,
      default: 0,
    },

    workersPresent: {
      type: Number,
      default: 0,
    },

    offeringsRecorded: {
      type: Boolean,
      default: false,
    },

    notes: {
      type: String,
      default: "",
    },

    // Audit
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
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

// Compound index for fast dashboard queries
serviceSchema.index({
  churchId: 1,
  serviceDate: -1,
});

// Prevent duplicate services of the same type on the same day
serviceSchema.index(
  {
    churchId: 1,
    serviceType: 1,
    serviceDate: 1,
  },
  {
    unique: true,
  },
);

const Service = mongoose.model("Service", serviceSchema);

export default Service;
