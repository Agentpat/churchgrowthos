import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
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
    // Service Being Attended
    // =====================================

    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
      index: true,
    },

    // =====================================
    // Member Attending
    // =====================================

    memberId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
      default: null,
      index: true,
    },

    // =====================================
    // Visitor Attending
    // =====================================

    visitorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Visitor",
      default: null,
      index: true,
    },

    // =====================================
    // Attendance Person Type
    // =====================================

    personType: {
      type: String,
      enum: ["MEMBER", "VISITOR"],
      required: true,
      default: "MEMBER",
      index: true,
    },

    // =====================================
    // Attendance Status
    // =====================================

    status: {
      type: String,
      enum: ["PRESENT", "ABSENT", "EXCUSED"],
      default: "PRESENT",
      index: true,
    },

    // =====================================
    // How Attendance Was Recorded
    // =====================================

    checkInMethod: {
      type: String,
      enum: ["MANUAL", "QR_CODE", "SELF_CHECK_IN", "SMS"],
      default: "MANUAL",
    },

    // =====================================
    // User Who Recorded Attendance
    // =====================================

    recordedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // =====================================
    // Actual Check-in Time
    // =====================================

    checkedInAt: {
      type: Date,
      default: Date.now,
      index: true,
    },

    // =====================================
    // Additional Notes
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
// Fast Lookup By Service
// =====================================

attendanceSchema.index({
  churchId: 1,
  serviceId: 1,
});

// =====================================
// Member Attendance History
// =====================================

attendanceSchema.index({
  churchId: 1,
  memberId: 1,
  checkedInAt: -1,
});

// =====================================
// Visitor Attendance History
// =====================================

attendanceSchema.index({
  churchId: 1,
  visitorId: 1,
  checkedInAt: -1,
});

// =====================================
// Live Attendance Lookup
// =====================================

attendanceSchema.index({
  churchId: 1,
  serviceId: 1,
  personType: 1,
  status: 1,
});

// =====================================
// Prevent Duplicate Member Attendance
// =====================================
//
// A member can only be checked in once
// for a particular service.
//
// sparse: true is important because
// visitor records have no memberId.
// =====================================

attendanceSchema.index(
  {
    churchId: 1,
    serviceId: 1,
    memberId: 1,
  },
  {
    unique: true,
    sparse: true,
  },
);

// =====================================
// Prevent Duplicate Visitor Attendance
// =====================================
//
// A visitor can only be checked in once
// for a particular service.
//
// sparse: true is important because
// member records have no visitorId.
// =====================================

attendanceSchema.index(
  {
    churchId: 1,
    serviceId: 1,
    visitorId: 1,
  },
  {
    unique: true,
    sparse: true,
  },
);

// =====================================
// Validate Person Reference
// =====================================
//
// Every attendance record must point to
// exactly one person:
//
// MEMBER  → memberId
// VISITOR → visitorId
//
// This validation is synchronous, so there
// is no need for a `next` callback.
// =====================================

attendanceSchema.pre("validate", function () {
  if (this.personType === "MEMBER") {
    if (!this.memberId) {
      throw new Error("Member attendance requires memberId.");
    }

    if (this.visitorId) {
      throw new Error(
        "Member attendance cannot contain visitorId.",
      );
    }
  }

  if (this.personType === "VISITOR") {
    if (!this.visitorId) {
      throw new Error("Visitor attendance requires visitorId.");
    }

    if (this.memberId) {
      throw new Error(
        "Visitor attendance cannot contain memberId.",
      );
    }
  }
});

const Attendance = mongoose.model("Attendance", attendanceSchema);

export default Attendance;