// src/lib/api.ts
import type { Vehicle, VehicleFilters, ApiResponse } from '@/types/automotive';
import { supabase } from './supabase';

export const vehicleApi = {
  async getAll(filters: VehicleFilters = {}): Promise<ApiResponse> {
    const { page = 1, limit = 12 } = filters;
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabase.from('listings').select('*', { count: 'exact' });

    // Tutaj można dodać logikę filtrowania na podstawie `filters`

    query = query.range(from, to);
    const { data, error, count } = await query;

    if (error) {
      console.error('Błąd pobierania pojazdów:', error);
      throw new Error('Nie udało się pobrać pojazdów');
    }

    const totalPages = Math.ceil((count || 0) / limit);
    const hasMore = page < totalPages;

    return {
      vehicles: (data as Vehicle[]) || [],
      total: count || 0,
      page,
      totalPages,
      hasMore,
    };
  },
};
