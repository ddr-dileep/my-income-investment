import apiClient from "@/lib/apiClient";

export const authAPI = {
  register: async (data: object) => {
    try {
      const resp = await apiClient.post("/user/register", data);
      return resp?.data;
    } catch (error) {
      throw error;
    }
  },

  login: async (data: object) => {
    try {
      const resp = await apiClient.post("/user/login", data);
      return resp?.data;
    } catch (error) {
      throw error;
    }
  },

  userInfo: async () => {
    try {
      const resp = await apiClient.get("/user/info");
      return resp?.data;
    } catch (error) {
      throw error;
    }
  },
};
