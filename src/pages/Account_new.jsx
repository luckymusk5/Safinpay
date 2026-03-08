import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Account() {
  const authContext = useContext(AuthContext) || {};
  const user = authContext?.user;
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "Profil"},
    { id: "orders", label: "Commandes"},
    { id: "addresses", label: "Adresses"},
    { id: "payments", label: "Paiements"},
    { id: "wishlists", label: "Listes de souhaits"}
  ];

  if (!user) {
    return (
      <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <h2>Connectez-vous à votre compte</h2>
          <p style={{ color: "#666", margin: "1rem 0" }}>Accédez à votre panier, à votre historique de commandes et bien plus...</p>
          <Link to="/login" className="btn btn-primary">Se connecter</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#f5f5f5", minHeight: "100vh", padding: "2rem 0" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: "2rem" }}>
          {/* Menu */}
          <div>
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  width: "100%",
                  padding: "1rem",
                  background: activeTab === tab.id ? "#e8f0f7" : "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  marginBottom: "0.5rem",
                  borderLeft: activeTab === tab.id ? "3px solid #ff9900" : "3px solid transparent",
                  color: activeTab === tab.id ? "#ff9900" : "#0f1111",
                  fontWeight: activeTab === tab.id ? "600" : "400",
                  fontSize: "0.95rem"
                }}
              >
                <span style={{ fontSize: "1.2rem" }}>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Contenu */}
          <div style={{ background: "white", borderRadius: "4px", padding: "2rem" }}>
            {activeTab === "profile" && (
              <div>
                <h2>Informations de profil</h2>
                <div className="dashboard-grid" style={{ marginTop: "1.5rem" }}>
                  <div className="stat-card">
                    <p className="stat-label">Nom</p>
                    <p className="stat-value" style={{ color: "#0f1111" }}>{user.name}</p>
                  </div>
                  <div className="stat-card">
                    <p className="stat-label">Email</p>
                    <p className="stat-value" style={{ color: "#0f1111", fontSize: "1rem" }}>{user.email}</p>
                  </div>
                  <div className="stat-card">
                    <p className="stat-label">Rôle</p>
                    <p className="stat-value" style={{ color: "#0f1111" }}>
                      {user.role === "seller" ? "Vendeur" : "Acheteur"}
                    </p>
                  </div>
                </div>
                <button className="btn btn-secondary" style={{ marginTop: "1.5rem" }}>Modifier le profil</button>
              </div>
            )}

            {activeTab === "orders" && (
              <div>
                <h2>Mes commandes</h2>
                <div style={{ marginTop: "1.5rem" }}>
                  {[...Array(3)].map((_, i) => (
                    <div key={i} style={{
                      background: "#f9fafb",
                      padding: "1rem",
                      borderRadius: "4px",
                      marginBottom: "1rem",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}>
                      <div>
                        <p style={{ fontWeight: "600" }}>Commande #12345{i}</p>
                        <p style={{ color: "#666", fontSize: "0.9rem" }}>Il y a {i + 1} jours</p>
                        <p style={{ color: "#666", fontSize: "0.9rem" }}>Total: 150,000 FCFA</p>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <p style={{ color: "#00a699", fontWeight: "600", marginBottom: "0.5rem" }}>Livrée</p>
                        <button className="btn btn-secondary btn-small">Détails</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "addresses" && (
              <div>
                <h2>Mes adresses</h2>
                <div style={{ marginTop: "1.5rem" }}>
                  <div style={{
                    background: "#f9fafb",
                    padding: "1.5rem",
                    borderRadius: "4px",
                    marginBottom: "1rem",
                    borderLeft: "3px solid #ff9900"
                  }}>
                    <p style={{ fontWeight: "600", marginBottom: "0.5rem" }}>Adresse par défaut</p>
                    <p style={{ color: "#666" }}>123 Rue de la Paix, Dakar, Sénégal 10000</p>
                    <button className="btn btn-secondary btn-small" style={{ marginTop: "0.75rem" }}>Modifier</button>
                  </div>
                </div>
                <button className="btn btn-primary">Ajouter une adresse</button>
              </div>
            )}

            {activeTab === "payments" && (
              <div>
                <h2>Mes moyens de paiement</h2>
                <div style={{ marginTop: "1.5rem" }}>
                  <div style={{
                    background: "#f9fafb",
                    padding: "1.5rem",
                    borderRadius: "4px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}>
                    <div>
                      <p style={{ fontWeight: "600" }}> Visa se terminant par 4242</p>
                      <p style={{ color: "#666", fontSize: "0.9rem" }}>Expire le 12/26</p>
                    </div>
                    <div>
                      <button className="btn btn-secondary btn-small">Modifier</button>
                    </div>
                  </div>
                </div>
                <button className="btn btn-primary" style={{ marginTop: "1rem" }}>Ajouter un moyen de paiement</button>
              </div>
            )}

            {activeTab === "wishlists" && (
              <div>
                <h2>Listes de souhaits</h2>
                <p style={{ color: "#666", marginTop: "1rem" }}>Vous n'avez pas encore créé de liste de souhaits</p>
                <button className="btn btn-primary" style={{ marginTop: "1rem" }}>Créer une liste</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
