export default function ProductCardSimple({ product }) {
  // Récupérer le titre et les autres infos
  const title = product.title || product.name || "Produit sans titre";
  const price = product.price || 0;
  const images = product.images || [];
  const imageUrl = images.length > 0 ? images[0] : null;
  const description = product.description || "Aucune description";
  const url = product.url || "#";

  return (
    <div className="product-card" style={{
      border: "1px solid #ddd",
      borderRadius: "8px",
      padding: "12px",
      textAlign: "center",
      backgroundColor: "#fff",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
    }}>
      {/* Image */}
      <div style={{
        width: "100%",
        height: "200px",
        backgroundColor: "#f0f0f0",
        borderRadius: "4px",
        marginBottom: "12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden"
      }}>
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover"
            }}
            onError={(e) => {
              e.target.style.display = "none";
              e.target.parentElement.style.backgroundColor = "#eee";
            }}
          />
        ) : (
          <span style={{ color: "#999", fontSize: "12px" }}>No Image</span>
        )}
      </div>

      {/* Titre */}
      <h3 style={{
        margin: "0 0 8px 0",
        fontSize: "14px",
        fontWeight: "600",
        color: "#333",
        minHeight: "40px",
        display: "-webkit-box",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        textOverflow: "ellipsis",
        WebkitLineClamp: 2,
        WebkitBoxOrient: "vertical"
      }}>
        {title}
      </h3>

      {/* Prix */}
      <div style={{
        fontSize: "16px",
        fontWeight: "bold",
        color: "#d5001c",
        marginBottom: "12px"
      }}>
        {price > 0 ? `${price.toLocaleString()} FCFA` : "Prix sur demande"}
      </div>

      {/* Description courte */}
      <p style={{
        fontSize: "12px",
        color: "#666",
        margin: "0 0 12px 0",
        minHeight: "30px",
        overflow: "hidden",
        textOverflow: "ellipsis",
        display: "-webkit-box",
        WebkitLineClamp: 2,
        WebkitBoxOrient: "vertical"
      }}>
        {description.substring(0, 100)}...
      </p>

      {/* Bouton */}
      <a 
        href={url} 
        target="_blank" 
        rel="noopener noreferrer"
        style={{
          display: "inline-block",
          padding: "8px 16px",
          backgroundColor: "#0066c0",
          color: "white",
          textDecoration: "none",
          borderRadius: "4px",
          fontSize: "13px",
          fontWeight: "600",
          cursor: "pointer",
          transition: "background-color 0.3s"
        }}
        onMouseEnter={(e) => e.target.style.backgroundColor = "#004a94"}
        onMouseLeave={(e) => e.target.style.backgroundColor = "#0066c0"}
      >
        Voir plus
      </a>
    </div>
  );
}
