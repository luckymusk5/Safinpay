import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import Navbar_new from "../components/Navbar_new";
import Footer_new from "../components/Footer_new";
import ProductCard_new from "../components/ProductCard_new";

const CATEGORIES = [
  { id: "electronics", name: "Électronique", icon: "📱", color: "#1b3a6b" },
  { id: "fashion", name: "Mode & Vêtements", icon: "👕", color: "#e91e63" },
  { id: "home", name: "Maison & Décoration", icon: "🏠", color: "#ff9800" },
  { id: "sports", name: "Sports & Loisirs", icon: "⚽", color: "#4caf50" },
  { id: "books", name: "Livres & Scolaire", icon: "📚", color: "#9c27b0" },
  { id: "beauty", name: "Beauté & Soins", icon: "💄", color: "#f06292" },
  { id: "food", name: "Alimentation", icon: "🍲", color: "#ff5722" },
  { id: "other", name: "Autres", icon: "🌐", color: "#607d8b" },
];

export default function Categories() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProductsByCategory = async (catId) => {
    setLoading(true);
    try {
      const res = await api.get("/products/", {
        params: { category: catId }
      });
      const data = Array.isArray(res.data) ? res.data : res.data.results || [];
      setProducts(data);
    } catch (err) {
      console.error("Erreur lors du chargement des produits:", err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat);
    fetchProductsByCategory(cat.id);
  };

  return (
    <>
      <Navbar_new />

      <div style={{ backgroundColor: "#f5f5f5", minHeight: "100vh", paddingTop: "2rem" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 1.5rem" }}>

          {/* Titre principal */}
          <h1 style={{ 
            textAlign: "center", 
            marginBottom: "3rem", 
            color: "#1b3a6b", 
            fontSize: "2.5rem" 
          }}>
            Explorer par Catégories
          </h1>

          {/* Grille des catégories */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "1.8rem",
            marginBottom: "4rem"
          }}>
            {CATEGORIES.map(cat => (
              <div
                key={cat.id}
                onClick={() => handleCategoryClick(cat)}
                style={{
                  background: "white",
                  borderRadius: "12px",
                  padding: "2rem 1.5rem",
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  border: selectedCategory?.id === cat.id ? "3px solid #ff9900" : "1px solid #eee",
                  boxShadow: selectedCategory?.id === cat.id 
                    ? "0 10px 25px rgba(255, 153, 0, 0.25)" 
                    : "0 4px 15px rgba(0, 0, 0, 0.06)"
                }}
                onMouseEnter={(e) => {
                  if (selectedCategory?.id !== cat.id) {
                    e.currentTarget.style.transform = "translateY(-8px)";
                    e.currentTarget.style.boxShadow = "0 12px 30px rgba(0, 0, 0, 0.12)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedCategory?.id !== cat.id) {
                    e.currentTarget.style.transform = "none";
                  }
                }}
              >
                <div style={{ fontSize: "3.8rem", marginBottom: "1rem" }}>{cat.icon}</div>
                <h3 style={{ 
                  margin: "0 0 0.5rem 0", 
                  color: cat.color, 
                  fontSize: "1.1rem",
                  fontWeight: "600"
                }}>
                  {cat.name}
                </h3>
                <p style={{ color: "#777", fontSize: "0.9rem", margin: 0 }}>Découvrir</p>
              </div>
            ))}
          </div>

          {/* Section des produits de la catégorie sélectionnée */}
          {selectedCategory && (
            <div>
              <div style={{ 
                display: "flex", 
                justifyContent: "space-between", 
                alignItems: "center", 
                marginBottom: "2rem",
                flexWrap: "wrap",
                gap: "1rem"
              }}>
                <h2 style={{ margin: 0, color: "#1b3a6b", fontSize: "2rem" }}>
                  {selectedCategory.icon} {selectedCategory.name}
                </h2>
                <span style={{ color: "#666", fontSize: "1.1rem" }}>
                  {products.length} produit{products.length > 1 ? "s" : ""}
                </span>
              </div>

              {loading ? (
                <div style={{ textAlign: "center", padding: "6rem 0" }}>
                  <div className="spinner" />
                  <p style={{ marginTop: "1rem", color: "#666" }}>Chargement des produits...</p>
                </div>
              ) : products.length > 0 ? (
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
                  gap: "1.8rem"
                }}>
                  {products.map(product => (
                    <ProductCard_new key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div style={{ 
                  textAlign: "center", 
                  padding: "5rem", 
                  background: "white", 
                  borderRadius: "12px",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.05)"
                }}>
                  <p style={{ fontSize: "1.2rem", color: "#666" }}>
                    Aucun produit trouvé dans cette catégorie pour le moment.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <Footer_new />
    </>
  );
}