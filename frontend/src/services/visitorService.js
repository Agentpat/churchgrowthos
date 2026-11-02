import api from "../utils/api";

const visitorService = {
  // =====================================
  // Visitor CRUD
  // =====================================

  createVisitor: async (data) => {
    const response = await api.post("/visitors", data);

    return response.data;
  },

  getVisitors: async (params = {}) => {
    const response = await api.get("/visitors", {
      params,
    });

    return response.data;
  },

  getVisitorById: async (id) => {
    const response = await api.get(`/visitors/${id}`);

    return response.data;
  },

  updateVisitor: async (id, data) => {
    const response = await api.put(`/visitors/${id}`, data);

    return response.data;
  },

  archiveVisitor: async (id) => {
    const response = await api.patch(`/visitors/${id}/archive`);

    return response.data;
  },

  // =====================================
  // Convert Visitor
  // =====================================

  convertVisitor: async (id) => {
    const response = await api.post(`/visitors/${id}/convert`);

    return response.data;
  },

  // =====================================
  // Visitor Follow Ups
  // =====================================

  getVisitorFollowUps: async (visitorId) => {
    const response = await api.get(`/followups/visitor/${visitorId}`);

    return response.data;
  },

  getPendingFollowUps: async () => {
    const response = await api.get("/followups/pending");

    return response.data;
  },

  markFollowUpSent: async (followUpId) => {
    const response = await api.put(`/followups/${followUpId}/sent`);

    return response.data;
  },

  markFollowUpFailed: async (followUpId, reason = "") => {
    const response = await api.put(`/followups/${followUpId}/failed`, {
      reason,
    });

    return response.data;
  },
};

export default visitorService;
