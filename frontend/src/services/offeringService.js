import api from "../utils/api";

const offeringService = {
  createOffering: async (offeringData) => {
    const response = await api.post("/finance/offerings", offeringData);

    return response.data;
  },

  getOfferings: async () => {
    const response = await api.get("/finance/offerings");

    return response.data;
  },

  getOfferingById: async (id) => {
    const response = await api.get(`/finance/offerings/${id}`);

    return response.data;
  },

  updateOffering: async (id, offeringData) => {
    const response = await api.put(`/finance/offerings/${id}`, offeringData);

    return response.data;
  },

  deleteOffering: async (id) => {
    const response = await api.delete(`/finance/offerings/${id}`);

    return response.data;
  },

  getFinanceSummary: async () => {
    const response = await api.get("/finance/summary");

    return response.data;
  },
};

export default offeringService;
