import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

export default function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password_confirm: "",
    first_name: "",
    last_name: "",
    phone: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
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
    setLoading(true);

    // Validation
    if (formData.password !== formData.password_confirm) {
      setError("Les mots de passe ne correspondent pas");
      setLoading(false);
      return;
    }

    try {
      const res = await api.post("/auth/register/", {
        email: formData.email,
        password: formData.password,
        first_name: formData.first_name,
        last_name: formData.last_name,
        phone: formData.phone
      });

      if (res.status === 201) {
        setSuccess(true);
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (err) {
      console.error("Erreur d'enregistrement:", err.response?.data);
      let errorMessage = "Erreur lors de l'inscription";
      
      if (err.response?.data?.detail) {
        errorMessage = err.response.data.detail;
      } else if (err.response?.data?.email) {
        errorMessage = Array.isArray(err.response.data.email) ? err.response.data.email[0] : err.response.data.email;
      } else if (err.response?.data?.password) {
        errorMessage = Array.isArray(err.response.data.password) ? err.response.data.password[0] : err.response.data.password;
      } else if (typeof err.response?.data === 'object') {
        errorMessage = JSON.stringify(err.response.data);
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div style={{
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <div style={{
          backgroundColor: "white",
          padding: "3rem",
          borderRadius: "4px",
          textAlign: "center",
          maxWidth: "400px"
        }}>
          <p style={{ fontSize: "3rem", marginBottom: "1rem" }}>Succès</p>
          <h2>Inscription réussie!</h2>
          <p style={{ color: "#666", marginBottom: "1rem" }}>
            Vérifiez votre email pour confirmer votre compte.
          </p>
          <p style={{ color: "#999", fontSize: "0.9rem" }}>
            Redirection vers la connexion...
          </p>
        </div>
      </div>
    );
  }

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
        maxWidth: "450px",
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
          Créer votre compte
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
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
            <div>
              <label style={{
                display: "block",
                fontWeight: "600",
                marginBottom: "0.3rem",
                color: "#131921",
                fontSize: "0.9rem"
              }}>
                Prénom
              </label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                required
                className="form-input"
                style={{ width: "100%", fontSize: "0.95rem" }}
                placeholder="Prénom"
              />
            </div>
            <div>
              <label style={{
                display: "block",
                fontWeight: "600",
                marginBottom: "0.3rem",
                color: "#131921",
                fontSize: "0.9rem"
              }}>
                Nom
              </label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                required
                className="form-input"
                style={{ width: "100%", fontSize: "0.95rem" }}
                placeholder="Nom"
              />
            </div>
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label style={{
              display: "block",
              fontWeight: "600",
              marginBottom: "0.3rem",
              color: "#131921",
              fontSize: "0.9rem"
            }}>
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-input"
              style={{ width: "100%", fontSize: "0.95rem" }}
              placeholder="exemple@email.com"
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label style={{
              display: "block",
              fontWeight: "600",
              marginBottom: "0.3rem",
              color: "#131921",
              fontSize: "0.9rem"
            }}>
              Numéro de téléphone
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="form-input"
              style={{ width: "100%", fontSize: "0.95rem" }}
              placeholder="+xxx xxx xxx"
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label style={{
              display: "block",
              fontWeight: "600",
              marginBottom: "0.3rem",
              color: "#131921",
              fontSize: "0.9rem"
            }}>
              Mot de passe
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="form-input"
              style={{ width: "100%", fontSize: "0.95rem" }}
              placeholder="Au moins 8 caractères"
            />
            <small style={{ color: "#666", fontSize: "0.8rem", marginTop: "0.3rem", display: "block" }}>
              Minimum 8 caractères, 1 majuscule, 1 chiffre
            </small>
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{
              display: "block",
              fontWeight: "600",
              marginBottom: "0.3rem",
              color: "#131921",
              fontSize: "0.9rem"
            }}>
              Confirmer le mot de passe
            </label>
            <input
              type="password"
              name="password_confirm"
              value={formData.password_confirm}
              onChange={handleChange}
              required
              className="form-input"
              style={{ width: "100%", fontSize: "0.95rem" }}
              placeholder="Confirmez votre mot de passe"
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
            {loading ? "Inscription en cours..." : "Créer mon compte"}
          </button>
        </form>

        <div style={{
          borderTop: "1px solid #ddd",
          paddingTop: "1rem",
          marginTop: "1rem"
        }}>
          <p style={{ color: "#666", marginBottom: "0", fontSize: "0.9rem" }}>
            Vous avez déjà un compte?{" "}
            <Link to="/login" style={{ color: "#0066c0", textDecoration: "none", fontWeight: "600" }}>
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
