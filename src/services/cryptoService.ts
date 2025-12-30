import axios from "axios";

interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  total_volume?: number;
  image: string;
  sparkline_in_7d?: {
    price: number[];
  };
}

interface CacheEntry {
  data: CryptoData[];
  timestamp: number;
  expiresAt: number;
}

class CryptoCache {
  private memoryCache: Map<string, CacheEntry> = new Map();
  private pendingRequests: Map<string, Promise<CryptoData[]>> = new Map();
  
  private readonly CACHE_TTL = 20 * 1000;
  private readonly STORAGE_KEY = "crypto_cache";
  private readonly STORAGE_TTL = 60 * 1000;

  private getCacheKey(sparkline: boolean): string {
    return `crypto_${sparkline ? "with" : "without"}_sparkline`;
  }

  private isExpired(entry: CacheEntry): boolean {
    return Date.now() > entry.expiresAt;
  }

  private getFromMemory(key: string): CryptoData[] | null {
    const entry = this.memoryCache.get(key);
    if (entry && !this.isExpired(entry)) {
      return entry.data;
    }
    if (entry) {
      this.memoryCache.delete(key);
    }
    return null;
  }

  private setInMemory(key: string, data: CryptoData[]): void {
    const now = Date.now();
    this.memoryCache.set(key, {
      data,
      timestamp: now,
      expiresAt: now + this.CACHE_TTL,
    });
  }

  private getFromStorage(key: string): CryptoData[] | null {
    try {
      const stored = localStorage.getItem(`${this.STORAGE_KEY}_${key}`);
      if (!stored) return null;

      const entry: CacheEntry = JSON.parse(stored);
      if (this.isExpired(entry)) {
        localStorage.removeItem(`${this.STORAGE_KEY}_${key}`);
        return null;
      }

      this.setInMemory(key, entry.data);
      return entry.data;
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return null;
    }
  }

  private setInStorage(key: string, data: CryptoData[]): void {
    try {
      const now = Date.now();
      const entry: CacheEntry = {
        data,
        timestamp: now,
        expiresAt: now + this.STORAGE_TTL,
      };
      localStorage.setItem(`${this.STORAGE_KEY}_${key}`, JSON.stringify(entry));
    } catch (error) {
      console.error("Error writing to localStorage:", error);
    }
  }

  getCachedDataSync(sparkline: boolean = false): CryptoData[] | null {
    const key = this.getCacheKey(sparkline);

    const memoryData = this.getFromMemory(key);
    if (memoryData) {
      return memoryData;
    }

    return this.getFromStorage(key);
  }

  async fetchCryptoData(sparkline: boolean = false): Promise<CryptoData[]> {
    const key = this.getCacheKey(sparkline);

    const memoryData = this.getFromMemory(key);
    if (memoryData) {
      return memoryData;
    }

    const pendingRequest = this.pendingRequests.get(key);
    if (pendingRequest) {
      return pendingRequest;
    }

    const storageData = this.getFromStorage(key);
    if (storageData) {
      return storageData;
    }

    const requestPromise = this.fetchFromAPI(sparkline)
      .then((data) => {
        this.setInMemory(key, data);
        this.setInStorage(key, data);
        this.pendingRequests.delete(key);
        return data;
      })
      .catch((error) => {
        this.pendingRequests.delete(key);
        throw error;
      });

    this.pendingRequests.set(key, requestPromise);
    return requestPromise;
  }

  private async fetchFromAPI(sparkline: boolean): Promise<CryptoData[]> {
    try {
      const response = await axios.get("/api/crypto", {
        params: sparkline ? { sparkline: "true" } : {},
        timeout: 8000,
      });

      if (!response.data || !Array.isArray(response.data)) {
        throw new Error("Invalid response format");
      }

      return response.data;
    } catch (error) {
      console.error("Error fetching crypto data:", error);
      throw error;
    }
  }

  clearCache(sparkline?: boolean): void {
    if (sparkline !== undefined) {
      const key = this.getCacheKey(sparkline);
      this.memoryCache.delete(key);
      this.pendingRequests.delete(key);
      try {
        localStorage.removeItem(`${this.STORAGE_KEY}_${key}`);
      } catch (error) {
        console.error("Error clearing localStorage:", error);
      }
    } else {
      this.memoryCache.clear();
      this.pendingRequests.clear();
      try {
        Object.keys(localStorage)
          .filter((key) => key.startsWith(this.STORAGE_KEY))
          .forEach((key) => localStorage.removeItem(key));
      } catch (error) {
        console.error("Error clearing localStorage:", error);
      }
    }
  }

  async prefetch(sparkline: boolean = false): Promise<void> {
    const key = this.getCacheKey(sparkline);
    if (!this.pendingRequests.has(key)) {
      this.fetchCryptoData(sparkline).catch(() => {
        // Silently fail on prefetch
      });
    }
  }
}

export const cryptoCache = new CryptoCache();
export type { CryptoData };

