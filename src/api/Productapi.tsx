import axios from "axios";
import AuthStore from "../store/AuthStore";

const api = axios.create({
  baseURL: "https://dummyjson.com",
});

api.interceptors.request.use((config) => {
  const token = AuthStore.getState().accessToken;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalResponse = error.config;
    if (error.response?.status === 401 && !originalResponse._retry) {
      originalResponse._retry = true;
      console.error("Unauthorized access");
      try {
        const refreshtoken = AuthStore.getState().refreshToken;

        const res = await api.post("auth/refresh", {
          refreshToken: refreshtoken,
          expiresInMins: 10,
        });

        const newAccessToken = res.data.accessToken;
        const newrefreshToken = res.data.refreshToken;
        AuthStore.getState().setAccessToken(newAccessToken);
        AuthStore.getState().setRefreshToken(newrefreshToken);
        return api(originalResponse);
      } catch (error) {
        console.log("Refresh Failed");
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
);
export default api;
