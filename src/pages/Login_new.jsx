import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";

export default function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("client");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      console.log("🔐 Tentative de connexion avec:", { identifier, role });

      const res = await api.post("/auth/login/", {
        identifier,
        password,
        role,
      });

      // ✅ Parser la réponse standardisée {success, message, data}
      const responseData = res.data;
      console.log("✅ Réponse de connexion:", responseData);

      if (responseData?.success === true && responseData?.data) {
        // ✅ SUCCÈS: tokens et user reçus
        const { data } = responseData;
        
        // Sauvegarder les tokens
        localStorage.setItem("access_token", data.access);
        localStorage.setItem("refresh_token", data.refresh || "");
        
        // Mettre à jour le contexte d'authentification
        if (data.user) {
          login(data.user);
        }
        
        // Afficher un message de succès
        setSuccess(`✅ ${responseData.message || 'Connexion réussie!'}`);
        
        // Rediriger après 1 seconde
        setTimeout(() => {
          const redirectPath = data.user?.role === "seller" ? "/seller/dashboard" : "/";
          navigate(redirectPath);
        }, 1000);
      } else {
        // ❌ La réponse n'a pas success=true
        const errorMsg = responseData?.message || "Erreur lors de la connexion";
        setError(`❌ ${errorMsg}`);
      }
    } catch (err) {
      // ✅ Gestion des erreurs HTTP
      console.error("❌ Erreur de connexion:", err);

      let errorMessage = "❌ Erreur lors de la connexion";

      if (err.response?.data?.message) {
        // ✅ Le serveur a retourné {success: false, message: "..."}
        errorMessage = `❌ ${err.response.data.message}`;
      } else if (err.response?.data?.detail) {
        // Fallback ancien format (pour compatibilité)
        errorMessage = `❌ ${err.response.data.detail}`;
      } else if (err.response?.status === 401) {
        errorMessage = "❌ Email/téléphone ou mot de passe incorrect";
      } else if (err.response?.status === 400) {
        errorMessage = "❌ Veuillez entrer vos identifiants";
      } else if (err.response?.status === 500) {
        errorMessage = "❌ Erreur serveur. Veuillez réessayer plus tard";
      } else if (err.code === "ECONNABORTED") {
        errorMessage = "❌ Connexion expirée. Veuillez réessayer";
      } else if (!err.response) {
        errorMessage = "❌ Erreur de connexion au serveur";
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "grid",
      placeItems: "center",
      padding: "2rem",
      background: "radial-gradient(circle at top, rgba(201,160,48,0.14), transparent 35%), linear-gradient(180deg, #f5f7fb 0%, #eef2f8 100%)"
    }}>
      <div style={{
        width: "100%",
        maxWidth: "480px",
        backgroundColor: "white",
        padding: "2rem",
        borderRadius: "18px",
        boxShadow: "0 18px 50px rgba(15, 23, 42, 0.12)",
        border: "1px solid rgba(27,58,107,0.08)"
      }}>
        <div style={{ marginBottom: "1.5rem" }}>
          <p style={{ margin: 0, color: "#c9a030", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", fontSize: "0.75rem" }}>SafinPay</p>
          <h1 style={{ fontSize: "2rem", margin: "0.35rem 0 0", color: "#1b3a6b" }}>SafinPay</h1>
          <p style={{ margin: "0.5rem 0 0", color: "#667085" }}>Choisis ton rôle, puis connecte-toi avec tes identifiants Neon.</p>
        </div>

        {/* ✅ Afficher les messages d'erreur */}
        {error && (
          <div style={{
            backgroundColor: "#fff1f2",
            color: "#b42318",
            padding: "0.9rem 1rem",
            borderRadius: "12px",
            marginBottom: "1rem",
            fontSize: "0.92rem",
            border: "1px solid rgba(180,35,24,0.15)",
            animation: "slideDown 0.3s ease-out"
          }}>
            {error}
          </div>
        )}

        {/* ✅ Afficher les messages de succès */}
        {success && (
          <div style={{
            backgroundColor: "#e6f9f0",
            color: "#0a5e4d",
            padding: "0.9rem 1rem",
            borderRadius: "12px",
            marginBottom: "1rem",
            fontSize: "0.92rem",
            border: "1px solid rgba(10,94,77,0.2)",
            animation: "slideDown 0.3s ease-out"
          }}>
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", fontWeight: 700, marginBottom: "0.45rem", color: "#1b3a6b" }}>
              Je me connecte en tant que
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="form-select"
              style={{ width: "100%" }}
            >
              <option value="client">👤 Client</option>
              <option value="seller">🛍️ Vendeur</option>
            </select>
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", fontWeight: 700, marginBottom: "0.45rem", color: "#1b3a6b" }}>
              Email ou téléphone
            </label>
            <input
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
              className="form-input"
              style={{ width: "100%" }}
              placeholder={role === "seller" ? "vendeur@email.com" : "client@email.com"}
              autoComplete="username"
            />
          </div>

          <div style={{ marginBottom: "1.25rem" }}>
            <label style={{ display: "block", fontWeight: 700, marginBottom: "0.45rem", color: "#1b3a6b" }}>
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-input"
              style={{ width: "100%" }}
              placeholder="Entrez votre mot de passe"
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
            style={{
              width: "100%",
              padding: "0.9rem",
              borderRadius: "12px",
              opacity: loading ? 0.7 : 1,
              cursor: loading ? "not-allowed" : "pointer",
              fontWeight: 700,
              background: loading ? "#ccc" : undefined,
              transition: "all 0.2s ease"
            }}
          >
            {loading ? "⏳ Connexion en cours..." : "✅ Se connecter"}
          </button>
        </form>

        <div style={{
          display: "grid",
          gap: "0.85rem",
          gridTemplateColumns: "1fr 1fr",
          marginTop: "1rem"
        }}>
          <div style={{
            padding: "0.85rem",
            borderRadius: "12px",
            background: "#f8fafc",
            border: "1px solid #e5e7eb"
          }}>
            <p style={{ margin: 0, fontWeight: 700, color: "#1b3a6b" }}>👤 Client</p>
            <p style={{ margin: "0.35rem 0 0", color: "#667085", fontSize: "0.88rem" }}>Achats, panier, commandes.</p>
          </div>
          <div style={{
            padding: "0.85rem",
            borderRadius: "12px",
            background: "#fffaf1",
            border: "1px solid rgba(201,160,48,0.25)"
          }}>
            <p style={{ margin: 0, fontWeight: 700, color: "#7a5e00" }}>🛍️ Vendeur</p>
            <p style={{ margin: "0.35rem 0 0", color: "#8a6a00", fontSize: "0.88rem" }}>Dashboard, produits, boutique.</p>
          </div>
        </div>

        <div style={{
          borderTop: "1px solid #eef2f7",
          paddingTop: "1rem",
          marginTop: "1.25rem"
        }}>
          <p style={{ color: "#667085", margin: 0, fontSize: "0.92rem" }}>
            Pas encore de compte ?{' '}
            <Link to="/register" style={{ color: "#1b3a6b", textDecoration: "none", fontWeight: 700 }}>
              Créer un compte
            </Link>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes slideDown {
          from { 
            opacity: 0; 
            transform: translateY(-10px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
      `}</style>
    </div>
  );
}
