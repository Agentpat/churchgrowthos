import Expense from "../models/Expense.js";
import Service from "../models/Service.js";

import ApiError from "../utils/ApiError.js";
import mongoose from "mongoose";
// =========================
// Create Expense
// =========================

const createExpense = async (churchId, userId, data) => {
  const {
    serviceId,
    title,
    description,
    category,
    amount,
    paymentMethod,
    expenseDate,
    notes,
  } = data;

  if (!title || !amount) {
    throw new ApiError(400, "Title and amount are required.");
  }

  // Validate service belongs to church
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

  const expense = await Expense.create({
    churchId,

    serviceId,

    title,

    description,

    category,

    amount,

    paymentMethod,

    recordedBy: userId,

    expenseDate,

    notes,
  });

  return expense;
};

// =========================
// Get Expenses
// Search + Pagination
// =========================

const getExpenses = async (churchId, query) => {
  const { search = "", category, page = 1, limit = 10 } = query;

  const skip = (Number(page) - 1) * Number(limit);

  const filter = {
    churchId,

    isActive: true,
  };

  if (category) {
    filter.category = category;
  }

  if (search) {
    filter.$or = [
      {
        title: {
          $regex: search,
          $options: "i",
        },
      },

      {
        description: {
          $regex: search,
          $options: "i",
        },
      },

      {
        notes: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  const expenses = await Expense.find(filter)

    .populate("recordedBy", "firstName lastName email")

    .populate("serviceId", "title serviceDate")

    .sort({
      expenseDate: -1,
    })

    .skip(skip)

    .limit(Number(limit));

  const total = await Expense.countDocuments(filter);

  return {
    expenses,

    pagination: {
      total,

      page: Number(page),

      limit: Number(limit),

      pages: Math.ceil(total / Number(limit)),
    },
  };
};

// =========================
// Get Single Expense
// =========================

const getExpenseById = async (churchId, expenseId) => {
  const expense = await Expense.findOne({
    _id: expenseId,

    churchId,

    isActive: true,
  })

    .populate("recordedBy", "firstName lastName email")

    .populate("serviceId", "title serviceDate");

  if (!expense) {
    throw new ApiError(404, "Expense not found.");
  }

  return expense;
};

// =========================
// Update Expense
// =========================

const updateExpense = async (churchId, expenseId, data) => {
  const expense = await Expense.findOneAndUpdate(
    {
      _id: expenseId,

      churchId,

      isActive: true,
    },

    data,

    {
      new: true,

      runValidators: true,
    },
  );

  if (!expense) {
    throw new ApiError(404, "Expense not found.");
  }

  return expense;
};

// =========================
// Delete Expense
// Soft Delete
// =========================

const deleteExpense = async (churchId, expenseId) => {
  const expense = await Expense.findOneAndUpdate(
    {
      _id: expenseId,

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

  if (!expense) {
    throw new ApiError(404, "Expense not found.");
  }

  return expense;
};

// =========================
// Expense Summary
// =========================

const getExpenseSummary = async (churchId) => {

  const expenses = await Expense.aggregate([
    {
      $match: {
        churchId: new mongoose.Types.ObjectId(churchId),

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


  const expenseData = expenses[0] || {
    totalExpenses: 0,

    transactions: 0,
  };


  return {
    totalExpenses: expenseData.totalExpenses,

    transactions: expenseData.transactions,
  };

};

export default {
  createExpense,

  getExpenses,

  getExpenseById,

  updateExpense,

  deleteExpense,

  getExpenseSummary,
};
