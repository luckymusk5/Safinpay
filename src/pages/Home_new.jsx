import { useEffect, useState } from "react";
import api from "../services/api";
import ProductCardSimple from "../components/ProductCardSimple";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ category: "", priceRange: "" });
  const [categories, setCategories] = useState([]);
  const [debugInfo, setDebugInfo] = useState("");

  useEffect(() => {
    // Log des variables d'environnement
    const apiUrl = import.meta.env.VITE_API_URL || "https://safinpaybackend-production.up.railway.app/api/";
    console.log("🔍 Debug Info:");
    console.log("VITE_API_URL:", import.meta.env.VITE_API_URL);
    console.log("Final API URL:", apiUrl);
    setDebugInfo(`API: ${apiUrl}`);

    api.get("/products/")
      .then(res => {
        // ✅ Gérer la nouvelle structure avec pagination
        if (Array.isArray(res.data)) {
          return res.data; // Ancien format (array)
        } else if (res.data?.data) {
          return res.data.data; // Nouveau format avec pagination
        } else if (res.data?.results) {
          return res.data.results; // Format alternatif
        }
        return [];
      })
      .then(data => {
        let productsList = Array.isArray(data) ? data : [];
        // Ajouter un ID unique basé sur l'index si absent
        productsList = productsList.map((product, index) => ({
          ...product,
          id: product.id || `neon_${index}`,
          category: product.category || product.category_name || "Maison",
        }));
        setProducts(productsList);
        setCategories([...new Set(productsList.map(item => item.category).filter(Boolean))]);
        console.log(`✅ Chargé ${productsList.length} produits`);
        console.log("Premier produit:", productsList[0]);
      })
      .catch(err => {
        console.error("❌ Erreur lors du chargement des produits:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const priceRanges = [
    { label: "0 - 50,000 FCFA", value: "0-50000" },
    { label: "50,000 - 100,000 FCFA", value: "50000-100000" },
    { label: "100,000 - 500,000 FCFA", value: "100000-500000" },
    { label: "Plus de 500,000 FCFA", value: "500000+" }
  ];

  const filteredProducts = products.filter(p => {
    if (filters.category && p.category !== filters.category) return false;
    return true;
  });

  return (
    <div style={{ backgroundColor: "#f5f5f5", minHeight: "100vh", paddingTop: "1.5rem" }}>
      {/* Debug Info */}
      <div style={{
        backgroundColor: "#fffacd",
        color: "#333",
        padding: "1rem",
        marginBottom: "1rem",
        textAlign: "center",
        fontSize: "12px",
        borderBottom: "2px solid #FFD700"
      }}>
        🔧 {debugInfo}
      </div>

      {/* Banner */}
      <div style={{
        background: "linear-gradient(135deg, #1f5296 0%, #0f3f7f 100%)",
        color: "white",
        padding: "2rem",
        marginBottom: "2rem",
        textAlign: "center"
      }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>SafinPay</h1>
        <p>Découvrez les meilleurs produits d'Afrique </p>
      </div>

      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 1.5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "250px 1fr", gap: "2rem" }}>
          {/* Filtres */}
          <div>
            <div className="filter-section">
              <div className="filter-title">Catégories</div>
              {categories.map(cat => (
                <div key={cat} className="filter-option">
                  <label>
                    <input
                      type="checkbox"
                      onChange={(e) => setFilters({ ...filters, category: e.target.checked ? cat : "" })}
                      checked={filters.category === cat}
                    />
                    {cat}
                  </label>
                </div>
              ))}
            </div>

            <div className="filter-section">
              <div className="filter-title">Prix</div>
              {priceRanges.map(range => (
                <div key={range.value} className="filter-option">
                  <label>
                    <input type="checkbox" />
                    {range.label}
                  </label>
                </div>
              ))}
            </div>

            <div className="filter-section">
              <div className="filter-title">Livraison</div>
              <div className="filter-option">
                <label>
                  <input type="checkbox" />
                  Livraison gratuite
                </label>
              </div>
              <div className="filter-option">
                <label>
                  <input type="checkbox" />
                  Livraison rapide (Prime)
                </label>
              </div>
            </div>

            <div className="filter-section">
              <div className="filter-title">Évaluations</div>
              {[5, 4, 3].map(stars => (
                <div key={stars} className="filter-option">
                  <label>
                    <input type="checkbox" />
                    {stars}+ étoiles
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Produits */}
          <div>
            {loading ? (
              <div className="spinner"></div>
            ) : (
              <>
                <div style={{ marginBottom: "1.5rem", color: "#666" }}>
                  {filteredProducts.length} produit{filteredProducts.length > 1 ? "s" : ""} trouvé{filteredProducts.length > 1 ? "s" : ""}
                </div>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                  gap: "1.5rem"
                }}>
                  {filteredProducts.map(product => (
                    <ProductCardSimple key={product.id} product={product} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
