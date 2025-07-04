// src/hooks/useVehicleSearch.ts

'use client';

import { useState, useEffect, useCallback } from 'react';
import { useInfiniteQuery } from 'react-query';
import type {
  Vehicle,
  VehicleFilters,
  UseVehicleSearchReturn
} from '@/types/automotive';
import { vehicleApi } from '@/lib/api';

// Prosta implementacja debounce bez lodash
function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function useVehicleSearch(
  initialFilters: VehicleFilters = {}
): UseVehicleSearchReturn {
  const [filters, setFilters] = useState<VehicleFilters>(initialFilters);
  const [debouncedFilters, setDebouncedFilters] = useState<VehicleFilters>(initialFilters);

  // Debounce zmian filtrów o 300ms
  const debouncedSet = useCallback(
    debounce((f: VehicleFilters) => setDebouncedFilters(f), 300),
    []
  );

  useEffect(() => {
    debouncedSet(filters);
  }, [filters, debouncedSet]);

  // Użycie useInfiniteQuery dla paginacji
  const {
    data,
    isLoading,
    error,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage
  } = useInfiniteQuery(
    ['vehicles', debouncedFilters],
    ({ pageParam = 1 }) =>
      vehicleApi.getAll({ ...debouncedFilters, page: pageParam }),
    {
      getNextPageParam: (lastPage) => (lastPage.hasMore ? lastPage.page + 1 : undefined),
      keepPreviousData: true,
      staleTime: 60_000,
      cacheTime: 5 * 60_000
    }
  );

  // Płaskie dane i metadane
  const pages = data?.pages ?? [];
  const vehicles: Vehicle[] = pages.flatMap((page) => page.vehicles);
  const total = pages[0]?.total ?? 0;
  const page = pages.length;
  const totalPages = pages[0]?.totalPages ?? 1;
  const hasMore = hasNextPage ?? false;
  const loading = isLoading && page === 1;
  const loadingMore = isFetchingNextPage;

  // Funkcja ładowania kolejnej strony
  const loadMore = useCallback(() => {
    if (hasMore && !loadingMore) {
      fetchNextPage();
    }
  }, [hasMore, loadingMore, fetchNextPage]);

  return {
    vehicles,
    total,
    page,
    totalPages,
    filters,
    setFilters,
    loading,
    error: error instanceof Error ? error.message : null,
    hasMore,
    loadMore
  };
}
