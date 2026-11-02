import mongoose from "mongoose";

const attendanceSessionSchema = new mongoose.Schema(
  {
    // =====================================
    // Tenant Isolation
    // =====================================

    churchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Church",
      required: true,
      index: true,
    },

    // =====================================
    // Service
    // =====================================

    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
      index: true,
    },

    // =====================================
    // Session Status
    // =====================================

    status: {
      type: String,
      enum: ["NOT_STARTED", "OPEN", "CLOSED", "FINALIZED"],
      default: "NOT_STARTED",
      index: true,
    },

    // =====================================
    // Session Lifecycle
    // =====================================

    startedAt: {
      type: Date,
      default: null,
    },

    closedAt: {
      type: Date,
      default: null,
    },

    finalizedAt: {
      type: Date,
      default: null,
    },

    // =====================================
    // Users Responsible
    // =====================================

    openedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    closedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    finalizedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    // =====================================
    // Optional Notes
    // =====================================

    notes: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

// =====================================
// Fast Church + Service Lookup
// =====================================

attendanceSessionSchema.index({
  churchId: 1,
  serviceId: 1,
});

// =====================================
// Only One Attendance Session Per Service
// =====================================

attendanceSessionSchema.index(
  {
    churchId: 1,
    serviceId: 1,
  },
  {
    unique: true,
  },
);

const AttendanceSession = mongoose.model(
  "AttendanceSession",
  attendanceSessionSchema,
);

export default AttendanceSession;
