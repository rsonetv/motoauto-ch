// Base vehicle types
export interface BaseVehicle {
  id: number;
  title: string;
  description?: string;
  price: number;
  images: string[];
  location: string;
  views: number;
  featured: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface VehicleDetails {
  year?: number;
  mileage?: number;
  engineSize?: number;
  fuelType?: string;
  transmission?: string;
  condition?: string;
  bodyType?: string;
  color?: string;
  doors?: number;
  seats?: number;
}

export interface Vehicle extends BaseVehicle, VehicleDetails {
  category: VehicleCategory;
  status: VehicleStatus;
  userId: string;
}

// Enums and types
export type VehicleCategory = 
  | 'samochody-osobowe'
  | 'motocykle'
  | 'samochody-dostawcze'
  | 'ciężarówki'
  | 'przyczepy'
  | 'maszyny-rolnicze'
  | 'pozostałe';

export type VehicleStatus = 
  | 'active'
  | 'sold'
  | 'expired'
  | 'draft';

export type FuelType = 
  | 'benzyna'
  | 'diesel'
  | 'hybrid'
  | 'elektryczny'
  | 'lpg'
  | 'cng';

export type TransmissionType = 
  | 'manualna'
  | 'automatyczna'
  | 'półautomatyczna';

export type VehicleCondition = 
  | 'nowy'
  | 'używany'
  | 'uszkodzony'
  | 'do remontu';

// Auction types
export interface Auction extends Vehicle {
  auctionEndDate: string;
  currentBid?: number;
  bidCount: number;
  reservePrice?: number;
  buyNowPrice?: number;
}

export interface Bid {
  id: number;
  listingId: number;
  userId: string;
  amount: number;
  createdAt: string;
  status: 'active' | 'outbid' | 'winning';
}

// Component props
export interface VehicleCardProps {
  vehicle: Vehicle;
  showFavorite?: boolean;
  onFavoriteClick?: (vehicleId: number) => void;
  className?: string;
}

export interface AuctionTimerProps {
  endDate: string;
  onTimeUp?: () => void;
  className?: string;
}

export interface BidButtonProps {
  auction: Auction;
  onBidPlaced?: (amount: number) => void;
  disabled?: boolean;
  className?: string;
}

// Search and filters
export interface VehicleFilters {
  category?: VehicleCategory;
  priceMin?: number;
  priceMax?: number;
  yearMin?: number;
  yearMax?: number;
  mileageMax?: number;
  fuelType?: FuelType;
  transmission?: TransmissionType;
  location?: string;
  condition?: VehicleCondition;
  page?: number;
  limit?: number;
  sortBy?: 'price' | 'year' | 'mileage' | 'created_at';
  sortOrder?: 'asc' | 'desc';
}

export interface VehicleSearchParams {
  query?: string;
  filters: VehicleFilters;
}

export interface VehicleSearchResult {
  vehicles: Vehicle[];
  total: number;
  page: number;
  totalPages: number;
}

// Hooks return types
export interface UseVehicleSearchReturn {
  vehicles: Vehicle[];
  loading: boolean;
  error: string | null;
  total: number;
  page: number;
  totalPages: number;
  filters: VehicleFilters;
  setFilters: (filters: Partial<VehicleFilters>) => void;
  loadMore: () => void;
  hasMore: boolean;
}

// Form types
export interface VehicleFormData {
  title: string;
  description: string;
  price: number;
  category: VehicleCategory;
  year?: number;
  mileage?: number;
  engineSize?: number;
  fuelType?: FuelType;
  transmission?: TransmissionType;
  condition?: VehicleCondition;
  location: string;
  images: File[];
}

// API types
export interface CreateVehicleRequest extends Omit<VehicleFormData, 'images'> {
  imageUrls: string[];
}

export interface UpdateVehicleRequest extends Partial<CreateVehicleRequest> {
  id: number;
}
