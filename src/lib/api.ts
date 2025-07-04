import { supabase } from './supabase';
import type { Vehicle, VehicleFilters, ApiResponse, GetAllOptions } from '@/types/automotive';

export interface VehicleApiResponse {
  vehicles: Vehicle[];
  total: number;
  page: number;
  totalPages: number;
  hasMore: boolean;
}

export const vehicleApi = {
  async getAll(options: GetAllOptions = {}): Promise<VehicleApiResponse> {
    const {
      category,
      priceMin,
      priceMax,
      yearMin,
      yearMax,
      mileageMax,
      fuelType,
      transmission,
      location,
      condition,
      page = 1,
      limit = 12,
      sortBy = 'created_at',
      sortOrder = 'desc',
      search
    } = options;

    try {
      let query = supabase
        .from('listings')
        .select('*', { count: 'exact' });

      // Filtry
      if (category) query = query.eq('category', category);
      if (priceMin !== undefined) query = query.gte('price', priceMin);
      if (priceMax !== undefined) query = query.lte('price', priceMax);
      if (yearMin !== undefined) query = query.gte('year', yearMin);
      if (yearMax !== undefined) query = query.lte('year', yearMax);
      if (mileageMax !== undefined) query = query.lte('mileage', mileageMax);
      if (fuelType) query = query.eq('fuel_type', fuelType);
      if (transmission) query = query.eq('transmission', transmission);
      if (location) query = query.ilike('location', `%${location}%`);
      if (condition) query = query.eq('condition', condition);
      if (search) query = query.ilike('title', `%${search}%`);

      query = query.eq('status', 'active');
      query = query.order(sortBy, { ascending: sortOrder === 'asc' });

      // Paginacja
      const from = (page - 1) * limit;
      const to = from + limit - 1;
      query = query.range(from, to);

      const { data, error, count } = await query;

      if (error) throw error;

      const totalPages = Math.ceil((count || 0) / limit);
      const hasMore = page < totalPages;

      return {
        vehicles: data || [],
        total: count || 0,
        page,
        totalPages,
        hasMore
      };
    } catch (error) {
      console.error('VehicleApi.getAll error:', error);
      throw error;
    }
  },

  async getById(id: number): Promise<Vehicle | null> {
    try {
      const { data, error } = await supabase
        .from('listings')
        .select('*')
        .eq('id', id)
        .single();

      if (error) return null;
      return data;
    } catch (error) {
      console.error('VehicleApi.getById error:', error);
      return null;
    }
  }
};
