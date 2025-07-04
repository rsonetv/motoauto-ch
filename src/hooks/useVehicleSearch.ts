'use client';

import { useState, useEffect, useCallback } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import type {
  Vehicle,
  VehicleFilters,
  UseVehicleSearchReturn
} from '@/types/automotive';
import { vehicleApi } from '@/lib/api';
import { debounce } from '@/lib/utils';

export function useVehicleSearch(
  initialFilters: VehicleFilters = {}
): UseVehicleSearchReturn {
  const [filters, setFilters] = useState<VehicleFilters>(initialFilters);
  const [debouncedFilters, setDebouncedFilters] = useState<VehicleFilters>(initialFilters);

  const debouncedSet = useCallback(
    debounce((f: VehicleFilters) => setDebouncedFilters(f), 300),
    []
  );

  useEffect(() => {
    debouncedSet(filters);
  }, [filters, debouncedSet]);

  const {
    data,
    isLoading,
    error,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage
  } = useInfiniteQuery({
    queryKey: ['vehicles', debouncedFilters],
    queryFn: ({ pageParam = 1 }) =>
      vehicleApi.getAll({ ...debouncedFilters, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage: any) =>
      lastPage.hasMore ? lastPage.page + 1 : undefined,
    keepPreviousData: true,
    staleTime: 60_000,
    cacheTime: 5 * 60_000
  });

  const vehicles: Vehicle[] = data?.pages.flatMap((page: any) => page.vehicles) || [];
  const total = data?.pages[0]?.total || 0;
  const page = data?.pages.length || 1;
  const totalPages = data?.pages[0]?.totalPages || 1;
  const hasMore = hasNextPage || false;
  const loading = isLoading && page === 1;
  const loadingMore = isFetchingNextPage;

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
