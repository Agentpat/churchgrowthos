import api from "../utils/api";

// =====================================
// Staff Service
// =====================================

const staffService = {
  // =====================================
  // Staff Summary
  // =====================================

  getStaffSummary: async () => {
    const response = await api.get("/staff/summary");

    return response.data;
  },

  // =====================================
  // Get Staff
  // Search + Pagination + Filters
  // =====================================

  getStaff: async (params = {}) => {
    const response = await api.get("/staff", {
      params: {
        page: params.page || 1,

        limit: params.limit || 10,

        search: params.search || "",

        department: params.department || undefined,

        status: params.status || undefined,
      },
    });

    return response.data;
  },

  // =====================================
  // Get Single Staff
  // =====================================

  getStaffById: async (id) => {
    const response = await api.get(`/staff/${id}`);

    return response.data;
  },

  // =====================================
  // Create Staff
  // =====================================

  createStaff: async (staffData) => {
    const response = await api.post("/staff", staffData);

    return response.data;
  },

  // =====================================
  // Update Staff
  // =====================================

  updateStaff: async (id, staffData) => {
    const response = await api.put(`/staff/${id}`, staffData);

    return response.data;
  },

  // =====================================
  // Archive Staff
  // =====================================

  deleteStaff: async (id) => {
    const response = await api.delete(`/staff/${id}`);

    return response.data;
  },
};

// =====================================
// Export
// =====================================

export default staffService;
