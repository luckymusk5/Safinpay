import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";

export default function Orders_new() {
  const authContext = useContext(AuthContext);
  const user = authContext?.user;
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  const statuses = {
    pending: { label: "En attente", color: "#ff9900" },
    processing: { label: "En traitement", color: "#0066c0" },
    shipped: { label: "Expédié", color: "#146eb4" },
    delivered: { label: "Livré", color: "#28a745" },
    cancelled: { label: "Annulé", color: "#dc3545" }
  };

  useEffect(() => {
    if (user) {
      api.get("/orders/")
        .then(res => {
          const ordersList = Array.isArray(res.data) ? res.data : res.data.results || [];
          setOrders(ordersList);
        })
        .catch(err => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [user]);

  const filterOrders = () => {
    if (activeTab === "all") return orders;
    return orders.filter(order => order.status === activeTab);
  };

  return (
    <div style={{ backgroundColor: "#f5f5f5", minHeight: "100vh", padding: "2rem 0" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
        <h1 style={{ marginBottom: "2rem" }}>Mes commandes</h1>

        {/* Filter Tabs */}
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "2rem", overflowX: "auto", paddingBottom: "0.5rem" }}>
          <button
            onClick={() => setActiveTab("all")}
            style={{
              padding: "0.75rem 1.5rem",
              border: "none",
              background: activeTab === "all" ? "#ff9900" : "white",
              color: activeTab === "all" ? "white" : "#0f1111",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "600",
              whiteSpace: "nowrap"
            }}
          >
            Toutes ({orders.length})
          </button>
          {Object.entries(statuses).map(([key, { label, icon }]) => {
            const count = orders.filter(o => o.status === key).length;
            return (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                style={{
                  padding: "0.75rem 1.5rem",
                  border: "none",
                  background: activeTab === key ? "#ff9900" : "white",
                  color: activeTab === key ? "white" : "#0f1111",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontWeight: "600",
                  whiteSpace: "nowrap"
                }}
              >
                {icon} {label} ({count})
              </button>
            );
          })}
        </div>

        {/* Orders List */}
        {loading ? (
          <div className="spinner"></div>
        ) : filterOrders().length === 0 ? (
          <div style={{
            background: "white",
            padding: "3rem",
            borderRadius: "4px",
            textAlign: "center"
          }}>
            <p style={{ fontSize: "3rem", marginBottom: "1rem" }}>Commandes</p>
            <h2>Aucune commande</h2>
            <p style={{ color: "#666", margin: "1rem 0" }}>
              Vous n'avez pas de commande dans cette catégorie
            </p>
          </div>
        ) : (
          <div>
            {filterOrders().map(order => {
              const status = statuses[order.status] || statuses.pending;
              return (
                <div
                  key={order.id}
                  style={{
                    background: "white",
                    borderRadius: "4px",
                    marginBottom: "1.5rem",
                    border: "1px solid #e7e7e7",
                    overflow: "hidden"
                  }}
                >
                  {/* Order Header */}
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "1fr auto",
                    gap: "1rem",
                    padding: "1.5rem",
                    borderBottom: "1px solid #e7e7e7",
                    backgroundColor: "#f9fafb"
                  }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.5rem" }}>
                        <span style={{ fontWeight: "600", fontSize: "1rem" }}>
                          Commande #{order.id}
                        </span>
                        <span style={{
                          background: status.color,
                          color: "white",
                          padding: "0.25rem 0.75rem",
                          borderRadius: "4px",
                          fontSize: "0.85rem",
                          fontWeight: "600"
                        }}>
                          {status.icon} {status.label}
                        </span>
                      </div>
                      <p style={{ color: "#666", fontSize: "0.9rem" }}>
                        Passée le {new Date(order.created_at).toLocaleDateString("fr-FR")}
                      </p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <p style={{ fontWeight: "600", fontSize: "1.1rem" }}>
                        {order.total_price.toLocaleString()} FCFA
                      </p>
                      <button className="btn btn-secondary btn-small">
                        Détails
                      </button>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div style={{ padding: "1.5rem" }}>
                    {order.items && order.items.map((item, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: "grid",
                          gridTemplateColumns: "100px 1fr auto",
                          gap: "1rem",
                          paddingBottom: "1rem",
                          marginBottom: "1rem",
                          borderBottom: idx < order.items.length - 1 ? "1px solid #e7e7e7" : "none"
                        }}
                      >
                        <img
                          src={item.product.image || "/placeholder.png"}
                          alt={item.product.name}
                          style={{ width: "100px", height: "100px", objectFit: "contain" }}
                        />
                        <div>
                          <p style={{ fontWeight: "600" }}>{item.product.name}</p>
                          <p style={{ color: "#666", fontSize: "0.9rem" }}>Qté: {item.quantity}</p>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <p style={{ fontWeight: "600" }}>
                            {item.price.toLocaleString()} FCFA
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Actions */}
                  <div style={{
                    display: "flex",
                    gap: "0.5rem",
                    padding: "1.5rem",
                    borderTop: "1px solid #e7e7e7",
                    backgroundColor: "#f9fafb",
                    flexWrap: "wrap"
                  }}>
                    <button className="btn btn-secondary">Voir le suivi</button>
                    {order.status === "delivered" && (
                      <button className="btn btn-secondary">Retourner le produit</button>
                    )}
                    {order.status !== "cancelled" && (
                      <button className="btn btn-secondary">Contacter le vendeur</button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}