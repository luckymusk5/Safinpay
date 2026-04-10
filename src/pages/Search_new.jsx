import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../services/api";
import ProductCard_new from "../components/ProductCard_new";

const NAVY = "#1b3a6b";
const LIGHT_BG = "#f4f7fb";
const PANEL = "#ffffff";

export default function Search_new() {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("relevance");

  const query = searchParams.get("q") || "";

  useEffect(() => {
    if (query.trim()) {
      setLoading(true);
      api.get("/products/search/", { params: { q: query, limit: 20, mode: "fast" } })
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
    <div style={{ background: LIGHT_BG, minHeight: "100vh", padding: "2rem 0 3rem" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 1.5rem" }}>
        <div style={{
          background: `linear-gradient(135deg, ${NAVY} 0%, #234c88 100%)`,
          color: "white",
          borderRadius: "24px",
          padding: "1.75rem 2rem",
          boxShadow: "0 18px 45px rgba(27,58,107,0.16)",
          marginBottom: "1.5rem"
        }}>
          <p style={{ margin: 0, textTransform: "uppercase", letterSpacing: "0.12em", fontSize: "0.78rem", opacity: 0.9 }}>
            Recherche
          </p>
          <h1 style={{ margin: "0.35rem 0 0.5rem", fontSize: "2rem", lineHeight: 1.1 }}>
            Résultats pour "{query}"
          </h1>
          <p style={{ margin: 0, color: "rgba(255,255,255,0.9)" }}>
            {loading
              ? "Recherche en cours..."
              : `${results.length} résultat${results.length !== 1 ? "s" : ""} trouvé${results.length !== 1 ? "s" : ""}`}
          </p>
        </div>

        {!loading && results.length > 0 && (
          <div style={{ marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.85rem", flexWrap: "wrap" }}>
            <label style={{ fontWeight: "600", color: NAVY }}>Trier par:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="form-select"
              style={{ width: "220px", display: "inline-block", borderColor: "rgba(27,58,107,0.16)" }}
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
            background: PANEL,
            padding: "3rem 2rem",
            borderRadius: "20px",
            textAlign: "center",
            boxShadow: "0 12px 28px rgba(17,24,39,0.06)"
          }}>
            <p style={{ fontSize: "3rem", marginBottom: "1rem", color: NAVY }}>Recherche</p>
            <h2 style={{ color: NAVY }}>Aucun résultat trouvé</h2>
            <p style={{ color: "#667085", margin: "1rem 0" }}>
              Essayez d'autres mots-clés ou consultez nos catégories
            </p>
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
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