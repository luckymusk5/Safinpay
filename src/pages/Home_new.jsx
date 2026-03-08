import { useEffect, useState } from "react";
import ProductCardSimple from "../components/ProductCardSimple";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ category: "", priceRange: "" });

  useEffect(() => {
    // Charger le fichier JSON depuis le serveur
    fetch("/products.json")
      .then(res => res.json())
      .then(data => {
        let productsList = Array.isArray(data) ? data : [];
        // Ajouter un ID unique basé sur l'index si absent
        productsList = productsList.map((product, index) => ({
          ...product,
          id: product.id || `json_${index}`,
        }));
        setProducts(productsList);
        console.log(`Chargé ${productsList.length} produits`);
      })
      .catch(err => {
        console.error("Erreur lors du chargement des produits:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const categories = ["Électronique", "Vêtements", "Livres", "Maison", "Sports"];
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
