import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    // Tenant isolation
    churchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Church",
      required: true,
      index: true,
    },

    // Optional service/event link
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      default: null,
    },

    // Expense details
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

    category: {
      type: String,
      enum: [
        "SALARY",
        "RENT",
        "UTILITY",
        "EVENT",
        "EQUIPMENT",
        "TRANSPORT",
        "MAINTENANCE",
        "OTHER",
      ],
      default: "OTHER",
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    paymentMethod: {
      type: String,
      enum: ["CASH", "TRANSFER", "CARD", "OTHER"],
      default: "CASH",
    },

    // User who recorded expense
    recordedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    expenseDate: {
      type: Date,
      default: Date.now,
    },

    notes: {
      type: String,
      default: "",
      trim: true,
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

// Fast church expense lookup
expenseSchema.index({
  churchId: 1,
  expenseDate: -1,
});

// Category reporting
expenseSchema.index({
  churchId: 1,
  category: 1,
});

const Expense = mongoose.model("Expense", expenseSchema);

export default Expense;
