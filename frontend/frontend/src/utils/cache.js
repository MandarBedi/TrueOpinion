/**
 * Simple in-memory cache with TTL support
 */
class ApiCache {
  constructor() {
    this.cache = new Map();
  }

  /**
   * Set cache entry with TTL
   * @param {string} key - Cache key
   * @param {*} value - Value to cache
   * @param {number} ttl - Time to live in milliseconds
   */
  set(key, value, ttl = 300000) { // Default 5 minutes TTL
    const expiresAt = Date.now() + ttl;
    this.cache.set(key, {
      value,
      expiresAt,
    });
  }

  /**
   * Get cache entry if not expired
   * @param {string} key - Cache key
   * @returns {*} Cached value or undefined if expired/missing
   */
  get(key) {
    const entry = this.cache.get(key);
    if (!entry) return undefined;

    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return undefined;
    }

    return entry.value;
  }

  /**
   * Clear all cached entries
   */
  clear() {
    this.cache.clear();
  }

  /**
   * Clear expired entries
   */
  clearExpired() {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (now > entry.expiresAt) {
        this.cache.delete(key);
      }
    }
  }
}

export const apiCache = new ApiCache();

/**
 * Generate cache key from request config
 * @param {Object} config - Axios request config
 * @returns {string} Cache key
 */
export const generateCacheKey = (config) => {
  const { method, url, params, data } = config;
  return JSON.stringify({
    method: method?.toLowerCase(),
    url,
    params,
    data,
  });
};
