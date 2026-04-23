import axios from "axios";
import { cacheService } from "./cacheService";

const API_BASE_URL = import.meta.env.VITE_API_URL || "https://safinpaybackend-production.up.railway.app/api/";

// Création d'une instance Axios
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30s timeout (images lazy loading peut être long)
});

const authFreePaths = ["/auth/login/", "/auth/register/", "/auth/refresh/"];
const refreshClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30s timeout
});

// ✅ Intercepteur de cache pour les requêtes GET
api.interceptors.request.use(async (config) => {
  // Ajouter token JWT
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Cache pour les requêtes GET (sauf auth)
  if (config.method === 'get' && !authFreePaths.some(p => config.url?.includes(p))) {
    const cacheKey = cacheService.getCacheKey(config.url, config.params);
    
    // Vérifier le cache mémoire d'abord (ultra rapide)
    const cached = cacheService.getMemory(cacheKey);
    if (cached) {
      config.adapter = async () => ({ data: cached, status: 200 });
      return config;
    }
  }

  return config;
});

// Intercepteur pour gérer les erreurs globales ET mettre en cache
api.interceptors.response.use(
  (response) => {
    // ✅ Cacher les réponses GET (sauf auth)
    if (response.config && response.config.method === 'get' && !authFreePaths.some(p => response.config.url?.includes(p))) {
      const cacheKey = cacheService.getCacheKey(response.config.url, response.config.params);
      const ttl = response.config.url?.includes('/products') ? 60 * 60 * 1000 : 24 * 60 * 60 * 1000; // 1h pour produits, 24h autres
      cacheService.setMemory(cacheKey, response.data, ttl);
    }
    return response;
  },
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
