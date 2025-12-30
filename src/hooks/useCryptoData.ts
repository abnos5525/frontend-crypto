"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { cryptoCache, type CryptoData } from "@/src/services/cryptoService";

interface UseCryptoDataOptions {
  sparkline?: boolean;
  limit?: number;
  refreshInterval?: number;
  enabled?: boolean;
}

interface UseCryptoDataReturn {
  data: CryptoData[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useCryptoData(
  options: UseCryptoDataOptions = {}
): UseCryptoDataReturn {
  const {
    sparkline = false,
    limit,
    refreshInterval = 30000,
    enabled = true,
  } = options;

  const initialCachedData = useMemo(() => {
    if (!enabled) return [];
    const cached = cryptoCache.getCachedDataSync(sparkline);
    if (cached) {
      return limit && limit > 0 ? cached.slice(0, limit) : cached;
    }
    return [];
  }, [sparkline, limit, enabled]);

  const [data, setData] = useState<CryptoData[]>(initialCachedData);
  const [loading, setLoading] = useState(initialCachedData.length === 0);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    if (!enabled) return;

    try {
      setError(null);
      if (data.length === 0) {
        setLoading(true);
      }
      
      let result = await cryptoCache.fetchCryptoData(sparkline);

      if (limit && limit > 0) {
        result = result.slice(0, limit);
      }

      setData(result);
      setLoading(false);
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Unknown error");
      setError(error);
      setLoading(false);
      if (data.length === 0) {
        setData([]);
      }
    }
  }, [sparkline, limit, enabled, data.length]);

  const refetch = useCallback(async () => {
    setLoading(true);
    cryptoCache.clearCache(sparkline);
    await fetchData();
  }, [sparkline, fetchData]);

  useEffect(() => {
    if (!enabled) {
      setLoading(false);
      return;
    }

    if (initialCachedData.length > 0) {
      fetchData();
    } else {
      fetchData();
    }

    const interval = setInterval(() => {
      fetchData();
    }, refreshInterval);

    const prefetchInterval = setInterval(() => {
      cryptoCache.prefetch(sparkline);
    }, refreshInterval - 5000);

    return () => {
      clearInterval(interval);
      clearInterval(prefetchInterval);
    };
  }, [fetchData, refreshInterval, sparkline, enabled, initialCachedData.length]);

  return { data, loading, error, refetch };
}

