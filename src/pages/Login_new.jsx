import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/login/", {
        email,
        password
      });

      if (res.data.access) {
        // Sauvegarder le token
        localStorage.setItem("access_token", res.data.access);
        localStorage.setItem("refresh_token", res.data.refresh || "");
        
        // Récupérer les infos utilisateur
        login(res.data.user);
        
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.detail || "Email ou mot de passe incorrect");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      backgroundColor: "#f5f5f5",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem"
    }}>
      <div style={{
        width: "100%",
        maxWidth: "400px",
        backgroundColor: "white",
        padding: "2rem",
        borderRadius: "4px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
      }}>
        <h1 style={{
          fontSize: "1.5rem",
          marginBottom: "1.5rem",
          textAlign: "center",
          color: "#131921"
        }}>
          Se connecter
        </h1>

        {error && (
          <div style={{
            backgroundColor: "#fee",
            color: "#c00",
            padding: "0.75rem",
            borderRadius: "4px",
            marginBottom: "1rem",
            fontSize: "0.9rem"
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{
              display: "block",
              fontWeight: "600",
              marginBottom: "0.5rem",
              color: "#131921"
            }}>
              Email ou numéro de téléphone
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-input"
              style={{ width: "100%" }}
              placeholder="exemple@email.com"
            />
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{
              display: "block",
              fontWeight: "600",
              marginBottom: "0.5rem",
              color: "#131921"
            }}>
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
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
            style={{
              width: "100%",
              padding: "0.75rem",
              marginBottom: "1rem",
              opacity: loading ? 0.6 : 1,
              cursor: loading ? "not-allowed" : "pointer"
            }}
          >
            {loading ? "Connexion en cours..." : "Se connecter"}
          </button>
        </form>

        <div style={{
          borderTop: "1px solid #ddd",
          paddingTop: "1.5rem",
          marginTop: "1.5rem"
        }}>
          <p style={{ color: "#666", marginBottom: "1rem", fontSize: "0.9rem" }}>
            Vous n'avez pas de compte?{" "}
            <Link to="/register" style={{ color: "#0066c0", textDecoration: "none", fontWeight: "600" }}>
              Créer votre compte
            </Link>
          </p>
        </div>

        <div style={{
          backgroundColor: "#f9f9f9",
          padding: "1rem",
          borderRadius: "4px",
          marginTop: "1.5rem",
          fontSize: "0.85rem",
          color: "#666"
        }}>
          <p style={{ margin: "0 0 0.5rem 0" }}>🔒 Vos données sont sécurisées</p>
          <p style={{ margin: "0" }}>Nous utilisons le chiffrement SSL pour protéger vos informations.</p>
        </div>
      </div>
    </div>
  );
}
