import api from "../utils/api";

// =========================
// Get Dashboard Analytics
// =========================

const getDashboardAnalytics = async () => {
  const response = await api.get("/analytics/dashboard");

  return response.data;
};

export default {
  getDashboardAnalytics,
};
