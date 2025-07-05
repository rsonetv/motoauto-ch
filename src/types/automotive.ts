// src/types/automotive.ts
import type { Listing } from "@/lib/supabase";

export type Vehicle = Listing;
export type Auction = Listing;

// Definicja propsów dla VehicleCard
export interface VehicleCardProps {
  vehicle: Vehicle;
  className?: string;
  showFavorite?: boolean;
  onFavoriteClick?: (id: number) => void;
}

// Definicja propsów dla AuctionTimer
export interface AuctionTimerProps {
  endTime: string;
  className?: string;
  onTimeUp?: () => void;
}

// Definicja propsów dla BidButton
export interface BidButtonProps {
  auction: Auction;
}

export type VehicleStatus = 'active' | 'sold' | 'expired' | 'pending';

export interface VehicleFilters {
  page?: number;
  limit?: number;
  category?: string;
  priceMin?: number;
  priceMax?: number;
}

export interface ApiResponse {
  vehicles: Vehicle[];
  total: number;
  page: number;
  totalPages: number;
  hasMore: boolean;
}

export interface UseVehicleSearchReturn {
  vehicles: Vehicle[];
  loading: boolean;
  error: string | null;
  total: number;
  page: number;
  totalPages: number;
  filters: VehicleFilters;
  setFilters: React.Dispatch<React.SetStateAction<VehicleFilters>>;
  loadMore: () => void;
  hasMore: boolean;
}
