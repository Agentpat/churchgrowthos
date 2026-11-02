import api from "../utils/api";

const login = async (credentials) => {
  const response = await api.post("/auth/login", credentials);

  return response.data;
};

const register = async (data) => {
  const response = await api.post("/auth/register", data);

  return response.data;
};

const authService = {
  login,

  register,
};

export default authService;
