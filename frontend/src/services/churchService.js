import api from "../utils/api";

const getProfile = async () => {
  const response = await api.get("/church/profile");

  return response.data;
};

const updateProfile = async (profileData) => {
  const response = await api.put("/church/profile", profileData);

  return response.data;
};

export default {
  getProfile,
  updateProfile,
};
