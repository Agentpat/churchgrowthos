import { useCallback, useEffect, useState } from "react";

import financeService from "../../../../services/financeService";
import serviceService from "../../../../services/serviceService";

const useFinance = () => {
  // =====================================
  // Summary
  // =====================================

  const [summary, setSummary] = useState({
    totalIncome: 0,

    totalExpenses: 0,

    balance: 0,

    transactions: 0,
  });

  // =====================================
  // Analytics
  // =====================================

  const [analytics, setAnalytics] = useState({
    summary: {
      totalIncome: 0,

      totalExpenses: 0,

      balance: 0,

      transactions: 0,

      incomeTransactions: 0,

      expenseTransactions: 0,
    },

    incomeByType: [],

    expensesByCategory: [],

    monthly: [],

    paymentMethods: [],
  });

  // =====================================
  // Analytics Filters
  // =====================================

  const [analyticsFilters, setAnalyticsFilters] = useState({
    startDate: "",

    endDate: "",
  });

  // =====================================
  // Financial Data
  // =====================================

  const [offerings, setOfferings] = useState([]);

  const [expenses, setExpenses] = useState([]);

  const [services, setServices] = useState([]);

  // =====================================
  // Offering Pagination
  // =====================================

  const [offeringPagination, setOfferingPagination] = useState({
    total: 0,

    page: 1,

    limit: 10,

    pages: 1,
  });

  // =====================================
  // Loading
  // =====================================

  const [loading, setLoading] = useState(true);

  // =====================================
  // Error
  // =====================================

  const [error, setError] = useState("");

  // =====================================
  // Load Finance
  // =====================================

  const loadFinance = useCallback(
    async (page = 1, filters = analyticsFilters) => {
      try {
        setLoading(true);

        setError("");

        console.log("========== LOADING FINANCE ==========");

        console.log("REQUESTED OFFERING PAGE:", page);

        console.log("ANALYTICS FILTERS:", filters);

        // =================================
        // Build Analytics Params
        // =================================

        const analyticsParams = {};

        if (filters?.startDate) {
          analyticsParams.startDate = filters.startDate;
        }

        if (filters?.endDate) {
          analyticsParams.endDate = filters.endDate;
        }

        console.log("ANALYTICS REQUEST PARAMS:", analyticsParams);

        // =================================
        // Load Finance Data
        // =================================

        const [
          summaryResponse,

          analyticsResponse,

          offeringsResponse,

          expensesResponse,

          servicesResponse,
        ] = await Promise.all([
          // ===============================
          // Summary
          // ===============================

          financeService.getFinanceSummary(),

          // ===============================
          // Analytics
          // ===============================

          financeService.getFinanceAnalytics(analyticsParams),

          // ===============================
          // Offerings
          // ===============================

          financeService.getOfferings({
            page,

            limit: 10,
          }),

          // ===============================
          // Expenses
          // ===============================

          financeService.getExpenses(),

          // ===============================
          // Services
          // ===============================

          serviceService.getServices(),
        ]);

        // =====================================
        // Debug Responses
        // =====================================

        console.log("FINANCE SUMMARY RESPONSE:", summaryResponse);

        console.log("FINANCE ANALYTICS RESPONSE:", analyticsResponse);

        console.log("OFFERINGS RESPONSE:", offeringsResponse);

        console.log("EXPENSES RESPONSE:", expensesResponse);

        console.log("SERVICES RESPONSE:", servicesResponse);

        // =====================================
        // Normalize Summary
        // =====================================

        const summaryData = summaryResponse?.data || summaryResponse || {};

        // =====================================
        // Normalize Analytics
        // =====================================

        const analyticsData =
          analyticsResponse?.data || analyticsResponse || {};

        // =====================================
        // Normalize Offerings
        // =====================================

        const offeringsData =
          offeringsResponse?.data?.offerings ||
          offeringsResponse?.offerings ||
          offeringsResponse?.data ||
          [];

        // =====================================
        // Normalize Offering Pagination
        // =====================================

        const paginationData =
          offeringsResponse?.data?.pagination ||
          offeringsResponse?.pagination ||
          {};

        // =====================================
        // Normalize Expenses
        // =====================================

        const expensesData =
          expensesResponse?.data?.expenses ||
          expensesResponse?.expenses ||
          expensesResponse?.data ||
          [];

        // =====================================
        // Normalize Services
        // =====================================

        const servicesData =
          servicesResponse?.data?.services ||
          servicesResponse?.services ||
          servicesResponse?.data ||
          [];

        // =====================================
        // Normalize Analytics Summary
        // =====================================

        const analyticsSummary = analyticsData?.summary || {};

        // =====================================
        // Set Summary
        // =====================================

        setSummary({
          ...summaryData,

          totalIncome: Number(summaryData.totalIncome) || 0,

          totalExpenses: Number(summaryData.totalExpenses) || 0,

          balance: Number(summaryData.balance) || 0,

          transactions: Number(summaryData.transactions) || 0,
        });

        // =====================================
        // Set Analytics
        // =====================================

        setAnalytics({
          summary: {
            totalIncome: Number(analyticsSummary.totalIncome) || 0,

            totalExpenses: Number(analyticsSummary.totalExpenses) || 0,

            balance: Number(analyticsSummary.balance) || 0,

            transactions: Number(analyticsSummary.transactions) || 0,

            incomeTransactions:
              Number(analyticsSummary.incomeTransactions) || 0,

            expenseTransactions:
              Number(analyticsSummary.expenseTransactions) || 0,
          },

          incomeByType: Array.isArray(analyticsData.incomeByType)
            ? analyticsData.incomeByType
            : [],

          expensesByCategory: Array.isArray(analyticsData.expensesByCategory)
            ? analyticsData.expensesByCategory
            : [],

          monthly: Array.isArray(analyticsData.monthly)
            ? analyticsData.monthly
            : [],

          paymentMethods: Array.isArray(analyticsData.paymentMethods)
            ? analyticsData.paymentMethods
            : [],
        });

        // =====================================
        // Set Offerings
        // =====================================

        setOfferings(Array.isArray(offeringsData) ? offeringsData : []);

        // =====================================
        // Set Pagination
        // =====================================

        setOfferingPagination({
          total: Number(paginationData?.total) || 0,

          page: Number(paginationData?.page) || page,

          limit: Number(paginationData?.limit) || 10,

          pages: Number(paginationData?.pages) || 1,
        });

        // =====================================
        // Set Expenses
        // =====================================

        setExpenses(Array.isArray(expensesData) ? expensesData : []);

        // =====================================
        // Set Services
        // =====================================

        setServices(Array.isArray(servicesData) ? servicesData : []);

        // =====================================
        // Debug Normalized Data
        // =====================================

        console.log("NORMALIZED ANALYTICS:", analyticsData);

        console.log("NORMALIZED OFFERINGS:", offeringsData);

        console.log("NORMALIZED SERVICES:", servicesData);

        console.log("NORMALIZED OFFERING PAGINATION:", paginationData);
      } catch (err) {
        console.error("FAILED TO LOAD FINANCE:", err);

        setError(err.response?.data?.message || "Unable to load finance data.");
      } finally {
        setLoading(false);
      }
    },
    [analyticsFilters],
  );

  // =====================================
  // Apply Analytics Filters
  // =====================================

  const applyAnalyticsFilters = useCallback(
    async (filters = {}) => {
      const normalizedFilters = {
        startDate: filters?.startDate || "",

        endDate: filters?.endDate || "",
      };

      // =================================
      // Validate Date Range
      // =================================

      if (
        normalizedFilters.startDate &&
        normalizedFilters.endDate &&
        normalizedFilters.startDate > normalizedFilters.endDate
      ) {
        throw new Error("Start date cannot be after end date.");
      }

      console.log("APPLYING ANALYTICS FILTERS:", normalizedFilters);

      // =================================
      // Save Filter
      // =================================

      setAnalyticsFilters(normalizedFilters);

      // =================================
      // Immediately Reload
      // =================================

      await loadFinance(offeringPagination.page, normalizedFilters);
    },
    [loadFinance, offeringPagination.page],
  );

  // =====================================
  // Clear Analytics Filters
  // =====================================

  const clearAnalyticsFilters = useCallback(async () => {
    const clearedFilters = {
      startDate: "",

      endDate: "",
    };

    console.log("CLEARING ANALYTICS FILTERS");

    setAnalyticsFilters(clearedFilters);

    await loadFinance(offeringPagination.page, clearedFilters);
  }, [loadFinance, offeringPagination.page]);

  // =====================================
  // Create Offering
  // =====================================

  const createOffering = useCallback(
    async (offeringData) => {
      console.log("========== CREATE OFFERING ==========");

      console.log("OFFERING PAYLOAD:", offeringData);

      try {
        const response = await financeService.createOffering(offeringData);

        console.log("CREATE OFFERING RESPONSE:", response);

        await loadFinance(1, analyticsFilters);

        console.log("FINANCE RELOADED AFTER OFFERING");

        return response;
      } catch (err) {
        console.error("CREATE OFFERING FAILED:", err);

        throw err;
      }
    },
    [loadFinance, analyticsFilters],
  );

  // =====================================
  // Update Offering
  // =====================================

  const updateOffering = useCallback(
    async (id, offeringData) => {
      const response = await financeService.updateOffering(id, offeringData);

      await loadFinance(offeringPagination.page, analyticsFilters);

      return response;
    },
    [loadFinance, offeringPagination.page, analyticsFilters],
  );

  // =====================================
  // Delete Offering
  // =====================================

  const deleteOffering = useCallback(
    async (id) => {
      const response = await financeService.deleteOffering(id);

      await loadFinance(offeringPagination.page, analyticsFilters);

      return response;
    },
    [loadFinance, offeringPagination.page, analyticsFilters],
  );

  // =====================================
  // Create Expense
  // =====================================

  const createExpense = useCallback(
    async (expenseData) => {
      const response = await financeService.createExpense(expenseData);

      await loadFinance(offeringPagination.page, analyticsFilters);

      return response;
    },
    [loadFinance, offeringPagination.page, analyticsFilters],
  );

  // =====================================
  // Update Expense
  // =====================================

  const updateExpense = useCallback(
    async (id, expenseData) => {
      const response = await financeService.updateExpense(id, expenseData);

      await loadFinance(offeringPagination.page, analyticsFilters);

      return response;
    },
    [loadFinance, offeringPagination.page, analyticsFilters],
  );

  // =====================================
  // Delete Expense
  // =====================================

  const deleteExpense = useCallback(
    async (id) => {
      const response = await financeService.deleteExpense(id);

      await loadFinance(offeringPagination.page, analyticsFilters);

      return response;
    },
    [loadFinance, offeringPagination.page, analyticsFilters],
  );

  // =====================================
  // Change Offering Page
  // =====================================

  const changeOfferingPage = useCallback(
    async (page) => {
      if (
        page < 1 ||
        page > offeringPagination.pages ||
        page === offeringPagination.page
      ) {
        return;
      }

      await loadFinance(page, analyticsFilters);
    },
    [
      loadFinance,

      offeringPagination.pages,

      offeringPagination.page,

      analyticsFilters,
    ],
  );

  // =====================================
  // Reload Finance
  // =====================================

  const reload = useCallback(async () => {
    await loadFinance(offeringPagination.page, analyticsFilters);
  }, [loadFinance, offeringPagination.page, analyticsFilters]);

  // =====================================
  // Initial Load
  // =====================================

  useEffect(() => {
    loadFinance(1, analyticsFilters);
  }, [loadFinance]);

  // =====================================
  // Return
  // =====================================

  return {
    // =================================
    // Summary
    // =================================

    summary,

    // =================================
    // Analytics
    // =================================

    analytics,

    // =================================
    // Analytics Filters
    // =================================

    analyticsFilters,

    applyAnalyticsFilters,

    clearAnalyticsFilters,

    // =================================
    // Financial Data
    // =================================

    offerings,

    expenses,

    services,

    // =================================
    // Pagination
    // =================================

    offeringPagination,

    // =================================
    // State
    // =================================

    loading,

    error,

    // =================================
    // Actions
    // =================================

    reload,

    createOffering,

    updateOffering,

    deleteOffering,

    createExpense,

    updateExpense,

    deleteExpense,

    changeOfferingPage,
  };
};

export default useFinance;
