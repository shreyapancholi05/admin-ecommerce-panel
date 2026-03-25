import axios from "axios";
import AuthStore from "../store/AuthStore";

const api = axios.create({
  baseURL: "https://dummyjson.com",
  headers: {
    "Content-Type": "application/json",
  },
});


api.interceptors.request.use((config) => {
  const token = AuthStore.getState().accessToken;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
export default api;

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      console.error("Unauthorized access");
      try {
        const refreshtoken = AuthStore.getState().refreshToken;

        const res = await api.post("/auth/refresh", {
          refreshToken: refreshtoken,
          expiresInMins: 30,
        });
        const newAccessToken = res.data.accessToken;
        const newrefreshtoken = res.data.refreshToken;
        AuthStore.getState().setAccessToken(newAccessToken);
        AuthStore.getState().setRefreshToken(newrefreshtoken);
        original.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(original);
      } catch (error) {
        console.log("Refresh Failed");
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
);
