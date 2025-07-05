'use client';

import { useState, useEffect, useCallback } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import type {
  Vehicle,
  VehicleFilters,
  UseVehicleSearchReturn,
  ApiResponse,
} from '@/types/automotive';
import { vehicleApi } from '@/lib/api';
import { debounce } from '@/lib/utils';

export function useVehicleSearch(initialFilters: VehicleFilters = {}): UseVehicleSearchReturn {
  const [filters, setFilters] = useState<VehicleFilters>(initialFilters);
  const [debouncedFilters, setDebouncedFilters] = useState<VehicleFilters>(initialFilters);

  const debouncedSetFilters = useCallback(
    debounce((newFilters: VehicleFilters) => {
      setDebouncedFilters(newFilters);
    }, 500),
    []
  );

  useEffect(() => {
    debouncedSetFilters(filters);
  }, [filters, debouncedSetFilters]);

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery<ApiResponse, Error>({
    // POPRAWKA: Prawidłowa składnia dla @tanstack/react-query v5
    queryKey: ['vehicles', debouncedFilters],
    queryFn: ({ pageParam }) => vehicleApi.getAll({ ...debouncedFilters, page: pageParam }),
    initialPageParam: 1, // To jest parametr początkowy dla queryFn, a nie opcja hooka
    getNextPageParam: (lastPage) => (lastPage.hasMore ? lastPage.page + 1 : undefined),
  });

  // Teraz TypeScript poprawnie wywnioskuje typy z `ApiResponse`
  const vehicles: Vehicle[] = data?.pages.flatMap((page) => page.vehicles) ?? [];
  const total: number = data?.pages[0]?.total ?? 0;
  const page: number = data?.pages.length ?? 1;
  const totalPages: number = data?.pages[0]?.totalPages ?? 1;

  return {
    vehicles,
    loading: isLoading,
    error: error ? error.message : null,
    total,
    page,
    totalPages,
    filters,
    setFilters,
    loadMore: fetchNextPage,
    hasMore: !!hasNextPage,
  };
}
