import { useEffect, useState } from "react";

const PLACEHOLDER_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='500'%3E%3Crect fill='%23f0f0f0' width='500' height='500'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23999' font-size='20'%3E📦 Pas de photo%3C/text%3E%3C/svg%3E";

function resolveImageSrc(src, baseUrl) {
  if (!src) return PLACEHOLDER_IMAGE;
  if (src.startsWith("http") || src.startsWith("data:")) return src;
  return `${baseUrl}${src}`;
}

export default function AsyncProductImage({
  src,
  alt,
  baseUrl = "https://safinpaybackend-production.up.railway.app",
  className,
  style,
  loading = "lazy",
  priority = false,
  fallbackSrc = PLACEHOLDER_IMAGE,
  wrapperStyle,
  onLoad,
  onError,
}) {
  const [displaySrc, setDisplaySrc] = useState(fallbackSrc);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const resolvedSrc = resolveImageSrc(src, baseUrl);
    let cancelled = false;

    if (!src) {
      setDisplaySrc(fallbackSrc);
      setIsReady(true);
      return undefined;
    }

    setIsReady(false);

    const image = new Image();
    image.decoding = "async";
    image.loading = priority ? "eager" : "lazy";
    image.fetchPriority = priority ? "high" : "low";
    image.src = resolvedSrc;

    image.onload = () => {
      if (cancelled) return;
      setDisplaySrc(resolvedSrc);
      setIsReady(true);
      if (typeof onLoad === "function") {
        onLoad(resolvedSrc);
      }
    };

    image.onerror = () => {
      if (cancelled) return;
      setDisplaySrc(fallbackSrc);
      setIsReady(true);
      if (typeof onError === "function") {
        onError(resolvedSrc);
      }
    };

    return () => {
      cancelled = true;
    };
  }, [src, baseUrl, fallbackSrc, onLoad, onError, priority]);

  return (
    <div style={{ position: "relative", overflow: "hidden", ...wrapperStyle }}>
      {!isReady && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(90deg, #eef2f7 25%, #f7f9fc 37%, #eef2f7 63%)",
            backgroundSize: "400% 100%",
          }}
        />
      )}
      <img
        src={displaySrc}
        alt={alt}
        className={className}
        loading={loading}
        decoding="async"
        fetchPriority={priority ? "high" : "low"}
        style={{
          opacity: isReady ? 1 : 0,
          transition: "opacity 180ms ease",
          display: "block",
          width: "100%",
          height: "100%",
          ...style,
        }}
        onError={(event) => {
          event.currentTarget.src = fallbackSrc;
        }}
      />
    </div>
  );
}
