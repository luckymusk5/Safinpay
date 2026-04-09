import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "https://safinpaybackend-production.up.railway.app/api/";

// Création d'une instance Axios
const api = axios.create({
  baseURL: API_BASE_URL,
});

const authFreePaths = ["/auth/login/", "/auth/register/", "/auth/refresh/"];
const refreshClient = axios.create({
  baseURL: API_BASE_URL,
});

// Intercepteur pour ajouter le token JWT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Intercepteur pour gérer les erreurs globales
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config || {};
    const status = error.response?.status;
    const requestUrl = String(originalRequest.url || "");

    if (
      status === 401 &&
      !originalRequest._retry &&
      !authFreePaths.some((path) => requestUrl.includes(path))
    ) {
      const refreshToken = localStorage.getItem("refresh_token");
      if (refreshToken) {
        originalRequest._retry = true;
        try {
          const refreshResponse = await refreshClient.post("/auth/refresh/", {
            refresh: refreshToken,
          });
          const newAccessToken = refreshResponse.data?.access;
          if (newAccessToken) {
            localStorage.setItem("access_token", newAccessToken);
            localStorage.setItem("refresh_token", refreshResponse.data?.refresh || refreshToken);
            originalRequest.headers = originalRequest.headers || {};
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return api(originalRequest);
          }
        } catch (refreshError) {
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          window.location = "/login";
          return Promise.reject(refreshError);
        }
      }

      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      window.location = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;
