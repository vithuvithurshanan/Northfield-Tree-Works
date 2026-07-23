/**
 * Robust Client-Side Caching Engine for Northfield Tree Works
 * Handles TTL expiration, localStorage fallbacks, and draft auto-persisting.
 */

const CACHE_PREFIX = 'arborcraft_cache_v1_';

interface CacheWrapper<T> {
  data: T;
  timestamp: number;
  ttlMs?: number;
}

export function setCache<T>(key: string, data: T, ttlMs?: number): void {
  try {
    const payload: CacheWrapper<T> = {
      data,
      timestamp: Date.now(),
      ttlMs,
    };
    localStorage.setItem(`${CACHE_PREFIX}${key}`, JSON.stringify(payload));
  } catch (err) {
    console.warn('LocalStorage write error:', err);
  }
}

export function getCache<T>(key: string, defaultValue: T): T {
  try {
    const raw = localStorage.getItem(`${CACHE_PREFIX}${key}`);
    if (!raw) return defaultValue;

    const payload: CacheWrapper<T> = JSON.parse(raw);
    if (payload.ttlMs && Date.now() - payload.timestamp > payload.ttlMs) {
      localStorage.removeItem(`${CACHE_PREFIX}${key}`);
      return defaultValue;
    }

    return payload.data ?? defaultValue;
  } catch (err) {
    console.warn('LocalStorage read error:', err);
    return defaultValue;
  }
}

export function removeCache(key: string): void {
  try {
    localStorage.removeItem(`${CACHE_PREFIX}${key}`);
  } catch (err) {
    console.warn('LocalStorage remove error:', err);
  }
}

export function clearAllCache(): void {
  try {
    Object.keys(localStorage).forEach((k) => {
      if (k.startsWith(CACHE_PREFIX)) {
        localStorage.removeItem(k);
      }
    });
  } catch (err) {
    console.warn('LocalStorage clear error:', err);
  }
}

export const QUOTE_CACHE_KEY = 'last_quote_calculator';
export const REVIEWS_CACHE_KEY = 'customer_reviews';
export const THEME_CACHE_KEY = 'theme_preference';
