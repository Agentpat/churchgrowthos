import mongoose from "mongoose";

const staffSchema = new mongoose.Schema(
  {
    // =====================================
    // Church
    // =====================================

    churchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Church",
      required: true,
      index: true,
    },

    // =====================================
    // Member
    // =====================================

    /*
     * Staff is an extension of an existing
     * church member.
     *
     * Member remains the source of truth
     * for personal information.
     */

    memberId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
      required: true,
      index: true,
    },

    // =====================================
    // Optional Platform User
    // =====================================

    /*
     * A staff member does not automatically
     * need a platform login.
     *
     * If they later receive an account,
     * userId connects the Staff record
     * to the User account.
     */

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
      index: true,
    },

    // =====================================
    // Church Service Information
    // =====================================

    department: {
      type: String,
      trim: true,
      maxlength: 100,
    },

    role: {
      type: String,
      trim: true,
      maxlength: 100,
    },

    serviceAreas: [
      {
        type: String,
        trim: true,
        maxlength: 100,
      },
    ],

    startDate: {
      type: Date,
    },

    // =====================================
    // Status
    // =====================================

    status: {
      type: String,

      enum: ["ACTIVE", "INACTIVE"],

      default: "ACTIVE",

      index: true,
    },

    // =====================================
    // Notes
    // =====================================

    notes: {
      type: String,

      trim: true,

      maxlength: 1000,
    },

    // =====================================
    // Audit
    // =====================================

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "User",

      required: true,
    },

    // =====================================
    // Soft Delete
    // =====================================

    isActive: {
      type: Boolean,

      default: true,

      index: true,
    },
  },

  {
    timestamps: true,
  },
);

// =====================================
// Indexes
// =====================================

staffSchema.index({
  churchId: 1,
  isActive: 1,
});

staffSchema.index({
  churchId: 1,
  status: 1,
});

staffSchema.index({
  churchId: 1,
  department: 1,
});

staffSchema.index({
  churchId: 1,
  memberId: 1,
});

// =====================================
// Prevent Duplicate Active Staff
// =====================================

/*
 * A member can only have one active
 * Staff record within a church.
 *
 * If the staff record is archived,
 * the member can technically be assigned
 * again later.
 */

staffSchema.index(
  {
    churchId: 1,
    memberId: 1,
  },
  {
    unique: true,

    partialFilterExpression: {
      isActive: true,
    },
  },
);

// =====================================
// Virtual: Full Name
// =====================================

/*
 * Full name now comes from the Member.
 *
 * Because memberId is populated, this
 * virtual provides a convenient response
 * property without duplicating the data.
 */

staffSchema.virtual("fullName").get(function () {
  if (!this.memberId) {
    return "";
  }

  if (
    typeof this.memberId === "object" &&
    this.memberId.firstName !== undefined
  ) {
    return `${this.memberId.firstName || ""} ${
      this.memberId.lastName || ""
    }`.trim();
  }

  return "";
});

// =====================================
// JSON / Object Virtuals
// =====================================

staffSchema.set("toJSON", {
  virtuals: true,
});

staffSchema.set("toObject", {
  virtuals: true,
});

// =====================================
// Model
// =====================================

const Staff = mongoose.model("Staff", staffSchema);

export default Staff;
