import { useCallback, useEffect, useState } from "react";

import staffService from "../../../services/staffService";

// =====================================
// Initial Summary
// =====================================

const initialSummary = {
  totalStaff: 0,
  activeStaff: 0,
  inactiveStaff: 0,
};

// =====================================
// Initial Pagination
// =====================================

const initialPagination = {
  total: 0,
  page: 1,
  limit: 10,
  pages: 1,
};

// =====================================
// useStaff
// =====================================

const useStaff = () => {
  // =====================================
  // Summary
  // =====================================

  const [summary, setSummary] = useState(initialSummary);

  // =====================================
  // Staff
  // =====================================

  const [staff, setStaff] = useState([]);

  // =====================================
  // Pagination
  // =====================================

  const [pagination, setPagination] = useState(initialPagination);

  // =====================================
  // Loading
  // =====================================

  const [loading, setLoading] = useState(true);

  // =====================================
  // Error
  // =====================================

  const [error, setError] = useState("");

  // =====================================
  // Load Staff
  // =====================================

  const loadStaff = useCallback(async (page = 1, filters = {}) => {
    try {
      setLoading(true);

      setError("");

      // =================================
      // Request Parameters
      // =================================

      const params = {
        page,

        limit: 10,

        search: filters.search?.trim() || "",

        ...(filters.department
          ? {
              department: filters.department,
            }
          : {}),

        ...(filters.status
          ? {
              status: filters.status,
            }
          : {}),
      };

      // =================================
      // Load Summary + Staff
      // =================================

      const [summaryResponse, staffResponse] = await Promise.all([
        staffService.getStaffSummary(),

        staffService.getStaff(params),
      ]);

      // =================================
      // Normalize Summary
      // =================================

      const summaryData = summaryResponse?.data || summaryResponse || {};

      // =================================
      // Normalize Staff
      // =================================

      const staffData =
        staffResponse?.data?.staff ||
        staffResponse?.staff ||
        staffResponse?.data ||
        [];

      // =================================
      // Normalize Pagination
      // =================================

      const paginationData =
        staffResponse?.data?.pagination || staffResponse?.pagination || {};

      // =================================
      // Update Summary
      // =================================

      setSummary({
        totalStaff: Number(summaryData.totalStaff) || 0,

        activeStaff: Number(summaryData.activeStaff) || 0,

        inactiveStaff: Number(summaryData.inactiveStaff) || 0,
      });

      // =================================
      // Update Staff
      // =================================

      setStaff(Array.isArray(staffData) ? staffData : []);

      // =================================
      // Update Pagination
      // =================================

      setPagination({
        total: Number(paginationData.total) || 0,

        page: Number(paginationData.page) || page,

        limit: Number(paginationData.limit) || 10,

        pages: Number(paginationData.pages) || 1,
      });

      // =================================
      // Return Data
      // =================================

      return {
        staff: Array.isArray(staffData) ? staffData : [],

        summary: {
          totalStaff: Number(summaryData.totalStaff) || 0,

          activeStaff: Number(summaryData.activeStaff) || 0,

          inactiveStaff: Number(summaryData.inactiveStaff) || 0,
        },

        pagination: paginationData,
      };
    } catch (err) {
      console.error("FAILED TO LOAD STAFF:", err);

      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Unable to load staff data.";

      setError(message);

      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // =====================================
  // Create Staff
  // =====================================

  const createStaff = useCallback(
    async (staffData) => {
      try {
        setLoading(true);

        setError("");

        const response = await staffService.createStaff(staffData);

        // =================================
        // New records appear on page 1
        // =================================

        await loadStaff(1);

        return response;
      } catch (err) {
        console.error("CREATE STAFF FAILED:", err);

        const message =
          err?.response?.data?.message ||
          err?.message ||
          "Unable to create staff record.";

        setError(message);

        throw err;
      }
    },
    [loadStaff],
  );

  // =====================================
  // Update Staff
  // =====================================

  const updateStaff = useCallback(
    async (id, staffData) => {
      try {
        setLoading(true);

        setError("");

        const response = await staffService.updateStaff(id, staffData);

        await loadStaff(pagination.page);

        return response;
      } catch (err) {
        console.error("UPDATE STAFF FAILED:", err);

        const message =
          err?.response?.data?.message ||
          err?.message ||
          "Unable to update staff record.";

        setError(message);

        throw err;
      }
    },
    [loadStaff, pagination.page],
  );

  // =====================================
  // Archive Staff
  // =====================================

  const deleteStaff = useCallback(
    async (id) => {
      try {
        setLoading(true);

        setError("");

        const response = await staffService.deleteStaff(id);

        await loadStaff(pagination.page);

        return response;
      } catch (err) {
        console.error("ARCHIVE STAFF FAILED:", err);

        const message =
          err?.response?.data?.message ||
          err?.message ||
          "Unable to archive staff record.";

        setError(message);

        throw err;
      }
    },
    [loadStaff, pagination.page],
  );

  // =====================================
  // Change Page
  // =====================================

  const changePage = useCallback(
    async (page) => {
      if (page < 1 || page > pagination.pages || page === pagination.page) {
        return;
      }

      await loadStaff(page);
    },
    [loadStaff, pagination.pages, pagination.page],
  );

  // =====================================
  // Apply Filters
  // =====================================

  const applyFilters = useCallback(
    async (filters = {}) => {
      await loadStaff(1, filters);
    },
    [loadStaff],
  );

  // =====================================
  // Reload
  // =====================================

  const reload = useCallback(async () => {
    await loadStaff(pagination.page);
  }, [loadStaff, pagination.page]);

  // =====================================
  // Initial Load
  // =====================================

  useEffect(() => {
    loadStaff(1);
  }, [loadStaff]);

  // =====================================
  // Return
  // =====================================

  return {
    // Data

    staff,

    summary,

    // Pagination

    pagination,

    // State

    loading,

    error,

    // Actions

    createStaff,

    updateStaff,

    deleteStaff,

    changePage,

    applyFilters,

    reload,
  };
};

export default useStaff;
