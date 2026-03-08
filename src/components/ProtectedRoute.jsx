import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export function ProtectedRoute({ children, requireAuth = true, requireSeller = false }) {
  const authContext = useContext(AuthContext);
  const { user, loading } = authContext;

  if (loading) {
    return <div style={{ padding: "2rem", textAlign: "center" }}>Chargement...</div>;
  }

  // Route protégée nécessitant authentification
  if (requireAuth && !user) {
    return <Navigate to="/login" />;
  }

  // Route protégée nécessitant statut vendeur
  if (requireSeller && user && !user.is_seller) {
    return <Navigate to="/become-seller" />;
  }

  return children;
}
