import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { SearchContext } from "../context/SearchContext";

export default function HomeSimple() {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Utiliser le SearchContext
  const { searchTerm } = useContext(SearchContext);
  
  // Filtres
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [freeShipping, setFreeShipping] = useState(false);
  const [primeShipping, setPrimeShipping] = useState(false);
  const [selectedRating, setSelectedRating] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);

  // Afficher uniquement les 15 premiers produits sur le home
  const PRODUCTS_PER_PAGE = 15;

  useEffect(() => {
    // Charger le fichier JSON
    fetch("/products.json")
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        let productsList = Array.isArray(data) ? data : [];
        // Charger seulement les 15 premiers produits
        productsList = productsList.slice(0, 15).map((product, index) => ({
          ...product,
          id: product.id || `json_${index}`,
          category: "Électronique", // Par défaut
          rating: 5, // Rating par défaut
          freeShippingAvailable: Math.random() > 0.5, // Aléatoire pour démo
          primeAvailable: Math.random() > 0.3, // Aléatoire pour démo
        }));
        setAllProducts(productsList);
        console.log(`Chargé ${productsList.length} produits`);
      })
      .catch(err => {
        console.error("Erreur:", err);
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Logique de filtrage
  const filteredProducts = allProducts.filter(product => {
    // Recherche par texte
    if (searchTerm && !product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !product.description.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }

    // Filtre catégorie
    if (selectedCategory && product.category !== selectedCategory) {
      return false;
    }

    // Filtre prix
    if (selectedPrice) {
      const price = product.price || 0;
      if (selectedPrice === "0-50000" && price > 50000) return false;
      if (selectedPrice === "50000-100000" && (price < 50000 || price > 100000)) return false;
      if (selectedPrice === "100000-500000" && (price < 100000 || price > 500000)) return false;
      if (selectedPrice === "500000+" && price < 500000) return false;
    }

    // Filtre livraison gratuite
    if (freeShipping && !product.freeShippingAvailable) return false;

    // Filtre Prime (livraison rapide)
    if (primeShipping && !product.primeAvailable) return false;

    // Filtre évaluations
    if (selectedRating) {
      const ratingThreshold = parseInt(selectedRating);
      if (product.rating < ratingThreshold) return false;
    }

    return true;
  });

  if (loading) {
    return <div style={{ padding: "2rem", fontSize: "18px", textAlign: "center" }}>Chargement...</div>;
  }

  if (error) {
    return <div style={{ padding: "2rem", color: "red", fontSize: "18px", textAlign: "center" }}>Erreur: {error}</div>;
  }

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
        <p>Découvrez les meilleurs produits d'Afrique</p>
      </div>

      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 1.5rem" }}>

        {/* Barre de filtres */}
        <div style={{ position: "relative", marginBottom: "1.5rem" }}>
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 18px",
              backgroundColor: filterOpen ? "#1f5296" : "white",
              color: filterOpen ? "white" : "#1f5296",
              border: "2px solid #1f5296",
              borderRadius: "6px",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
            }}
          >
            <span style={{ fontSize: "18px", lineHeight: 1 }}>☰</span>
            Filtres
            {(selectedCategory || selectedPrice || freeShipping || primeShipping || selectedRating) && (
              <span style={{
                backgroundColor: "#d5001c",
                color: "white",
                borderRadius: "50%",
                width: "18px",
                height: "18px",
                fontSize: "11px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center"
              }}>●</span>
            )}
          </button>

          {/* Dropdown panel */}
          {filterOpen && (
            <div style={{
              position: "absolute",
              top: "calc(100% + 8px)",
              left: 0,
              zIndex: 100,
              backgroundColor: "white",
              border: "1px solid #ddd",
              borderRadius: "8px",
              boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
              padding: "1.5rem",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: "1.5rem",
              minWidth: "680px"
            }}>

              {/* Catégories */}
              <div>
                <h3 style={{ fontSize: "14px", fontWeight: "700", marginBottom: "0.75rem", color: "#1f5296", borderBottom: "2px solid #1f5296", paddingBottom: "4px" }}>Catégories</h3>
                {["Électronique", "Vêtements", "Livres", "Maison", "Sports"].map(cat => (
                  <label key={cat} style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "0.4rem", cursor: "pointer", fontSize: "13px" }}>
                    <input
                      type="radio"
                      name="category"
                      value={cat}
                      checked={selectedCategory === cat}
                      onChange={(e) => setSelectedCategory(e.target.checked ? cat : "")}
                    />
                    {cat}
                  </label>
                ))}
                {selectedCategory && (
                  <button onClick={() => setSelectedCategory("")} style={{ fontSize: "11px", color: "#d5001c", background: "none", border: "none", cursor: "pointer", padding: 0, marginTop: "4px" }}>✕ Effacer</button>
                )}
              </div>

              {/* Prix */}
              <div>
                <h3 style={{ fontSize: "14px", fontWeight: "700", marginBottom: "0.75rem", color: "#1f5296", borderBottom: "2px solid #1f5296", paddingBottom: "4px" }}>Prix</h3>
                {[
                  { label: "0 - 50 000 FCFA", value: "0-50000" },
                  { label: "50 000 - 100 000 FCFA", value: "50000-100000" },
                  { label: "100 000 - 500 000 FCFA", value: "100000-500000" },
                  { label: "Plus de 500 000 FCFA", value: "500000+" }
                ].map(range => (
                  <label key={range.value} style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "0.4rem", cursor: "pointer", fontSize: "13px" }}>
                    <input
                      type="radio"
                      name="price"
                      value={range.value}
                      checked={selectedPrice === range.value}
                      onChange={(e) => setSelectedPrice(e.target.checked ? range.value : "")}
                    />
                    {range.label}
                  </label>
                ))}
                {selectedPrice && (
                  <button onClick={() => setSelectedPrice("")} style={{ fontSize: "11px", color: "#d5001c", background: "none", border: "none", cursor: "pointer", padding: 0, marginTop: "4px" }}>✕ Effacer</button>
                )}
              </div>

              {/* Livraison */}
              <div>
                <h3 style={{ fontSize: "14px", fontWeight: "700", marginBottom: "0.75rem", color: "#1f5296", borderBottom: "2px solid #1f5296", paddingBottom: "4px" }}>Livraison</h3>
                <label style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "0.4rem", cursor: "pointer", fontSize: "13px" }}>
                  <input type="checkbox" checked={freeShipping} onChange={(e) => setFreeShipping(e.target.checked)} />
                  Livraison gratuite
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer", fontSize: "13px" }}>
                  <input type="checkbox" checked={primeShipping} onChange={(e) => setPrimeShipping(e.target.checked)} />
                  Livraison rapide (Prime)
                </label>
              </div>

              {/* Évaluations */}
              <div>
                <h3 style={{ fontSize: "14px", fontWeight: "700", marginBottom: "0.75rem", color: "#1f5296", borderBottom: "2px solid #1f5296", paddingBottom: "4px" }}>Évaluations</h3>
                {[5, 4].map(stars => (
                  <label key={stars} style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "0.4rem", cursor: "pointer", fontSize: "13px" }}>
                    <input
                      type="radio"
                      name="rating"
                      value={stars}
                      checked={selectedRating === String(stars)}
                      onChange={(e) => setSelectedRating(e.target.checked ? String(stars) : "")}
                    />
                    {"★".repeat(stars)} ({stars}+)
                  </label>
                ))}
                {selectedRating && (
                  <button onClick={() => setSelectedRating("")} style={{ fontSize: "11px", color: "#d5001c", background: "none", border: "none", cursor: "pointer", padding: 0, marginTop: "4px" }}>✕ Effacer</button>
                )}
              </div>

              {/* Bouton appliquer */}
              <div style={{ gridColumn: "1 / -1", display: "flex", justifyContent: "flex-end", borderTop: "1px solid #eee", paddingTop: "1rem" }}>
                <button
                  onClick={() => setFilterOpen(false)}
                  style={{
                    padding: "8px 24px",
                    backgroundColor: "#1f5296",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    fontWeight: "600",
                    cursor: "pointer",
                    fontSize: "14px"
                  }}
                >
                  Appliquer les filtres
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Produits */}
        <div>
            <div style={{ marginBottom: "1.5rem", color: "#666", fontSize: "14px" }}>
              {filteredProducts.length > PRODUCTS_PER_PAGE ? (
                <>
                  Affichage de <strong>{PRODUCTS_PER_PAGE}</strong> sur <strong>{filteredProducts.length}</strong> produit{filteredProducts.length !== 1 ? "s" : ""} trouvé{filteredProducts.length !== 1 ? "s" : ""}
                </>
              ) : (
                <>
                  {filteredProducts.length} produit{filteredProducts.length !== 1 ? "s" : ""} trouvé{filteredProducts.length !== 1 ? "s" : ""}
                </>
              )}
            </div>

            {filteredProducts.length === 0 ? (
              <div style={{ 
                backgroundColor: "white", 
                padding: "2rem", 
                textAlign: "center",
                borderRadius: "4px"
              }}>
                <p style={{ fontSize: "16px", color: "#666" }}>Aucun produit ne correspond à vos critères</p>
              </div>
            ) : (
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                gap: "1.5rem"
              }}>
                {filteredProducts.slice(0, PRODUCTS_PER_PAGE).map(product => (
                  <div 
                    key={product.id}
                    style={{
                      backgroundColor: "white",
                      borderRadius: "8px",
                      padding: "1rem",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                      textAlign: "center",
                      transition: "transform 0.3s, box-shadow 0.3s",
                      cursor: "pointer"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-4px)";
                      e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.15)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
                    }}
                  >
                    {/* Image */}
                    {product.images && product.images.length > 0 && (
                      <img 
                        src={product.images[0]} 
                        alt={product.title}
                        style={{
                          width: "100%",
                          height: "180px",
                          objectFit: "cover",
                          borderRadius: "4px",
                          marginBottom: "1rem"
                        }}
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                    )}
                    
                    {/* Titre */}
                    <h3 style={{
                      fontSize: "14px",
                      margin: "0 0 0.5rem 0",
                      minHeight: "40px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical"
                    }}>
                      {product.title}
                    </h3>
                    
                    {/* Rating */}
                    <div style={{ fontSize: "12px", color: "#ff9900", marginBottom: "0.5rem" }}>
                      ★★★★★ ({product.rating}/5)
                    </div>
                    
                    {/* Prix */}
                    <div style={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      color: "#d5001c",
                      marginBottom: "0.5rem"
                    }}>
                      {product.price > 0 ? `${product.price.toLocaleString()} FCFA` : "Prix sur demande"}
                    </div>

                    {/* Badges livraison */}
                    <div style={{ fontSize: "11px", marginBottom: "1rem" }}>
                      {product.freeShippingAvailable && (
                        <span style={{
                          display: "inline-block",
                          backgroundColor: "#28a745",
                          color: "white",
                          padding: "4px 8px",
                          borderRadius: "3px",
                          marginRight: "4px",
                          marginBottom: "4px"
                        }}>
                          Livraison gratuite
                        </span>
                      )}
                      {product.primeAvailable && (
                        <span style={{
                          display: "inline-block",
                          backgroundColor: "#FF9900",
                          color: "white",
                          padding: "4px 8px",
                          borderRadius: "3px",
                          marginBottom: "4px"
                        }}>
                          Prime
                        </span>
                      )}
                    </div>
                    
                    {/* Bouton */}
                    <Link 
                      to={`/product/${product.id}`}
                      style={{
                        display: "inline-block",
                        padding: "8px 16px",
                        backgroundColor: "#0066c0",
                        color: "white",
                        textDecoration: "none",
                        borderRadius: "4px",
                        fontSize: "13px",
                        fontWeight: "600",
                        cursor: "pointer"
                      }}
                    >
                      Voir plus
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
      </div>
    </div>
  );
}
