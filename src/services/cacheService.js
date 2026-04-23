/**
 * Service de Cache Local - Optimisation des requêtes API
 * ✅ Cache en mémoire pour les requêtes GET
 * ✅ IndexedDB pour les images
 * ✅ Expiration TTL configurable
 */

const CACHE_STORE_NAME = 'safinpay-cache';
const CACHE_DB_NAME = 'safinpay-db';
const DEFAULT_TTL = 24 * 60 * 60 * 1000; // 24h

class CacheService {
  constructor() {
    this.memoryCache = new Map();
    this.db = null;
    this.initDB();
  }

  /**
   * Initialiser IndexedDB pour les images volumineuses
   */
  async initDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(CACHE_DB_NAME, 1);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(CACHE_STORE_NAME)) {
          db.createObjectStore(CACHE_STORE_NAME, { keyPath: 'key' });
        }
      };
    });
  }

  /**
   * Clé de cache unique basée sur URL + params
   */
  getCacheKey(url, params = {}) {
    const paramStr = Object.keys(params)
      .sort()
      .map(k => `${k}=${params[k]}`)
      .join('&');
    return `${url}${paramStr ? '?' + paramStr : ''}`;
  }

  /**
   * Récupérer du cache mémoire (rapide)
   */
  getMemory(key) {
    const cached = this.memoryCache.get(key);
    if (cached && cached.expires > Date.now()) {
      return cached.data;
    }
    // Expirée → supprimer
    this.memoryCache.delete(key);
    return null;
  }

  /**
   * Stocker en cache mémoire
   */
  setMemory(key, data, ttl = DEFAULT_TTL) {
    this.memoryCache.set(key, {
      data,
      expires: Date.now() + ttl,
    });
  }

  /**
   * Récupérer du cache IndexedDB (pour les images)
   */
  async getDB(key) {
    if (!this.db) await this.initDB();

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([CACHE_STORE_NAME], 'readonly');
      const store = transaction.objectStore(CACHE_STORE_NAME);
      const request = store.get(key);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        const cached = request.result;
        if (cached && cached.expires > Date.now()) {
          resolve(cached.data);
        } else {
          // Expirée → supprimer
          this.deleteDB(key);
          resolve(null);
        }
      };
    });
  }

  /**
   * Stocker en cache IndexedDB
   */
  async setDB(key, data, ttl = DEFAULT_TTL) {
    if (!this.db) await this.initDB();

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([CACHE_STORE_NAME], 'readwrite');
      const store = transaction.objectStore(CACHE_STORE_NAME);
      const request = store.put({
        key,
        data,
        expires: Date.now() + ttl,
      });

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  /**
   * Supprimer du cache IndexedDB
   */
  async deleteDB(key) {
    if (!this.db) await this.initDB();

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([CACHE_STORE_NAME], 'readwrite');
      const store = transaction.objectStore(CACHE_STORE_NAME);
      const request = store.delete(key);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  /**
   * Vider tout le cache
   */
  async clear() {
    this.memoryCache.clear();

    if (!this.db) await this.initDB();

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([CACHE_STORE_NAME], 'readwrite');
      const store = transaction.objectStore(CACHE_STORE_NAME);
      const request = store.clear();

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }
}

export const cacheService = new CacheService();

/**
 * Debouncer pour les recherches
 */
export function debounce(func, delay = 300) {
  let timeoutId = null;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

/**
 * Throttle pour les scroll events
 */
export function throttle(func, delay = 100) {
  let lastRun = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastRun >= delay) {
      func(...args);
      lastRun = now;
    }
  };
}
