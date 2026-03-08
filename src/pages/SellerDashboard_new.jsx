import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";
import AddProductModal_Simple from "../components/AddProductModal_Simple";

export default function SellerDashboard_new() {
  const authContext = useContext(AuthContext);
  const user = authContext?.user;
  const [stats, setStats] = useState({
    total_sales: 0,
    total_revenue: 0,
    total_orders: 0,
    pending_orders: 0,
    avg_rating: 4.5
  });
  const [products, setProducts] = useState([]);
  const [statsLoading, setStatsLoading] = useState(true);
  const [productsLoading, setProductsLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(null);

  useEffect(() => {
    if (user && user.is_seller) {
      // Charger les stats
      api.get("/sellers/dashboard_stats/")
        .then(res => setStats(res.data))
        .catch(err => console.error(err))
        .finally(() => setStatsLoading(false));

      // Charger les produits
      api.get("/products/", { params: { seller: user.seller_id } })
        .then(res => {
          const productsList = Array.isArray(res.data) ? res.data : res.data.results || [];
          setProducts(productsList);
        })
        .catch(err => console.error(err))
        .finally(() => setProductsLoading(false));
    }
  }, [user]);

  const handleDeleteProduct = (productId, productName) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer l'article "${productName}" ? Cette action est irréversible.`)) {
      setDeleteLoading(productId);
      api.delete(`/products/${productId}/`)
        .then(() => {
          setProducts(products.filter(p => p.id !== productId));
        })
        .catch(err => {
          console.error(err);
        })
        .finally(() => setDeleteLoading(null));
    }
  };

  return (
    <div style={{ backgroundColor: "#f5f5f5", minHeight: "100vh", padding: "2rem 0" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 1.5rem" }}>
        <h1 style={{ marginBottom: "2rem" }}>
          {statsLoading ? "Chargement..." : "Dashboard Vendeur"}
        </h1>

        {/* KPI Stats */}
        <div className="dashboard-grid" style={{ marginBottom: "2rem" }}>
          <div className="stat-card">
            <p className="stat-label">Ventes totales</p>
            <p className="stat-value">{statsLoading ? "..." : stats.total_sales}</p>
          </div>
          <div className="stat-card">
            <p className="stat-label">Revenus totaux</p>
            <p className="stat-value" style={{ fontSize: "1.25rem" }}>
              {statsLoading ? "..." : stats.total_revenue.toLocaleString() + " FCFA"}
            </p>
          </div>
          <div className="stat-card">
            <p className="stat-label">Commandes</p>
            <p className="stat-value">{statsLoading ? "..." : stats.total_orders}</p>
          </div>
          <div className="stat-card">
            <p className="stat-label">En attente</p>
            <p className="stat-value" style={{ color: "#ffc107" }}>
              {statsLoading ? "..." : stats.pending_orders}
            </p>
          </div>
          <div className="stat-card">
            <p className="stat-label">Évaluation</p>
            <p className="stat-value" style={{ fontSize: "1.5rem" }}>
              {statsLoading ? "..." : stats.avg_rating}
            </p>
          </div>
        </div>

        {/* Main Sections */}
        <div style={{ marginBottom: "2rem" }}>
          {/* Products Section - Full Width */}
          <div style={{ 
            background: "white", 
            padding: "1.5rem", 
            borderRadius: "4px",
            border: "1px solid #e7e7e7"
          }}>
            <div style={{ 
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: "center", 
              marginBottom: "1.5rem" 
            }}>
              <h2 style={{ margin: "0" }}>Mes produits ({products.length})</h2>
              <button 
                onClick={() => setShowAddModal(true)}
                className="btn btn-primary btn-small"
              >
                + Ajouter produit
              </button>
            </div>
            {productsLoading ? (
              <p style={{ color: "#999" }}>Chargement des produits...</p>
            ) : products.length === 0 ? (
              <p style={{ color: "#999", textAlign: "center", padding: "2rem" }}>
                Aucun produit. Créez votre premier produit !
              </p>
            ) : (
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "1.5rem"
              }}>
                {products.map(product => (
                  <div 
                    key={product.id} 
                    style={{
                      border: "1px solid #e7e7e7",
                      borderRadius: "8px",
                      overflow: "hidden",
                      background: "#f9f9f9",
                      transition: "box-shadow 0.3s",
                      cursor: "pointer"
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)"}
                    onMouseLeave={(e) => e.currentTarget.style.boxShadow = "none"}
                  >
                    <div style={{ 
                      width: "100%", 
                      height: "200px", 
                      background: "#f0f0f0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden"
                    }}>
                      <img
                        src={product.image || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect fill='%23f0f0f0' width='200' height='200'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23999' font-size='14'%3E📦 Pas de photo%3C/text%3E%3C/svg%3E"}
                        alt={product.name}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        onError={(e) => {
                          e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect fill='%23eee' width='200' height='200'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23999' font-size='12'%3EImage non disponible%3C/text%3E%3C/svg%3E";
                        }}
                      />
                    </div>
                    <div style={{ padding: "1rem" }}>
                      <p style={{ fontWeight: "600", margin: "0 0 0.5rem 0", fontSize: "1rem" }}>
                        {product.name}
                      </p>
                      <p style={{ color: "#666", fontSize: "0.85rem", margin: "0 0 0.75rem 0", textAlign: "justify" }}>
                        {product.description || "Pas de description"}
                      </p>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                        <p style={{ fontWeight: "600", margin: "0", fontSize: "1.1rem", color: "#007bff" }}>
                          {product.price.toLocaleString()} FCFA
                        </p>
                        <p style={{ color: "#ffa824", fontSize: "0.9rem", margin: "0" }}>
                          {product.rating || 4.5}/5
                        </p>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.85rem", color: "#666", marginBottom: "0.75rem" }}>
                        <span>Stock: {product.stock || 0}</span>
                        <span style={{ color: product.stock_status === "in_stock" ? "#28a745" : "#dc3545" }}>
                          {product.stock_status === "in_stock" ? "✓ En stock" : "Rupture"}
                        </span>
                      </div>
                      <button
                        onClick={() => handleDeleteProduct(product.id, product.name)}
                        disabled={deleteLoading === product.id}
                        style={{
                          width: "100%",
                          padding: "0.5rem 0.75rem",
                          background: deleteLoading === product.id ? "#ccc" : "#dc3545",
                          color: "white",
                          border: "none",
                          borderRadius: "4px",
                          cursor: deleteLoading === product.id ? "not-allowed" : "pointer",
                          fontSize: "0.9rem",
                          fontWeight: "600",
                          transition: "background-color 0.3s",
                          opacity: deleteLoading === product.id ? 0.6 : 1
                        }}
                        onMouseEnter={(e) => {
                          if (deleteLoading !== product.id) {
                            e.target.style.background = "#c82333";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (deleteLoading !== product.id) {
                            e.target.style.background = "#dc3545";
                          }
                        }}
                      >
                        {deleteLoading === product.id ? "Suppression..." : "Supprimer"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Main Sections - Recent Orders */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "1fr", 
          gap: "2rem", 
          marginBottom: "2rem" 
        }}>

          {/* Recent Orders Section */}
          <div style={{ 
            background: "white", 
            padding: "1.5rem", 
            borderRadius: "4px",
            border: "1px solid #e7e7e7"
          }}>
            <h2 style={{ marginBottom: "1.5rem", margin: "0 0 1.5rem 0" }}>
              Commandes récentes
            </h2>
            {[...Array(5)].map((_, i) => (
              <div 
                key={i}
                style={{
                  padding: "1rem",
                  borderBottom: i < 4 ? "1px solid #e7e7e7" : "none",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <div>
                  <p style={{ fontWeight: "600", margin: "0 0 0.25rem 0" }}>
                    Commande #{10000 + i}
                  </p>
                  <p style={{ color: "#666", fontSize: "0.9rem", margin: "0" }}>
                    Il y a {i + 1} heure(s)
                  </p>
                </div>
                <span style={{
                  background: i % 2 === 0 ? "#fff3cd" : "#d4edda",
                  color: i % 2 === 0 ? "#856404" : "#155724",
                  padding: "0.25rem 0.75rem",
                  borderRadius: "4px",
                  fontSize: "0.85rem",
                  fontWeight: "600"
                }}>
                  {i % 2 === 0 ? "En attente" : "✓ Préparée"}
                </span>
              </div>
            ))}
            <button 
              className="btn btn-secondary btn-block" 
              style={{ marginTop: "1rem" }}
            >
              Voir toutes les commandes
            </button>
          </div>
        </div>

        {/* Seller Tools */}
        <div style={{ 
          background: "white", 
          padding: "1.5rem", 
          borderRadius: "4px",
          border: "1px solid #e7e7e7"
        }}>
          <h2 style={{ marginBottom: "1.5rem" }}>Outils vendeur</h2>
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
            gap: "1rem" 
          }}>
            <button className="btn btn-secondary btn-block">Analyser les ventes</button>
            <button className="btn btn-secondary btn-block">Gérer les stocks</button>
            <button className="btn btn-secondary btn-block">Messages clients</button>
            <button className="btn btn-secondary btn-block">Avis des clients</button>
            <button className="btn btn-secondary btn-block">Promotions</button>
            <button className="btn btn-secondary btn-block">Paramètres boutique</button>
          </div>
        </div>
      </div>

      <AddProductModal_Simple
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onProductAdded={(newProduct) => {
          setProducts([newProduct, ...products]);
        }}
      />
    </div>
  );
}