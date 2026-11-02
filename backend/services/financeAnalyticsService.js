import mongoose from "mongoose";

import Offering from "../models/Offering.js";
import Expense from "../models/Expense.js";

import ApiError from "../utils/ApiError.js";

// =====================================
// Finance Analytics
// =====================================

const getFinanceAnalytics = async (churchId, options = {}) => {
  // =====================================
  // Validate Church
  // =====================================

  if (!churchId) {
    throw new ApiError(400, "Church ID is required.");
  }

  if (!mongoose.Types.ObjectId.isValid(churchId)) {
    throw new ApiError(400, "Invalid church ID.");
  }

  const { startDate, endDate } = options;

  const churchObjectId = new mongoose.Types.ObjectId(churchId);

  // =====================================
  // Date Helpers
  // =====================================

  const getStartDate = (value) => {
    if (!value) {
      return null;
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      throw new ApiError(400, "Invalid start date.");
    }

    date.setHours(0, 0, 0, 0);

    return date;
  };

  const getEndDate = (value) => {
    if (!value) {
      return null;
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      throw new ApiError(400, "Invalid end date.");
    }

    date.setHours(23, 59, 59, 999);

    return date;
  };

  const parsedStartDate = getStartDate(startDate);

  const parsedEndDate = getEndDate(endDate);

  // =====================================
  // Validate Date Range
  // =====================================

  if (parsedStartDate && parsedEndDate && parsedStartDate > parsedEndDate) {
    throw new ApiError(400, "Start date cannot be after end date.");
  }

  // =====================================
  // Offering Date Filter
  // =====================================

  const dateFilter = {};

  if (parsedStartDate || parsedEndDate) {
    dateFilter.transactionDate = {};

    if (parsedStartDate) {
      dateFilter.transactionDate.$gte = parsedStartDate;
    }

    if (parsedEndDate) {
      dateFilter.transactionDate.$lte = parsedEndDate;
    }
  }

  // =====================================
  // Expense Date Filter
  // =====================================

  const expenseDateFilter = {};

  if (parsedStartDate || parsedEndDate) {
    expenseDateFilter.expenseDate = {};

    if (parsedStartDate) {
      expenseDateFilter.expenseDate.$gte = parsedStartDate;
    }

    if (parsedEndDate) {
      expenseDateFilter.expenseDate.$lte = parsedEndDate;
    }
  }

  // =====================================
  // Base Filters
  // =====================================

  const offeringMatch = {
    churchId: churchObjectId,

    isActive: true,

    ...dateFilter,
  };

  const expenseMatch = {
    churchId: churchObjectId,

    isActive: true,

    ...expenseDateFilter,
  };

  // =====================================
  // Run Analytics
  // =====================================

  const [
    incomeSummary,

    expenseSummary,

    incomeByType,

    expensesByCategory,

    monthlyIncome,

    monthlyExpenses,

    paymentMethods,
  ] = await Promise.all([
    // =================================
    // Income Summary
    // =================================

    Offering.aggregate([
      {
        $match: offeringMatch,
      },

      {
        $group: {
          _id: null,

          totalIncome: {
            $sum: "$amount",
          },

          incomeTransactions: {
            $sum: 1,
          },
        },
      },
    ]),

    // =================================
    // Expense Summary
    // =================================

    Expense.aggregate([
      {
        $match: expenseMatch,
      },

      {
        $group: {
          _id: null,

          totalExpenses: {
            $sum: "$amount",
          },

          expenseTransactions: {
            $sum: 1,
          },
        },
      },
    ]),

    // =================================
    // Income By Type
    // =================================

    Offering.aggregate([
      {
        $match: offeringMatch,
      },

      {
        $group: {
          _id: "$type",

          amount: {
            $sum: "$amount",
          },

          transactions: {
            $sum: 1,
          },
        },
      },

      {
        $sort: {
          amount: -1,
        },
      },
    ]),

    // =================================
    // Expenses By Category
    // =================================

    Expense.aggregate([
      {
        $match: expenseMatch,
      },

      {
        $group: {
          _id: "$category",

          amount: {
            $sum: "$amount",
          },

          transactions: {
            $sum: 1,
          },
        },
      },

      {
        $sort: {
          amount: -1,
        },
      },
    ]),

    // =================================
    // Monthly Income
    // =================================

    Offering.aggregate([
      {
        $match: offeringMatch,
      },

      {
        $group: {
          _id: {
            year: {
              $year: "$transactionDate",
            },

            month: {
              $month: "$transactionDate",
            },
          },

          income: {
            $sum: "$amount",
          },

          transactions: {
            $sum: 1,
          },
        },
      },

      {
        $sort: {
          "_id.year": 1,

          "_id.month": 1,
        },
      },
    ]),

    // =================================
    // Monthly Expenses
    // =================================

    Expense.aggregate([
      {
        $match: expenseMatch,
      },

      {
        $group: {
          _id: {
            year: {
              $year: "$expenseDate",
            },

            month: {
              $month: "$expenseDate",
            },
          },

          expenses: {
            $sum: "$amount",
          },

          transactions: {
            $sum: 1,
          },
        },
      },

      {
        $sort: {
          "_id.year": 1,

          "_id.month": 1,
        },
      },
    ]),

    // =================================
    // Payment Methods
    // =================================

    Offering.aggregate([
      {
        $match: offeringMatch,
      },

      {
        $group: {
          _id: "$paymentMethod",

          amount: {
            $sum: "$amount",
          },

          transactions: {
            $sum: 1,
          },
        },
      },

      {
        $sort: {
          amount: -1,
        },
      },
    ]),
  ]);

  // =====================================
  // Extract Summary
  // =====================================

  const totalIncome = Number(incomeSummary[0]?.totalIncome) || 0;

  const totalExpenses = Number(expenseSummary[0]?.totalExpenses) || 0;

  const incomeTransactions = Number(incomeSummary[0]?.incomeTransactions) || 0;

  const expenseTransactions =
    Number(expenseSummary[0]?.expenseTransactions) || 0;

  const transactions = incomeTransactions + expenseTransactions;

  const balance = totalIncome - totalExpenses;

  // =====================================
  // Format Income Breakdown
  // =====================================

  const formattedIncomeByType = incomeByType.map((item) => ({
    type: item._id || "OTHER",

    amount: Number(item.amount) || 0,

    transactions: Number(item.transactions) || 0,
  }));

  // =====================================
  // Format Expense Breakdown
  // =====================================

  const formattedExpensesByCategory = expensesByCategory.map((item) => ({
    category: item._id || "OTHER",

    amount: Number(item.amount) || 0,

    transactions: Number(item.transactions) || 0,
  }));

  // =====================================
  // Build Monthly Analytics
  // =====================================

  const monthlyMap = new Map();

  // =====================================
  // Add Income Months
  // =====================================

  monthlyIncome.forEach((item) => {
    const year = item._id.year;

    const month = item._id.month;

    const key = `${year}-${String(month).padStart(2, "0")}`;

    monthlyMap.set(key, {
      year,

      month,

      income: Number(item.income) || 0,

      expenses: 0,

      incomeTransactions: Number(item.transactions) || 0,

      expenseTransactions: 0,
    });
  });

  // =====================================
  // Add Expense Months
  // =====================================

  monthlyExpenses.forEach((item) => {
    const year = item._id.year;

    const month = item._id.month;

    const key = `${year}-${String(month).padStart(2, "0")}`;

    if (!monthlyMap.has(key)) {
      monthlyMap.set(key, {
        year,

        month,

        income: 0,

        expenses: Number(item.expenses) || 0,

        incomeTransactions: 0,

        expenseTransactions: Number(item.transactions) || 0,
      });

      return;
    }

    const existing = monthlyMap.get(key);

    existing.expenses = Number(item.expenses) || 0;

    existing.expenseTransactions = Number(item.transactions) || 0;
  });

  // =====================================
  // Final Monthly Data
  // =====================================

  const monthly = Array.from(monthlyMap.values())

    .sort((a, b) => {
      if (a.year !== b.year) {
        return a.year - b.year;
      }

      return a.month - b.month;
    })

    .map((item) => ({
      ...item,

      balance: item.income - item.expenses,
    }));

  // =====================================
  // Format Payment Methods
  // =====================================

  const formattedPaymentMethods = paymentMethods.map((item) => ({
    paymentMethod: item._id || "OTHER",

    amount: Number(item.amount) || 0,

    transactions: Number(item.transactions) || 0,
  }));

  // =====================================
  // Final Response
  // =====================================

  return {
    summary: {
      totalIncome,

      totalExpenses,

      balance,

      transactions,

      incomeTransactions,

      expenseTransactions,
    },

    incomeByType: formattedIncomeByType,

    expensesByCategory: formattedExpensesByCategory,

    monthly,

    paymentMethods: formattedPaymentMethods,
  };
};

// =====================================
// Export
// =====================================

export default {
  getFinanceAnalytics,
};
