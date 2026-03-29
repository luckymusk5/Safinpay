// src/components/ProductCard.jsx

export default function ProductCard({ product, idx = 0 }) {
  // On définit les couleurs pour rester dans ton thème Navy/Gold
  const NAVY = "#1b3a6b";
  const GOLD = "#c9a030";

  return (
    <div style={{
      background: "white",
      borderRadius: "15px",
      padding: "1rem",
      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
      display: "flex",
      flexDirection: "column",
      transition: "transform 0.2s",
      border: "1px solid #eee"
    }}>
      <div style={{ width: "100%", height: "160px", borderRadius: "10px", overflow: "hidden", marginBottom: "1rem" }}>
        <img
          src={product.images ? product.images[0] : product.image}
          alt={product.displayTitle || product.name}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          onError={(e) => { e.target.src = "https://via.placeholder.com/200"; }}
        />
      </div>

      <h3 style={{ fontSize: "1rem", fontWeight: "700", color: NAVY, margin: "0 0 0.5rem" }}>
        {product.displayTitle || product.name}
      </h3>
      
      <p style={{ fontSize: "1.1rem", fontWeight: "800", color: GOLD, margin: "0 0 1rem" }}>
        {product.price.toLocaleString()} FCFA
      </p>

      <button style={{
        width: "100%",
        padding: "0.6rem",
        background: NAVY,
        color: "white",
        border: "none",
        borderRadius: "8px",
        fontWeight: "600",
        cursor: "pointer"
      }}>
        Ajouter au panier
      </button>
    </div>
  );
}