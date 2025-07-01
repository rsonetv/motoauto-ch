// Core vehicle types adapted from CAR FOR YOU patterns
export interface Vehicle {
  id: string;
  title: string;
  brand: string;
  model: string;
  year: number;
  mileage: number;
  price: number;
  currency: 'CHF' | 'EUR';
  fuelType: 'Benzyna' | 'Diesel' | 'EV' | 'Hybryda';
  transmission: 'Manual' | 'Automatic';
  bodyType: 'Sedan' | 'Hatchback' | 'SUV' | 'Coupe' | 'Convertible' | 'Wagon';
  condition: 'excellent' | 'good' | 'fair' | 'poor';
  location: {
    city: string;
    canton: string;
    country: string;
  };
  images: VehicleImage[];
  specifications: VehicleSpecs;
  seller: Seller;
  auction?: AuctionDetails;
  createdAt: string;
  updatedAt: string;
}

export interface Motorcycle extends Omit<Vehicle, 'bodyType'> {
  bodyType: 'Sport' | 'Cruiser' | 'Touring' | 'Adventure' | 'Naked' | 'Scooter';
  engineSize: number; // cm³
  licenseCategory: 'A1' | 'A2' | 'A';
}

export interface VehicleImage {
  id: string;
  url: string;
  alt: string;
  isPrimary: boolean;
  order: number;
}

export interface VehicleSpecs {
  engineSize?: number;
  power?: number;
  torque?: number;
  acceleration?: number;
  topSpeed?: number;
  fuelConsumption?: number;
  co2Emissions?: number;
  doors?: number;
  seats?: number;
  trunkCapacity?: number;
  weight?: number;
  features: string[];
}

export interface Seller {
  id: string;
  type: 'private' | 'dealer';
  name: string;
  rating?: number;
  reviewCount?: number;
  verified: boolean;
  location: {
    city: string;
    canton: string;
  };
  contact: {
    phone?: string;
    email: string;
  };
}

// Auction types inspired by CAR FOR YOU's marketplace
export interface AuctionDetails {
  id: string;
  type: 'live' | 'blind' | 'reserve' | 'buy-now';
  status: 'upcoming' | 'live' | 'ending' | 'ended';
  startingPrice: number;
  currentBid: number;
  reservePrice?: number;
  buyNowPrice?: number;
  startTime: string;
  endTime: string;
  bidCo
