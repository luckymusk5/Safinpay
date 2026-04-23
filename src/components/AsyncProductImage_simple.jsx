import { useState } from "react";

const PLACEHOLDER_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='500'%3E%3Crect fill='%23e8e8e8' width='500' height='500'/%3E%3Ctext x='50%25' y='45%25' text-anchor='middle' font-size='48' fill='%23999'%3E📷%3C/text%3E%3Ctext x='50%25' y='60%25' text-anchor='middle' font-size='18' fill='%23999'%3EImage non disponible%3C/text%3E%3C/svg%3E";

/**
 * Simple image component - charged images avec CORS support
 * Les images de glotelho.cm nécessitent crossOrigin="anonymous"
 */
export default function AsyncProductImage({
  src,
  alt = "Produit",
  className,
  style,
  loading = "lazy",
  fallbackSrc = PLACEHOLDER_IMAGE,
  wrapperStyle,
  onLoad,
  onError,
}) {
  const [hasError, setHasError] = useState(false);

  const finalSrc = hasError ? (fallbackSrc || PLACEHOLDER_IMAGE) : (src || fallbackSrc || PLACEHOLDER_IMAGE);

  const handleImageError = (event) => {
    console.warn("❌ Image échouée:", src);
    setHasError(true);
    event.currentTarget.src = fallbackSrc || PLACEHOLDER_IMAGE;
  };

  return (
    <div style={{ 
      position: "relative", 
      overflow: "hidden",
      backgroundColor: "#f5f5f5",
      ...wrapperStyle 
    }}>
      <img
        src={finalSrc}
        alt={alt}
        className={className}
        loading={loading}
        crossOrigin="anonymous"
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          ...style,
        }}
        onError={handleImageError}
        onLoad={onLoad}
      />
    </div>
  );
}
