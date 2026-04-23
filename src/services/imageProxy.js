/**
 * Service de proxy pour les images externes
 * Convertit les URLs externes en data URIs pour éviter les problèmes CORS
 */

const imageCache = new Map();

export async function proxyImage(imageUrl) {
  if (!imageUrl) return null;
  
  // Si c'est déjà un data URI, retourner directement
  if (imageUrl.startsWith('data:')) {
    return imageUrl;
  }

  // Vérifier le cache
  if (imageCache.has(imageUrl)) {
    const cached = imageCache.get(imageUrl);
    if (cached.timestamp > Date.now() - 3600000) { // Cache 1h
      return cached.dataUri;
    }
  }

  try {
    // Fetch l'image avec mode CORS
    const response = await fetch(imageUrl, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Accept': 'image/*'
      }
    });

    if (!response.ok) {
      console.warn(`Erreur: ${response.status} pour ${imageUrl}`);
      return imageUrl; // Retourner l'URL originale si ça échoue
    }

    const blob = await response.blob();
    const reader = new FileReader();

    return new Promise((resolve) => {
      reader.onloadend = () => {
        const dataUri = reader.result;
        imageCache.set(imageUrl, {
          dataUri,
          timestamp: Date.now()
        });
        resolve(dataUri);
      };
      reader.readAsDataURL(blob);
    });
  } catch (err) {
    console.warn(`Impossible de charger l'image: ${imageUrl}`, err);
    // Retourner l'URL originale si ça échoue
    return imageUrl;
  }
}

export function clearImageCache() {
  imageCache.clear();
}
