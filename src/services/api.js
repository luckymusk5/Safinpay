import axios from "axios";

// Création d'une instance Axios
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

// Intercepteur pour ajouter le token JWT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  console.log("Token envoyé:", token ? "✓ Présent" : "✗ Absent");
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log("Header Authorization défini");
  } else {
    console.warn("Pas de token trouvé!");
  }
  return config;
});

// Intercepteur pour gérer les erreurs globales
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      console.error("Erreur d'authentification (401/403):", error.response?.data);
      if (error.response?.data?.code === 'token_not_valid') {
        console.error("Token invalide - redirection vers login");
        localStorage.removeItem("access_token");
        window.location = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
