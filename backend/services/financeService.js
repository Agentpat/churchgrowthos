import mongoose from "mongoose";

import Offering from "../models/Offering.js";
import Expense from "../models/Expense.js";
import Service from "../models/Service.js";

import ApiError from "../utils/ApiError.js";

// =========================
// Create Offering
// =========================

const createOffering = async (churchId, userId, data) => {
  const { serviceId, amount, type, paymentMethod, transactionDate, notes } =
    data;

  // =====================================
  // Validate Amount
  // =====================================

  if (amount === undefined || amount === null || Number(amount) <= 0) {
    throw new ApiError(400, "A valid amount is required.");
  }

  // =====================================
  // Validate Service
  // =====================================

  if (serviceId) {
    const service = await Service.findOne({
      _id: serviceId,

      churchId,

      isActive: true,
    });

    if (!service) {
      throw new ApiError(404, "Service not found.");
    }
  }

  // =====================================
  // Create Offering
  // =====================================

  const offering = await Offering.create({
    churchId,

    serviceId,

    amount: Number(amount),

    type,

    paymentMethod,

    recordedBy: userId,

    transactionDate,

    notes,
  });

  return offering;
};

// =========================
// Get Offerings
// Search + Pagination
// =========================

const getOfferings = async (churchId, query) => {
  const { search = "", type, page = 1, limit = 10 } = query;

  const currentPage = Math.max(Number(page) || 1, 1);

  const currentLimit = Math.min(Math.max(Number(limit) || 10, 1), 100);

  const skip = (currentPage - 1) * currentLimit;

  // =====================================
  // Base Filter
  // =====================================

  const filter = {
    churchId,

    isActive: true,
  };

  // =====================================
  // Type Filter
  // =====================================

  if (type) {
    filter.type = type;
  }

  // =====================================
  // Search
  // =====================================

  if (search) {
    filter.$or = [
      {
        notes: {
          $regex: search,
          $options: "i",
        },
      },

      {
        paymentMethod: {
          $regex: search,
          $options: "i",
        },
      },

      {
        type: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  // =====================================
  // Query Offerings
  // =====================================

  const offerings = await Offering.find(filter)

    .populate("recordedBy", "firstName lastName email")

    .populate("serviceId", "title serviceDate")

    .sort({
      transactionDate: -1,
      createdAt: -1,
    })

    .skip(skip)

    .limit(currentLimit);

  // =====================================
  // Total Records
  // =====================================

  const total = await Offering.countDocuments(filter);

  // =====================================
  // Pagination
  // =====================================

  return {
    offerings,

    pagination: {
      total,

      page: currentPage,

      limit: currentLimit,

      pages: Math.ceil(total / currentLimit),
    },
  };
};

// =========================
// Get Single Offering
// =========================

const getOfferingById = async (churchId, offeringId) => {
  // =====================================
  // Validate ObjectId
  // =====================================

  if (!mongoose.Types.ObjectId.isValid(offeringId)) {
    throw new ApiError(400, "Invalid offering ID.");
  }

  const offering = await Offering.findOne({
    _id: offeringId,

    churchId,

    isActive: true,
  })

    .populate("recordedBy", "firstName lastName email")

    .populate("serviceId", "title serviceDate");

  if (!offering) {
    throw new ApiError(404, "Offering not found.");
  }

  return offering;
};

// =========================
// Update Offering
// =========================

const updateOffering = async (churchId, offeringId, data) => {
  // =====================================
  // Validate ObjectId
  // =====================================

  if (!mongoose.Types.ObjectId.isValid(offeringId)) {
    throw new ApiError(400, "Invalid offering ID.");
  }

  // =====================================
  // Validate Service
  // =====================================

  if (data.serviceId) {
    const service = await Service.findOne({
      _id: data.serviceId,

      churchId,

      isActive: true,
    });

    if (!service) {
      throw new ApiError(404, "Service not found.");
    }
  }

  // =====================================
  // Prevent Invalid Amount
  // =====================================

  if (
    data.amount !== undefined &&
    (data.amount === null || Number(data.amount) <= 0)
  ) {
    throw new ApiError(400, "A valid amount is required.");
  }

  const updateData = {
    ...data,
  };

  if (updateData.amount !== undefined) {
    updateData.amount = Number(updateData.amount);
  }

  const offering = await Offering.findOneAndUpdate(
    {
      _id: offeringId,

      churchId,

      isActive: true,
    },

    updateData,

    {
      new: true,

      runValidators: true,
    },
  )

    .populate("recordedBy", "firstName lastName email")

    .populate("serviceId", "title serviceDate");

  if (!offering) {
    throw new ApiError(404, "Offering not found.");
  }

  return offering;
};

// =========================
// Soft Delete Offering
// =========================

const deleteOffering = async (churchId, offeringId) => {
  // =====================================
  // Validate ObjectId
  // =====================================

  if (!mongoose.Types.ObjectId.isValid(offeringId)) {
    throw new ApiError(400, "Invalid offering ID.");
  }

  const offering = await Offering.findOneAndUpdate(
    {
      _id: offeringId,

      churchId,

      isActive: true,
    },

    {
      isActive: false,
    },

    {
      new: true,
    },
  );

  if (!offering) {
    throw new ApiError(404, "Offering not found.");
  }

  return offering;
};

// =========================
// Finance Summary
// =========================

const getFinanceSummary = async (churchId) => {
  // =====================================
  // Validate Church ID
  // =====================================

  if (!mongoose.Types.ObjectId.isValid(churchId)) {
    throw new ApiError(400, "Invalid church ID.");
  }

  const churchObjectId = new mongoose.Types.ObjectId(churchId);

  // =====================================
  // Offering Summary
  // =====================================

  const offeringSummary = await Offering.aggregate([
    {
      $match: {
        churchId: churchObjectId,

        isActive: true,
      },
    },

    {
      $group: {
        _id: null,

        totalIncome: {
          $sum: "$amount",
        },

        transactions: {
          $sum: 1,
        },
      },
    },
  ]);

  // =====================================
  // Expense Summary
  // =====================================

  const expenseSummary = await Expense.aggregate([
    {
      $match: {
        churchId: churchObjectId,

        isActive: true,
      },
    },

    {
      $group: {
        _id: null,

        totalExpenses: {
          $sum: "$amount",
        },

        transactions: {
          $sum: 1,
        },
      },
    },
  ]);

  // =====================================
  // Normalize Income
  // =====================================

  const incomeData = offeringSummary[0] || {
    totalIncome: 0,

    transactions: 0,
  };

  // =====================================
  // Normalize Expenses
  // =====================================

  const expenseData = expenseSummary[0] || {
    totalExpenses: 0,

    transactions: 0,
  };

  // =====================================
  // Calculate Totals
  // =====================================

  const totalIncome = Number(incomeData.totalIncome) || 0;

  const totalExpenses = Number(expenseData.totalExpenses) || 0;

  const incomeTransactions = Number(incomeData.transactions) || 0;

  const expenseTransactions = Number(expenseData.transactions) || 0;

  const transactions = incomeTransactions + expenseTransactions;

  const balance = totalIncome - totalExpenses;

  // =====================================
  // Return Summary
  // =====================================

  return {
    totalIncome,

    totalExpenses,

    balance,

    transactions,

    incomeTransactions,

    expenseTransactions,
  };
};

// =========================
// Export
// =========================

export default {
  createOffering,

  getOfferings,

  getOfferingById,

  updateOffering,

  deleteOffering,

  getFinanceSummary,
};
