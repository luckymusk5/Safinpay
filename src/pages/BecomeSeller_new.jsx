import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function BecomeSeller_new() {
  const authContext = useContext(AuthContext);
  const { user, login } = authContext || { user: null, login: () => {} };
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    shop_name: "",
    category: "electronics",
    description: "",
    phone: "",
    bank_account: ""
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

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

    try {
      console.log("Données envoyées:", formData);
      const res = await api.post("/auth/register-seller/", formData);
      console.log("Réponse backend:", res.data);
      
      if (res.status === 201) {
        console.log("Réponse complète du backend:", JSON.stringify(res.data, null, 2));
        
        // Récupérer le seller_id depuis la réponse (peut être "id", "seller_id", etc)
        const sellerId = res.data.id || res.data.seller_id || res.data.seller;
        console.log("Seller ID extrait:", sellerId);
        
        // Mettre à jour l'utilisateur avec is_seller = true
        const updatedUser = { 
          ...user, 
          is_seller: true, 
          seller_id: sellerId
        };
        console.log("User mis à jour:", updatedUser);
        login(updatedUser);
        setSuccess(true);
      }
    } catch (err) {
      console.error("Erreur complète:", err.response);
      const errorDetail = err.response?.data?.detail || err.response?.data?.message || "Erreur lors de l'inscription";
      setError(errorDetail);
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
          maxWidth: "500px"
        }}>
          <p style={{ fontSize: "3rem", marginBottom: "1rem" }}>Succès</p>
          <h2>Félicitations! Vous êtes maintenant vendeur</h2>
          <p style={{ color: "#666", marginBottom: "1rem" }}>
            Votre boutique a été créée avec succès. Vous pouvez commencer à ajouter vos produits.
          </p>
          <button
            onClick={() => navigate("/seller/dashboard")}
            style={{
              padding: "0.75rem 1.5rem",
              backgroundColor: "#ff6b35",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "1rem"
            }}
          >
            Aller au Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#f5f5f5", minHeight: "100vh", padding: "2rem 0" }}>
      <div style={{ maxWidth: "700px", margin: "0 auto", padding: "0 1.5rem" }}>
        <h1 style={{ marginBottom: "0.5rem", textAlign: "center" }}>Devenir vendeur</h1>
        <p style={{ 
          color: "#666", 
          textAlign: "center", 
          marginBottom: "2rem",
          fontSize: "1rem"
        }}>
          Rejoignez des milliers de vendeurs et développez votre activité sur SafinPay
        </p>

        {error && (
          <div style={{
            backgroundColor: "#fee",
            color: "#c00",
            padding: "1rem",
            borderRadius: "4px",
            marginBottom: "2rem"
          }}>
            {error}
          </div>
        )}

        <div style={{ backgroundColor: "white", padding: "2rem", borderRadius: "4px" }}>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "1.5rem" }}>
              <label style={{
                display: "block",
                fontWeight: "600",
                marginBottom: "0.5rem"
              }}>
                Nom de votre boutique *
              </label>
              <input
                type="text"
                name="shop_name"
                value={formData.shop_name}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="Ex: Ma Boutique Électronique"
              />
            </div>

            <div style={{ marginBottom: "1.5rem" }}>
              <label style={{
                display: "block",
                fontWeight: "600",
                marginBottom: "0.5rem"
              }}>
                Catégorie principale *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="form-select"
              >
                <option value="electronics">Électronique</option>
                <option value="fashion">Mode et vêtements</option>
                <option value="home">Maison et décoration</option>
                <option value="sports">Sports et loisirs</option>
                <option value="books">Livres</option>
                <option value="beauty">Beauté et soins</option>
                <option value="other">Autre</option>
              </select>
            </div>

            <div style={{ marginBottom: "1.5rem" }}>
              <label style={{
                display: "block",
                fontWeight: "600",
                marginBottom: "0.5rem"
              }}>
                Description de votre boutique *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="form-textarea"
                placeholder="Décrivez votre boutique, vos produits, votre expérience..."
                required
                style={{ minHeight: "120px" }}
              />
            </div>

            <div style={{ marginBottom: "1.5rem" }}>
              <label style={{
                display: "block",
                fontWeight: "600",
                marginBottom: "0.5rem"
              }}>
                Numéro de téléphone *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="form-input"
                placeholder="+221 77 XXX XX XX"
                required
              />
            </div>

            <div style={{ marginBottom: "1.5rem" }}>
              <label style={{
                display: "block",
                fontWeight: "600",
                marginBottom: "0.5rem"
              }}>
                Compte bancaire (optionnel)
              </label>
              <input
                type="text"
                name="bank_account"
                value={formData.bank_account}
                onChange={handleChange}
                className="form-input"
                placeholder="Numéro de compte pour les virements"
              />
            </div>

            <div style={{
              background: "#f9fafb",
              padding: "1.5rem",
              borderRadius: "4px",
              marginBottom: "1.5rem"
            }}>
              <h3 style={{ marginBottom: "1rem", fontSize: "1rem" }}>Avantages de vendre</h3>
              <ul style={{ color: "#666", lineHeight: "1.8", paddingLeft: "1.5rem", margin: "0" }}>
                <li>✓ Accès à des millions de clients potentiels</li>
                <li>✓ Outils de gestion de boutique intégrés</li>
                <li>✓ Support vendeur 24/7 en français</li>
                <li>✓ Système de paiement sécurisé</li>
                <li>✓ Livraison rapide et fiable</li>
                <li>✓ Commissions compétitives à partir de 5%</li>
              </ul>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary btn-block"
              style={{ padding: "1rem", fontSize: "1rem" }}
            >
              {loading ? "En cours..." : "Soumettre ma demande"}
            </button>
          </form>

          <div style={{ marginTop: "1.5rem", textAlign: "center", color: "#666" }}>
            <p>Des questions? Contactez notre support</p>
          </div>
        </div>
      </div>
    </div>
  );
}