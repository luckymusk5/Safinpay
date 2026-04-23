import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";

export default function Register() {
  const [formData, setFormData] = useState({
    role: "client",
    email: "",
    password: "",
    password_confirm: "",
    first_name: "",
    last_name: "",
    phone: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    // ✅ Validation côté client: les mots de passe correspondent
    if (formData.password !== formData.password_confirm) {
      setError("❌ Les mots de passe ne correspondent pas");
      setLoading(false);
      return;
    }

    // ✅ Validation côté client: email valide
    if (!formData.email.includes("@")) {
      setError("❌ Veuillez entrer une adresse email valide");
      setLoading(false);
      return;
    }

    try {
      console.log("📝 Envoi de l'inscription avec les données:", {
        role: formData.role,
        email: formData.email,
        first_name: formData.first_name,
        last_name: formData.last_name,
        phone: formData.phone
      });

      // ✅ Appel API avec Axios
      const res = await api.post("/auth/register/", {
        role: formData.role,
        email: formData.email,
        password: formData.password,
        first_name: formData.first_name,
        last_name: formData.last_name,
        phone: formData.phone
      });

      // ✅ Parser la réponse standardisée {success, message, data}
      const responseData = res.data;
      console.log("✅ Réponse du serveur:", responseData);

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
        setSuccess(`✅ ${responseData.message || 'Inscription réussie!'}`);
        
        // Rediriger après 1.5 secondes
        setTimeout(() => {
          const redirectPath = data.user?.role === "seller" ? "/seller/dashboard" : "/";
          navigate(redirectPath);
        }, 1500);
      } else {
        // ❌ La réponse n'a pas success=true
        const errorMsg = responseData?.message || "Erreur lors de l'inscription";
        setError(`❌ ${errorMsg}`);
      }

    } catch (err) {
      // ✅ Gestion des erreurs HTTP
      console.error("❌ Erreur d'enregistrement:", err);

      let errorMessage = "❌ Erreur lors de l'inscription";

      if (err.response?.data?.message) {
        // ✅ Le serveur a retourné {success: false, message: "..."}
        errorMessage = `❌ ${err.response.data.message}`;
      } else if (err.response?.data?.detail) {
        // Fallback ancien format (pour compatibilité)
        errorMessage = `❌ ${err.response.data.detail}`;
      } else if (err.response?.status === 409) {
        errorMessage = "❌ Un compte avec cet email existe déjà";
      } else if (err.response?.status === 400) {
        errorMessage = "❌ Données invalides. Veuillez vérifier vos informations";
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
      padding: "2rem",
      display: "grid",
      placeItems: "center",
      background: "linear-gradient(180deg, #f7f9fc 0%, #eef3f8 100%)"
    }}>
      <div style={{
        width: "100%",
        maxWidth: "560px",
        backgroundColor: "white",
        padding: "2rem",
        borderRadius: "18px",
        boxShadow: "0 18px 50px rgba(15, 23, 42, 0.12)",
        border: "1px solid rgba(27,58,107,0.08)"
      }}>
        <div style={{ marginBottom: "1.5rem" }}>
          <p style={{ margin: 0, color: "#c9a030", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", fontSize: "0.75rem" }}>SafinPay</p>
          <h1 style={{ fontSize: "2rem", margin: "0.35rem 0 0", color: "#1b3a6b" }}>Créer un compte</h1>
          <p style={{ margin: "0.5rem 0 0", color: "#667085" }}>Inscription client ou vendeur. Les données sont enregistrées dans Neon.</p>
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
              Type de compte
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="form-select"
              style={{ width: "100%" }}
            >
              <option value="client">Client</option>
              <option value="seller">Vendeur</option>
            </select>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
            <div>
              <label style={{ display: "block", fontWeight: 700, marginBottom: "0.35rem", color: "#1b3a6b" }}>
                Prénom
              </label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                required
                className="form-input"
                style={{ width: "100%" }}
                placeholder="Prénom"
              />
            </div>
            <div>
              <label style={{ display: "block", fontWeight: 700, marginBottom: "0.35rem", color: "#1b3a6b" }}>
                Nom
              </label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                required
                className="form-input"
                style={{ width: "100%" }}
                placeholder="Nom"
              />
            </div>
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", fontWeight: 700, marginBottom: "0.35rem", color: "#1b3a6b" }}>
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-input"
              style={{ width: "100%" }}
              placeholder="exemple@email.com"
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", fontWeight: 700, marginBottom: "0.35rem", color: "#1b3a6b" }}>
              Numéro de téléphone
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="form-input"
              style={{ width: "100%" }}
              placeholder="+237 6xx xxx xxx"
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", fontWeight: 700, marginBottom: "0.35rem", color: "#1b3a6b" }}>
              Mot de passe
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="form-input"
              style={{ width: "100%" }}
              placeholder="Au moins 8 caractères"
            />
            <small style={{ color: "#667085", fontSize: "0.82rem", marginTop: "0.35rem", display: "block" }}>
              Minimum 8 caractères. Utilisez un mélange de majuscules, minuscules et chiffres.
            </small>
          </div>

          <div style={{ marginBottom: "1.4rem" }}>
            <label style={{ display: "block", fontWeight: 700, marginBottom: "0.35rem", color: "#1b3a6b" }}>
              Confirmer le mot de passe
            </label>
            <input
              type="password"
              name="password_confirm"
              value={formData.password_confirm}
              onChange={handleChange}
              required
              className="form-input"
              style={{ width: "100%" }}
              placeholder="Confirmez votre mot de passe"
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
            {loading ? "⏳ Inscription en cours..." : "✅ Créer mon compte"}
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
            <p style={{ margin: "0.35rem 0 0", color: "#667085", fontSize: "0.88rem" }}>Achat et suivi de commandes.</p>
          </div>
          <div style={{
            padding: "0.85rem",
            borderRadius: "12px",
            background: "#fffaf1",
            border: "1px solid rgba(201,160,48,0.25)"
          }}>
            <p style={{ margin: 0, fontWeight: 700, color: "#7a5e00" }}>🛍️ Vendeur</p>
            <p style={{ margin: "0.35rem 0 0", color: "#8a6a00", fontSize: "0.88rem" }}>Accès au dashboard vendeur.</p>
          </div>
        </div>

        <div style={{
          borderTop: "1px solid #eef2f7",
          paddingTop: "1rem",
          marginTop: "1.25rem"
        }}>
          <p style={{ color: "#667085", margin: 0, fontSize: "0.92rem" }}>
            Vous avez déjà un compte ?{' '}
            <Link to="/login" style={{ color: "#1b3a6b", textDecoration: "none", fontWeight: 700 }}>
              Se connecter
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
    <div style={{
      minHeight: "100vh",
      padding: "2rem",
      display: "grid",
      placeItems: "center",
      background: "linear-gradient(180deg, #f7f9fc 0%, #eef3f8 100%)"
    }}>
      <div style={{
        width: "100%",
        maxWidth: "560px",
        backgroundColor: "white",
        padding: "2rem",
        borderRadius: "18px",
        boxShadow: "0 18px 50px rgba(15, 23, 42, 0.12)",
        border: "1px solid rgba(27,58,107,0.08)"
      }}>
        <div style={{ marginBottom: "1.5rem" }}>
          <p style={{ margin: 0, color: "#c9a030", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", fontSize: "0.75rem" }}>SafinPay</p>
          <h1 style={{ fontSize: "2rem", margin: "0.35rem 0 0", color: "#1b3a6b" }}>Créer un compte</h1>
          <p style={{ margin: "0.5rem 0 0", color: "#667085" }}>Inscription client ou vendeur. Les données sont enregistrées dans Neon.</p>
        </div>

        {error && (
          <div style={{
            backgroundColor: "#fff1f2",
            color: "#b42318",
            padding: "0.9rem 1rem",
            borderRadius: "12px",
            marginBottom: "1rem",
            fontSize: "0.92rem",
            border: "1px solid rgba(180,35,24,0.15)"
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", fontWeight: 700, marginBottom: "0.45rem", color: "#1b3a6b" }}>
              Type de compte
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="form-select"
              style={{ width: "100%" }}
            >
              <option value="client">Client</option>
              <option value="seller">Vendeur</option>
            </select>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
            <div>
              <label style={{ display: "block", fontWeight: 700, marginBottom: "0.35rem", color: "#1b3a6b" }}>
                Prénom
              </label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                required
                className="form-input"
                style={{ width: "100%" }}
                placeholder="Prénom"
              />
            </div>
            <div>
              <label style={{ display: "block", fontWeight: 700, marginBottom: "0.35rem", color: "#1b3a6b" }}>
                Nom
              </label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                required
                className="form-input"
                style={{ width: "100%" }}
                placeholder="Nom"
              />
            </div>
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", fontWeight: 700, marginBottom: "0.35rem", color: "#1b3a6b" }}>
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-input"
              style={{ width: "100%" }}
              placeholder="exemple@email.com"
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", fontWeight: 700, marginBottom: "0.35rem", color: "#1b3a6b" }}>
              Numéro de téléphone
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="form-input"
              style={{ width: "100%" }}
              placeholder="+xxx xxx xxx"
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", fontWeight: 700, marginBottom: "0.35rem", color: "#1b3a6b" }}>
              Mot de passe
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="form-input"
              style={{ width: "100%" }}
              placeholder="Au moins 8 caractères"
            />
            <small style={{ color: "#667085", fontSize: "0.82rem", marginTop: "0.35rem", display: "block" }}>
              Minimum 8 caractères recommandés.
            </small>
          </div>

          <div style={{ marginBottom: "1.4rem" }}>
            <label style={{ display: "block", fontWeight: 700, marginBottom: "0.35rem", color: "#1b3a6b" }}>
              Confirmer le mot de passe
            </label>
            <input
              type="password"
              name="password_confirm"
              value={formData.password_confirm}
              onChange={handleChange}
              required
              className="form-input"
              style={{ width: "100%" }}
              placeholder="Confirmez votre mot de passe"
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
              fontWeight: 700
            }}
          >
            {loading ? "Inscription en cours..." : "Créer mon compte"}
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
            <p style={{ margin: 0, fontWeight: 700, color: "#1b3a6b" }}>Client</p>
            <p style={{ margin: "0.35rem 0 0", color: "#667085", fontSize: "0.88rem" }}>Achat et suivi de commandes.</p>
          </div>
          <div style={{
            padding: "0.85rem",
            borderRadius: "12px",
            background: "#fffaf1",
            border: "1px solid rgba(201,160,48,0.25)"
          }}>
            <p style={{ margin: 0, fontWeight: 700, color: "#7a5e00" }}>Vendeur</p>
            <p style={{ margin: "0.35rem 0 0", color: "#8a6a00", fontSize: "0.88rem" }}>Accès au dashboard vendeur.</p>
          </div>
        </div>

        <div style={{
          borderTop: "1px solid #eef2f7",
          paddingTop: "1rem",
          marginTop: "1.25rem"
        }}>
          <p style={{ color: "#667085", margin: 0, fontSize: "0.92rem" }}>
            Vous avez déjà un compte ?{' '}
            <Link to="/login" style={{ color: "#1b3a6b", textDecoration: "none", fontWeight: 700 }}>
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
