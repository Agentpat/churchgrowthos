import api from "../utils/api";

const groupService = {
  // =====================================
  // Groups
  // =====================================

  // Create new group
  createGroup: async (groupData) => {
    const response = await api.post("/groups", groupData);

    return response.data;
  },

  // Get all groups
  getGroups: async () => {
    const response = await api.get("/groups");

    return response.data;
  },

  // Get single group details
  getGroupById: async (groupId) => {
    const response = await api.get(`/groups/${groupId}`);

    return response.data;
  },

  // Update group
  updateGroup: async (groupId, groupData) => {
    const response = await api.put(`/groups/${groupId}`, groupData);

    return response.data;
  },

  // Deactivate group
  deactivateGroup: async (groupId) => {
    const response = await api.patch(`/groups/${groupId}/deactivate`);

    return response.data;
  },

  // =====================================
  // Group Members
  // =====================================

  // Add member to group
  addMemberToGroup: async (groupId, data) => {
    const response = await api.post(`/groups/${groupId}/members`, data);

    return response.data;
  },

  // Remove member from group
  removeMemberFromGroup: async (groupId, memberId) => {
    const response = await api.delete(`/groups/${groupId}/members/${memberId}`);

    return response.data;
  },

  // Get all members inside a group
  getGroupMembers: async (groupId) => {
    const response = await api.get(`/groups/${groupId}/members`);

    return response.data;
  },

  // Get groups belonging to a member
  getMemberGroups: async (memberId) => {
    const response = await api.get(`/groups/member/${memberId}`);

    return response.data;
  },

  // Assign member shortcut
  // Used by AddMemberModal

  assignMember: async (groupId, memberId, role = "MEMBER") => {
    const response = await api.post(`/groups/${groupId}/members`, {
      memberId,
      role,
    });

    return response.data;
  },

  // =====================================
  // Future Expansion
  // =====================================

  // Get group attendance
  getGroupAttendance: async (groupId) => {
    const response = await api.get(`/groups/${groupId}/attendance`);

    return response.data;
  },

  // Get group activities
  getGroupActivity: async (groupId) => {
    const response = await api.get(`/groups/${groupId}/activity`);

    return response.data;
  },
};



export default groupService;
