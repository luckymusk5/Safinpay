import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../services/api";
import ProductCard_new from "../components/ProductCard_new";

export default function Search_new() {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("relevance");

  const query = searchParams.get("q") || "";

  useEffect(() => {
    if (query.trim()) {
      setLoading(true);
      api.get("/products/search/", { params: { q: query } })
        .then(res => {
          const resultsList = Array.isArray(res.data) ? res.data : res.data.results || [];
          setResults(resultsList);
        })
        .catch(err => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [query]);

  const sortedResults = [...results].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
    return 0;
  });

  return (
    <div style={{ backgroundColor: "#f5f5f5", minHeight: "100vh", padding: "2rem 0" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 1.5rem" }}>
        <h1 style={{ marginBottom: "1rem" }}>
          Résultats de recherche pour "<strong>{query}</strong>"
        </h1>
        <p style={{ color: "#666", marginBottom: "2rem" }}>
          {loading 
            ? "Recherche en cours..." 
            : `${results.length} résultat${results.length !== 1 ? "s" : ""} trouvé${results.length !== 1 ? "s" : ""}`
          }
        </p>

        {!loading && results.length > 0 && (
          <div style={{ marginBottom: "2rem" }}>
            <label style={{ marginRight: "1rem", fontWeight: "600" }}>Trier par:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="form-select"
              style={{ width: "200px", display: "inline-block" }}
            >
              <option value="relevance">Pertinence</option>
              <option value="price-low">Prix: bas à haut</option>
              <option value="price-high">Prix: haut à bas</option>
              <option value="rating">Meilleure évaluation</option>
            </select>
          </div>
        )}

        {loading ? (
          <div className="spinner"></div>
        ) : results.length === 0 ? (
          <div style={{
            background: "white",
            padding: "3rem",
            borderRadius: "4px",
            textAlign: "center"
          }}>
            <p style={{ fontSize: "3rem", marginBottom: "1rem" }}>Recherche</p>
            <h2>Aucun résultat trouvé</h2>
            <p style={{ color: "#666", margin: "1rem 0" }}>
              Essayez d'autres mots-clés ou consultez nos catégories
            </p>
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "1.5rem"
          }}>
            {sortedResults.map(product => (
              <ProductCard_new key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}