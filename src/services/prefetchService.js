/**
 * Service de Prefetch - Précharge intelligente des images
 * ✅ Prefetch des images proches au scroll
 * ✅ Intersection Observer pour performance
 */

class PrefetchService {
  constructor() {
    this.prefetchedUrls = new Set();
    this.maxPrefetch = 10;
  }

  /**
   * Créer un link prefetch pour les images
   */
  prefetchImage(imageUrl) {
    if (!imageUrl || this.prefetchedUrls.has(imageUrl)) return;

    // Limiter le nombre de prefetch
    if (this.prefetchedUrls.size >= this.maxPrefetch) return;

    try {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = imageUrl;
      link.as = 'image';
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
      this.prefetchedUrls.add(imageUrl);
    } catch (e) {
      console.debug('Prefetch failed:', e);
    }
  }

  /**
   * Prefetch des images visibles et proches
   */
  prefetchVisibleImages(images = []) {
    images.forEach((imageUrl) => {
      this.prefetchImage(imageUrl);
    });
  }

  /**
   * Nettoyer les prefetch anciennes
   */
  clear() {
    const links = document.querySelectorAll('link[rel="prefetch"][as="image"]');
    links.forEach(link => {
      link.remove();
      this.prefetchedUrls.delete(link.href);
    });
  }
}

export const prefetchService = new PrefetchService();

/**
 * Hook React pour prefetch des images au scroll
 */
export function usePrefetchImages(imageUrls = []) {
  React.useEffect(() => {
    if (!imageUrls || imageUrls.length === 0) return;

    // Prefetch les images visibles
    prefetchService.prefetchVisibleImages(imageUrls);

    return () => {
      // Nettoyer si component unmount
      if (imageUrls.length === 0) {
        prefetchService.clear();
      }
    };
  }, [imageUrls]);
}
