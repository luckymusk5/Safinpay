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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminStats = async () => {
      try {
        // Statistiques générales
        const statsRes = await api.get("/admin/stats/");
        setStats(statsRes.data);

        // Commandes récentes
        const ordersRes = await api.get("/admin/recent-orders/");
        setRecentOrders(ordersRes.data.slice(0, 5));
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