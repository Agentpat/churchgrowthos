import api from "../utils/api";

const membersService = {
  createMember: async (memberData) => {
    const response = await api.post("/members", memberData);

    return response.data;
  },

  getMembers: async () => {
    const response = await api.get("/members");

    return response.data;
  },

  getMemberById: async (id) => {
    const response = await api.get(`/members/${id}`);

    return response.data;
  },

  updateMember: async (id, memberData) => {
    const response = await api.put(`/members/${id}`, memberData);

    return response.data;
  },

  // Soft delete member
  deactivateMember: async (id) => {
    const response = await api.patch(`/members/${id}/deactivate`);

    return response.data;
  },

  // Restore inactive member
  reactivateMember: async (id) => {
    const response = await api.patch(`/members/${id}/reactivate`);

    return response.data;
  },

  // Member activity history
  getMemberActivity: async (memberId) => {
    const response = await api.get(`/members/${memberId}/activity`);

    return response.data;
  },

  // Member groups
  getMemberGroups: async (memberId) => {
    const response = await api.get(`/groups/member/${memberId}`);

    return response.data;
  },

  // Member follow ups
  getMemberFollowUps: async (memberId) => {
    const response = await api.get(`/followups/member/${memberId}`);

    return response.data;
  },
};

export default membersService;
