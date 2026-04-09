import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";
import Navbar_new from "../components/Navbar_new";
import Footer_new from "../components/Footer_new";

export default function AdminDashboard() {
  const { user } = useContext(AuthContext) || {};
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalSellers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingSellers: 0,
  });

  const [recentOrders, setRecentOrders] = useState([]);
  const [fraudSignals, setFraudSignals] = useState({
    summary: {
      total_boutiques: 0,
      flagged_boutiques: 0,
      high_risk: 0,
      medium_risk: 0,
      low_risk: 0,
    },
    boutiques: [],
    flagged_boutiques: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminStats = async () => {
      try {
        const [statsRes, ordersRes, fraudRes] = await Promise.all([
          api.get("/admin/stats/"),
          api.get("/admin/recent-orders/"),
          api.get("/admin/fraud-signals/"),
        ]);

        setStats(statsRes.data);
        setRecentOrders((ordersRes.data || []).slice(0, 5));
        setFraudSignals({
          summary: fraudRes.data?.summary || {},
          boutiques: fraudRes.data?.boutiques || [],
          flagged_boutiques: fraudRes.data?.flagged_boutiques || [],
        });
      } catch (err) {
        console.error("Erreur chargement stats admin:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.is_superuser) {
      fetchAdminStats();
    }
  }, [user]);

  if (!user?.is_superuser) {
    return (
      <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <h2>Accès refusé</h2>
          <p>Vous devez être super administrateur pour accéder à cette page.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar_new />
      <div style={{ backgroundColor: "#f5f5f5", minHeight: "100vh", padding: "2rem 0" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 1.5rem" }}>

          <h1 style={{ marginBottom: "2rem", color: "#1b3a6b" }}>
            Tableau de Bord Administrateur
          </h1>

          {/* Statistiques KPI */}
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", 
            gap: "1.5rem", 
            marginBottom: "3rem" 
          }}>
            <div style={{ background: "white", padding: "1.8rem", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.08)" }}>
              <p style={{ color: "#666", margin: "0 0 0.5rem" }}>Utilisateurs Total</p>
              <p style={{ fontSize: "2.2rem", fontWeight: "700", color: "#1b3a6b" }}>{stats.totalUsers}</p>
            </div>

            <div style={{ background: "white", padding: "1.8rem", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.08)" }}>
              <p style={{ color: "#666", margin: "0 0 0.5rem" }}>Vendeurs</p>
              <p style={{ fontSize: "2.2rem", fontWeight: "700", color: "#1b3a6b" }}>{stats.totalSellers}</p>
            </div>

            <div style={{ background: "white", padding: "1.8rem", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.08)" }}>
              <p style={{ color: "#666", margin: "0 0 0.5rem" }}>Produits</p>
              <p style={{ fontSize: "2.2rem", fontWeight: "700", color: "#1b3a6b" }}>{stats.totalProducts}</p>
            </div>

            <div style={{ background: "white", padding: "1.8rem", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.08)" }}>
              <p style={{ color: "#666", margin: "0 0 0.5rem" }}>Commandes Totales</p>
              <p style={{ fontSize: "2.2rem", fontWeight: "700", color: "#1b3a6b" }}>{stats.totalOrders}</p>
            </div>

            <div style={{ background: "white", padding: "1.8rem", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.08)" }}>
              <p style={{ color: "#666", margin: "0 0 0.5rem" }}>Revenus Généraux</p>
              <p style={{ fontSize: "2.2rem", fontWeight: "700", color: "#28a745" }}>
                {stats.totalRevenue?.toLocaleString() || 0} FCFA
              </p>
            </div>

            <div style={{ background: "white", padding: "1.8rem", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.08)" }}>
              <p style={{ color: "#666", margin: "0 0 0.5rem" }}>Vendeurs en Attente</p>
              <p style={{ fontSize: "2.2rem", fontWeight: "700", color: "#ff9900" }}>{stats.pendingSellers}</p>
            </div>

            <div style={{ background: "white", padding: "1.8rem", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.08)" }}>
              <p style={{ color: "#666", margin: "0 0 0.5rem" }}>Boutiques à surveiller</p>
              <p style={{ fontSize: "2.2rem", fontWeight: "700", color: "#c0392b" }}>
                {fraudSignals.summary?.flagged_boutiques || 0}
              </p>
            </div>
          </div>

          {/* Sections Principales */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>

            {/* Commandes Récentes */}
            <div style={{ background: "white", borderRadius: "8px", padding: "2rem", boxShadow: "0 2px 10px rgba(0,0,0,0.08)" }}>
              <h2 style={{ marginBottom: "1.5rem", color: "#1b3a6b" }}>Commandes Récentes</h2>
              
              {recentOrders.length > 0 ? (
                recentOrders.map((order, index) => (
                  <div key={index} style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "1rem 0",
                    borderBottom: index < recentOrders.length - 1 ? "1px solid #eee" : "none"
                  }}>
                    <div>
                      <p style={{ fontWeight: "600" }}>Commande #{order.id}</p>
                      <p style={{ color: "#666", fontSize: "0.9rem" }}>
                        {new Date(order.created_at).toLocaleDateString("fr-FR")}
                      </p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <p style={{ fontWeight: "600", color: "#28a745" }}>
                        {order.total_price?.toLocaleString()} FCFA
                      </p>
                      <span style={{ 
                        padding: "4px 12px", 
                        borderRadius: "20px", 
                        fontSize: "0.8rem",
                        background: order.status === "delivered" ? "#d4edda" : "#fff3cd",
                        color: order.status === "delivered" ? "#155724" : "#856404"
                      }}>
                        {order.status === "delivered" ? "Livré" : "En cours"}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p>Aucune commande récente.</p>
              )}
            </div>

            {/* Gestion Rapide */}
            <div style={{ background: "white", borderRadius: "8px", padding: "2rem", boxShadow: "0 2px 10px rgba(0,0,0,0.08)" }}>
              <h2 style={{ marginBottom: "1.5rem", color: "#1b3a6b" }}>Actions Rapides</h2>
              
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <a href="/admin/users" style={actionButtonStyle}>Gérer les Utilisateurs</a>
                <a href="/admin/sellers" style={actionButtonStyle}>Gérer les Vendeurs</a>
                <a href="/admin/products" style={actionButtonStyle}>Gérer les Produits</a>
                <a href="/admin/orders" style={actionButtonStyle}>Gérer les Commandes</a>
                <a href="/admin/categories" style={actionButtonStyle}>Catégories</a>
                <a href="/admin/reports" style={actionButtonStyle}>Rapports & Statistiques</a>
              </div>
            </div>
          </div>

          <div style={{ background: "white", borderRadius: "8px", padding: "2rem", boxShadow: "0 2px 10px rgba(0,0,0,0.08)", marginTop: "2rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem", marginBottom: "1rem" }}>
              <div>
                <h2 style={{ margin: 0, color: "#1b3a6b" }}>Surveillance fraude boutiques</h2>
                <p style={{ margin: "0.35rem 0 0", color: "#666" }}>
                  Détection automatique basée sur la vérification, les annulations, les avis et l’activité commerciale.
                </p>
              </div>
              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                <span style={adminBadgeStyle}>Total boutiques: {fraudSignals.summary?.total_boutiques || 0}</span>
                <span style={adminBadgeStyle}>Haute alerte: {fraudSignals.summary?.high_risk || 0}</span>
                <span style={adminBadgeStyle}>Alerte moyenne: {fraudSignals.summary?.medium_risk || 0}</span>
              </div>
            </div>

            {loading ? (
              <p>Chargement des signaux de fraude...</p>
            ) : (fraudSignals.flagged_boutiques || []).length > 0 ? (
              <div style={{ display: "grid", gap: "1rem" }}>
                {fraudSignals.flagged_boutiques.slice(0, 5).map((boutique) => {
                  const riskColor = boutique.risk_level === "high" ? "#c0392b" : boutique.risk_level === "medium" ? "#ff9900" : "#1b3a6b";
                  return (
                    <div
                      key={boutique.id}
                      style={{
                        border: "1px solid #e7e7e7",
                        borderRadius: "10px",
                        padding: "1rem",
                        display: "grid",
                        gridTemplateColumns: "1.6fr 0.8fr 1.2fr",
                        gap: "1rem",
                        alignItems: "center",
                        background: "#fafbfc"
                      }}
                    >
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", flexWrap: "wrap" }}>
                          <strong style={{ color: "#1b3a6b" }}>{boutique.name}</strong>
                          <span style={{ ...statusChipStyle, background: `${riskColor}20`, color: riskColor }}>
                            {boutique.risk_level === "high" ? "Risque élevé" : boutique.risk_level === "medium" ? "Risque moyen" : "Risque faible"}
                          </span>
                        </div>
                        <p style={{ margin: "0.35rem 0 0", color: "#666", fontSize: "0.9rem" }}>
                          {boutique.reasons?.length ? boutique.reasons.join(" · ") : "Aucun motif détaillé"}
                        </p>
                      </div>

                      <div style={{ textAlign: "center" }}>
                        <div style={{ fontSize: "1.8rem", fontWeight: 800, color: riskColor }}>{boutique.risk_score}</div>
                        <div style={{ color: "#666", fontSize: "0.82rem" }}>Score de risque</div>
                      </div>

                      <div>
                        <div style={{ height: "10px", borderRadius: "999px", background: "#e8edf3", overflow: "hidden", marginBottom: "0.5rem" }}>
                          <div style={{ width: `${Math.min(100, boutique.risk_score)}%`, height: "100%", background: riskColor }} />
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", color: "#666", fontSize: "0.85rem" }}>
                          <span>{boutique.product_count} produit{boutique.product_count > 1 ? "s" : ""}</span>
                          <span>{boutique.total_orders} commande{boutique.total_orders > 1 ? "s" : ""}</span>
                          <span>{boutique.review_count} avis</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div style={{ padding: "1rem", borderRadius: "10px", background: "#edf7ed", color: "#1e6b3a" }}>
                Aucun signal de fraude prioritaire détecté pour le moment.
              </div>
            )}
          </div>

        </div>
      </div>
      <Footer_new />
    </>
  );
}

// Style pour les boutons d'actions rapides
const actionButtonStyle = {
  display: "block",
  padding: "1.2rem",
  backgroundColor: "#f8f9fa",
  color: "#1b3a6b",
  textAlign: "center",
  borderRadius: "8px",
  textDecoration: "none",
  fontWeight: "600",
  border: "1px solid #e0e0e0",
  transition: "all 0.3s",
};

actionButtonStyle[':hover'] = {
  backgroundColor: "#1b3a6b",
  color: "white",
  transform: "translateY(-2px)"
};

const adminBadgeStyle = {
  display: "inline-flex",
  alignItems: "center",
  padding: "0.45rem 0.75rem",
  borderRadius: "999px",
  background: "#f2f5fa",
  color: "#1b3a6b",
  fontSize: "0.85rem",
  fontWeight: 600,
  border: "1px solid #e0e7f0",
};

const statusChipStyle = {
  display: "inline-flex",
  alignItems: "center",
  padding: "0.3rem 0.65rem",
  borderRadius: "999px",
  fontSize: "0.8rem",
  fontWeight: 700,
};