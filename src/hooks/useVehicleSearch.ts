'use client';

import { useState, useEffect, useCallback } from 'react';
import { useQuery } from 'react-query';
import type { Vehicle, VehicleFilters, UseVehicleSearchReturn } from '@/types/automotive';
import { vehicleApi } from '@/lib/api';
import { debounce } from '@/lib/utils';

export function useVehicleSearch(initialFilters: VehicleFilters = {}): UseVehicleSearchReturn {
  const [filters, setFilters] = useState<VehicleFilters>(initialFilters);
  const [debouncedFilters, setDebouncedFilters] = useState<VehicleFilters>(initialFilters);

  // Debounce filter changes to avoid excessive API calls
  const debouncedSetFilters = useCallback(
    debounce((newFilters: VehicleFilters) => {
      setDebouncedFilters(newFilters);
    }, 300),
    []
  );

  useEffect(() => {
    debouncedSetFilters(filters);
  }, [filters, debouncedSetFilters]);

  const {
    data,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['vehicles', debouncedFilters],
    queryFn: () => vehicleApi.getAll(debouncedFilters),
    keepPreviousData: true,
    staleTime: 30000, // 30 seconds
  });

  const vehicles = data?.vehicles || [];
  const hasMore = data?.hasMore || false;

  const loadMore = useCallback(() => {
    if (hasMore && !isLoading) {
      // Implement pagination logic here
      const nextPage = (data?.page || 0) + 1;
      setFilters(prev => ({ ...prev, page: nextPage }));
    }
  }, [hasMore, isLoading, data?.page]);

  return {
    vehicles,
    filters,
    setFilters,
    isLoading,
    error: error as Error | null,
    hasMore,
    loadMore,
  };
}
