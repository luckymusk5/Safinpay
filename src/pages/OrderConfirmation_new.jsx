import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";

export default function OrderConfirmation_new() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const authContext = useContext(AuthContext);
  const { user } = authContext || { user: null };

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchOrder = async () => {
      try {
        const response = await api.get(`/orders/${orderId}/`);
        setOrder(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement de la commande:", error);
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      fetchOrder();
    }
  }, [orderId, user, navigate]);

  if (loading) {
    return (
      <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>Chargement</div>
          <p>Chargement de votre commande...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#f5f5f5", minHeight: "100vh", padding: "2rem 0" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 1.5rem" }}>
        {/* Message de succès */}
        <div style={{
          background: "white",
          padding: "2rem",
          borderRadius: "8px",
          border: "1px solid #e0e0e0",
          marginBottom: "2rem",
          textAlign: "center"
        }}>
          <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>✔</div>
          <h1 style={{ color: "#28a745", marginBottom: "0.5rem" }}>Commande confirmée !</h1>
          <p style={{ color: "#666", fontSize: "1.1rem" }}>
            Merci pour votre achat. Votre commande a été reçue avec succès.
          </p>
        </div>

        {/* Numéro de commande */}
        <div style={{
          background: "white",
          padding: "1.5rem",
          borderRadius: "8px",
          border: "1px solid #e0e0e0",
          marginBottom: "2rem"
        }}>
<h3 style={{ marginBottom: "1rem", color: "#333" }}>Détails de la commande</h3>
          
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
            <div>
              <p style={{ color: "#666", margin: "0.5rem 0" }}>
                <strong>Numéro de commande:</strong>
              </p>
              <p style={{
                fontSize: "1.3rem",
                fontFamily: "monospace",
                fontWeight: "700",
                color: "#007bff",
                margin: "0"
              }}>
                #{order?.id || "N/A"}
              </p>
            </div>

            <div>
              <p style={{ color: "#666", margin: "0.5rem 0" }}>
                <strong>Date:</strong>
              </p>
              <p style={{ margin: "0", fontSize: "1rem" }}>
                {order?.created_at ? new Date(order.created_at).toLocaleDateString("fr-FR") : "N/A"}
              </p>
            </div>

            <div>
              <p style={{ color: "#666", margin: "0.5rem 0" }}>
                <strong>Statut:</strong>
              </p>
              <p style={{
                margin: "0",
                padding: "0.25rem 0.75rem",
                background: "#d4edda",
                color: "#155724",
                borderRadius: "4px",
                display: "inline-block",
                fontWeight: "600"
              }}>
                ✓ {order?.status === "processing" ? "En traitement" : order?.status}
              </p>
            </div>

            <div>
              <p style={{ color: "#666", margin: "0.5rem 0" }}>
                <strong>Total:</strong>
              </p>
              <p style={{
                fontSize: "1.3rem",
                fontWeight: "700",
                color: "#28a745",
                margin: "0"
              }}>
                {order?.total_price?.toLocaleString() || "0"} FCFA
              </p>
            </div>
          </div>
        </div>

        {/* Articles commandés */}
        {order?.items && order.items.length > 0 && (
          <div style={{
            background: "white",
            padding: "1.5rem",
            borderRadius: "8px",
            border: "1px solid #e0e0e0",
            marginBottom: "2rem"
          }}>
            <h3 style={{ marginBottom: "1rem", color: "#333" }}>Articles commandés</h3>

            <div>
              {order.items.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "1rem",
                    borderBottom: idx < order.items.length - 1 ? "1px solid #eee" : "none"
                  }}
                >
                  <div>
                    <p style={{ margin: "0 0 0.5rem 0", fontWeight: "600" }}>
                      {item.product_name || "Produit"}
                    </p>
                    <p style={{ margin: "0", color: "#666", fontSize: "0.9rem" }}>
                      Quantité: <strong>{item.quantity}x</strong> • Prix unitaire: <strong>{item.price?.toLocaleString() || "0"} FCFA</strong>
                    </p>
                  </div>
                  <p style={{
                    margin: "0",
                    fontWeight: "700",
                    color: "#007bff",
                    fontSize: "1.1rem"
                  }}>
                    {(item.price * item.quantity).toLocaleString()} FCFA
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Prochaines étapes */}
        <div style={{
          background: "#f0f8ff",
          padding: "1.5rem",
          borderRadius: "8px",
          border: "1px solid #b3d9ff",
          marginBottom: "2rem"
        }}>
          <h3 style={{ marginBottom: "1rem", color: "#004085" }}>📬 Prochaines étapes</h3>

          <div style={{ display: "grid", gap: "1rem" }}>
            <div style={{ display: "flex", gap: "1rem" }}>
              <div style={{
                minWidth: "40px",
                width: "40px",
                height: "40px",
                background: "#007bff",
                color: "white",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "700"
              }}>
                1
              </div>
              <div>
                <p style={{ margin: "0", fontWeight: "600", color: "#333" }}>Confirmation par email</p>
                <p style={{ margin: "0.5rem 0 0 0", color: "#666", fontSize: "0.9rem" }}>
                  Vous recevrez un email de confirmation à {user?.email}
                </p>
              </div>
            </div>

            <div style={{ display: "flex", gap: "1rem" }}>
              <div style={{
                minWidth: "40px",
                width: "40px",
                height: "40px",
                background: "#007bff",
                color: "white",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "700"
              }}>
                2
              </div>
              <div>
                <p style={{ margin: "0", fontWeight: "600", color: "#333" }}>Préparation de la commande</p>
                <p style={{ margin: "0.5rem 0 0 0", color: "#666", fontSize: "0.9rem" }}>
                  Les vendeurs vont préparer vos articles (24-48 heures)
                </p>
              </div>
            </div>

            <div style={{ display: "flex", gap: "1rem" }}>
              <div style={{
                minWidth: "40px",
                width: "40px",
                height: "40px",
                background: "#007bff",
                color: "white",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "700"
              }}>
                3
              </div>
              <div>
                <p style={{ margin: "0", fontWeight: "600", color: "#333" }}>Expédition</p>
                <p style={{ margin: "0.5rem 0 0 0", color: "#666", fontSize: "0.9rem" }}>
                  Vous recevrez un numéro de suivi pour localiser votre colis
                </p>
              </div>
            </div>

            <div style={{ display: "flex", gap: "1rem" }}>
              <div style={{
                minWidth: "40px",
                width: "40px",
                height: "40px",
                background: "#007bff",
                color: "white",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "700"
              }}>
                4
              </div>
              <div>
                <p style={{ margin: "0", fontWeight: "600", color: "#333" }}>Livraison</p>
                <p style={{ margin: "0.5rem 0 0 0", color: "#666", fontSize: "0.9rem" }}>
                  Votre colis sera livré en 2-5 jours ouvrables
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Besoin d'aide */}
        <div style={{
          background: "#fff3e0",
          padding: "1.5rem",
          borderRadius: "8px",
          border: "1px solid #ffe0b2",
          marginBottom: "2rem"
        }}>
          <h3 style={{ marginBottom: "1rem", color: "#e65100" }}>Besoin d'aide ?</h3>
          <p style={{ margin: "0", color: "#666" }}>
            Vous pouvez suivre votre commande dans votre espace "<strong>Mes commandes</strong>" ou 
            contacter notre support à <strong>support@safinpay.com</strong>
          </p>
        </div>

        {/* Boutons d'action */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1rem",
          "@media (max-width: 600px)": {
            gridTemplateColumns: "1fr"
          }
        }}>
          <button
            onClick={() => navigate("/orders")}
            style={{
              padding: "1rem",
              background: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              fontSize: "1rem",
              fontWeight: "600",
              cursor: "pointer",
              transition: "background-color 0.3s"
            }}
            onMouseEnter={(e) => e.target.style.background = "#0056b3"}
            onMouseLeave={(e) => e.target.style.background = "#007bff"}
          >
            Voir mes commandes
          </button>

          <button
            onClick={() => navigate("/")}
            style={{
              padding: "1rem",
              background: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "4px",
              fontSize: "1rem",
              fontWeight: "600",
              cursor: "pointer",
              transition: "background-color 0.3s"
            }}
            onMouseEnter={(e) => e.target.style.background = "#218838"}
            onMouseLeave={(e) => e.target.style.background = "#28a745"}
          >
            🛍️ Continuer les achats
          </button>
        </div>
      </div>
    </div>
  );
}
