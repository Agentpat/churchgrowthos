import api from "../utils/api";

const financeService = {
  // =====================================
  // Finance Summary
  // =====================================

  getFinanceSummary: async () => {
    const response = await api.get("/finance/summary");

    return response.data;
  },

  // =====================================
  // Finance Analytics
  // Date Filters
  // =====================================

  getFinanceAnalytics: async (params = {}) => {
    const requestParams = {};

    // =====================================
    // Start Date
    // =====================================

    if (params.startDate) {
      requestParams.startDate = params.startDate;
    }

    // =====================================
    // End Date
    // =====================================

    if (params.endDate) {
      requestParams.endDate = params.endDate;
    }

    const response = await api.get("/finance/analytics", {
      params: requestParams,
    });

    return response.data;
  },

  // =====================================
  // Offerings
  // =====================================

  createOffering: async (offeringData) => {
    const response = await api.post("/finance/offerings", offeringData);

    return response.data;
  },

  // =====================================
  // Get Offerings
  // Search + Pagination
  // =====================================

  getOfferings: async (params = {}) => {
    const response = await api.get("/finance/offerings", {
      params: {
        page: params.page || 1,

        limit: params.limit || 10,

        search: params.search || "",

        type: params.type || undefined,
      },
    });

    return response.data;
  },

  // =====================================
  // Get Single Offering
  // =====================================

  getOfferingById: async (id) => {
    const response = await api.get(`/finance/offerings/${id}`);

    return response.data;
  },

  // =====================================
  // Update Offering
  // =====================================

  updateOffering: async (id, offeringData) => {
    const response = await api.put(`/finance/offerings/${id}`, offeringData);

    return response.data;
  },

  // =====================================
  // Delete Offering
  // =====================================

  deleteOffering: async (id) => {
    const response = await api.delete(`/finance/offerings/${id}`);

    return response.data;
  },

  // =====================================
  // Expenses
  // =====================================

  createExpense: async (expenseData) => {
    const response = await api.post("/expenses", expenseData);

    return response.data;
  },

  // =====================================
  // Get Expenses
  // Search + Pagination
  // =====================================

  getExpenses: async (params = {}) => {
    const response = await api.get("/expenses", {
      params,
    });

    return response.data;
  },

  // =====================================
  // Get Single Expense
  // =====================================

  getExpenseById: async (id) => {
    const response = await api.get(`/expenses/${id}`);

    return response.data;
  },

  // =====================================
  // Update Expense
  // =====================================

  updateExpense: async (id, expenseData) => {
    const response = await api.put(`/expenses/${id}`, expenseData);

    return response.data;
  },

  // =====================================
  // Delete Expense
  // =====================================

  deleteExpense: async (id) => {
    const response = await api.delete(`/expenses/${id}`);

    return response.data;
  },

  // =====================================
  // Expense Summary
  // =====================================

  getExpenseSummary: async () => {
    const response = await api.get("/expenses/summary");

    return response.data;
  },
};

export default financeService;
