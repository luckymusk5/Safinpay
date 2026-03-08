// Service de gestion du cache d'images

const CACHE_KEY = 'imageCacheData';
const MAX_CACHE_SIZE = 50 * 1024 * 1024; // 50MB max

class ImageCacheService {
  /**
   * Récupérer toutes les images en cache
   */
  static getAllCachedImages() {
    try {
      const data = localStorage.getItem(CACHE_KEY);
      return data ? JSON.parse(data) : {};
    } catch (err) {
      console.error("Erreur lors de la lecture du cache:", err);
      return {};
    }
  }

  /**
   * Ajouter une image au cache
   * @param {File} file - Le fichier image
   * @returns {string} - ID unique de l'image
   */
  static async addImageToCache(file) {
    return new Promise((resolve, reject) => {
      // Validation initiale
      if (!file) {
        reject(new Error("Fichier invalide"));
        return;
      }

      if (!file.type.startsWith('image/')) {
        reject(new Error(`Type fichier invalide: ${file.type}`));
        return;
      }

      if (file.size === 0) {
        reject(new Error("Le fichier est vide"));
        return;
      }

      const reader = new FileReader();
      let startTime = Date.now();
      
      reader.onload = () => {
        try {
          if (!reader.result || reader.result.length === 0) {
            throw new Error("Erreur lors de la lecture du fichier");
          }

          const imageId = `img_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
          const cache = this.getAllCachedImages();
          
          // Calculer l'espace utilisé
          const currentSize = JSON.stringify(cache).length;
          const dataSize = reader.result.length;
          const totalSize = currentSize + dataSize;
          
          console.log(`Image: ${file.name}, Taille: ${(dataSize / 1024 / 1024).toFixed(2)}MB, Total cache: ${(totalSize / 1024 / 1024).toFixed(2)}MB`);
          
          if (totalSize > MAX_CACHE_SIZE) {
            throw new Error(`Cache plein (${(totalSize / 1024 / 1024).toFixed(2)}MB / 50MB). Supprimez des images.`);
          }
          
          cache[imageId] = {
            id: imageId,
            name: file.name,
            data: reader.result,
            size: file.size,
            type: file.type,
            addedAt: new Date().toISOString()
          };
          
          // Sauvegarder dans localStorage
          const jsonString = JSON.stringify(cache);
          localStorage.setItem(CACHE_KEY, jsonString);
          
          const endTime = Date.now();
          console.log(`Image "${file.name}" ajoutée en ${endTime - startTime}ms`);
          
          resolve(imageId);
        } catch (err) {
          console.error("Erreur lors de l'ajout au cache:", err);
          reject(err);
        }
      };
      
      reader.onerror = () => {
        const error = new Error(`Erreur lectu fichier: ${reader.error}`);
        console.error("Erreur FileReader:", error);
        reject(error);
      };

      reader.onprogress = (e) => {
        if (e.lengthComputable) {
          const percentComplete = (e.loaded / e.total) * 100;
          console.log(`Lecture fichier: ${percentComplete.toFixed(2)}%`);
        }
      };

      try {
        console.log(`Lecture du fichier: ${file.name} (${(file.size / 1024).toFixed(2)}KB)`);
        reader.readAsDataURL(file);
      } catch (err) {
        console.error("Erreur lors du readAsDataURL:", err);
        reject(err);
      }
    });
  }

  /**
   * Supprimer une image du cache
   */
  static deleteImageFromCache(imageId) {
    try {
      const cache = this.getAllCachedImages();
      delete cache[imageId];
      localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
      return true;
    } catch (err) {
      console.error("Erreur lors de la suppression:", err);
      return false;
    }
  }

  /**
   * Récupérer une image du cache
   */
  static getImageById(imageId) {
    const cache = this.getAllCachedImages();
    return cache[imageId] || null;
  }

  /**
   * Convertir une image en cache en Blob/File pour l'upload
   */
  static async getImageAsFile(imageId) {
    const image = this.getImageById(imageId);
    if (!image) return null;
    
    const response = await fetch(image.data);
    const blob = await response.blob();
    return new File([blob], image.name, { type: image.type });
  }

  /**
   * Vider tout le cache
   */
  static clearCache() {
    try {
      localStorage.removeItem(CACHE_KEY);
      return true;
    } catch (err) {
      console.error("Erreur lors du vidage du cache:", err);
      return false;
    }
  }

  /**
   * Obtenir l'espace utilisé en cache
   */
  static getCacheSize() {
    const cache = this.getAllCachedImages();
    return JSON.stringify(cache).length;
  }
}

export default ImageCacheService;
