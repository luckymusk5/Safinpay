import { useState, useEffect, useRef } from "react";

const BACKEND_ORIGIN =
  import.meta.env.VITE_BACKEND_ORIGIN || "https://safinpaybackend-production.up.railway.app";

const PLACEHOLDER_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600'%3E%3Crect fill='%23e8e8e8' width='800' height='600'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' font-size='48' fill='%23999'%3E📷%3C/text%3E%3C/svg%3E";

/**
 * Service - Get image URL (local cache ou proxy externe)
 * ✅ Priorité 1: Servir depuis le backend Railway `/api/image/<id>`
 * ✅ Priorité 2: Proxy `/proxy-image` sur le backend Railway si pas de productId
 */
const getImageUrl = (imageUrl, productId) => {
  if (!imageUrl) return PLACEHOLDER_IMAGE;
  
  // ✅ ULTRA-RAPIDE: Utiliser le cache local du backend Railway
  if (productId) {
    return `${BACKEND_ORIGIN}/api/image/${productId}`;
  }
  
  // ✅ Fallback: Proxy d'image sur le backend Railway (si pas de productId)
  if (imageUrl.includes('glotelho.cm')) {
    return `${BACKEND_ORIGIN}/proxy-image?url=${encodeURIComponent(imageUrl)}`;
  }
  
  return imageUrl;
};

/**
 * AsyncProductImage - Ultra-optimisé avec cache local
 * ✅ Images pré-téléchargées et cachées au démarrage backend
 * ✅ Servir depuis `/api/image/<id>` (10x plus rapide que proxy externe)
 * ✅ Cache HTTP 1 an
 * ✅ Lazy loading intelligent
 * ✅ Eager pour images hero
 */
export default function AsyncProductImage({
  src,
  productId,
  alt = "Produit",
  className,
  style,
  fallbackSrc = PLACEHOLDER_IMAGE,
  wrapperStyle,
  onLoad,
  onError,
  eager = false,
}) {
  const [imageSrc, setImageSrc] = useState(PLACEHOLDER_IMAGE);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);

  // ✅ Eager loading pour images "above the fold"
  useEffect(() => {
    if (eager && src) {
      const optimizedUrl = getImageUrl(src, productId);
      setImageSrc(optimizedUrl);
    }
  }, [eager, src, productId]);

  // ✅ Lazy loading avec IntersectionObserver
  useEffect(() => {
    if (eager || !imgRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && src) {
          const optimizedUrl = getImageUrl(src, productId);
          setImageSrc(optimizedUrl);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: '100px' }
    );

    observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, [src, eager, productId]);

  const handleLoad = () => {
    if (onLoad) onLoad(src);
  };

  const handleError = () => {
    setHasError(true);
    if (onError) onError(src);
  };

  return (
    <div
      ref={imgRef}
      style={{
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#f5f5f5",
        ...wrapperStyle,
      }}
    >
      <img
        src={imageSrc}
        alt={alt}
        className={className}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={eager ? "high" : "low"}
        crossOrigin="anonymous"
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          ...style,
        }}
        onLoad={handleLoad}
        onError={handleError}
      />
      {/* Placeholder animé pendant chargement */}
      {imageSrc === PLACEHOLDER_IMAGE && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
            backgroundSize: "200% 100%",
            animation: "loading 1.5s infinite",
          }}
        />
      )}
      <style>{`
        @keyframes loading {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}
