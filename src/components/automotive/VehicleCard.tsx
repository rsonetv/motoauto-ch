// src/components/automotive/VehicleCard.tsx
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { MapPin, Calendar, Eye, Heart } from 'lucide-react';
import { VehicleCardProps } from '@/types/automotive';

export function VehicleCard({
  vehicle,
  showFavorite = true,
  onFavoriteClick,
  className = ''
}: VehicleCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    if (onFavoriteClick) onFavoriteClick(vehicle.id);
  };

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('pl-CH', {
      style: 'currency',
      currency: 'CHF',
      minimumFractionDigits: 0
    }).format(price);

  const formatMileage = (mileage?: number) =>
    mileage != null
      ? new Intl.NumberFormat('pl-CH').format(mileage) + ' km'
      : 'Brak danych';

  const getStatusClasses = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'sold':
        return 'bg-red-100 text-red-800';
      case 'expired':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const mainImage =
    vehicle.images && vehicle.images.length > 0
      ? vehicle.images[0]
      : '/images/no-image-placeholder.jpg';

  return (
    <Card className={`auction-card group cursor-pointer ${className}`}>
      <Link
        href={{
          pathname: '/listings/[id]',
          query: { id: vehicle.id.toString() }
        }}
      >
        <CardHeader className="p-0 relative">
          <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg">
            <Image
              src={imageError ? '/images/no-image-placeholder.jpg' : mainImage}
              alt={vehicle.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              onError={() => setImageError(true)}
            />

            {/* Status badge */}
            <div className="absolute top-3 left-3">
              <Badge className={getStatusClasses(vehicle.status)}>
                {vehicle.status === 'active'
                  ? 'Aktywne'
                  : vehicle.status === 'sold'
                  ? 'Sprzedane'
                  : vehicle.status === 'expired'
                  ? 'Wygasłe'
                  : vehicle.status}
              </Badge>
            </div>

            {/* Featured badge */}
            {vehicle.featured && (
              <div className="absolute top-3 right-3">
                <Badge className="bg-yellow-100 text-yellow-800">
                  Wyróżnione
                </Badge>
              </div>
            )}

            {/* Favorite button */}
            {showFavorite && (
              <button
                onClick={handleFavoriteClick}
                className="absolute bottom-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
              >
                <Heart
                  className={`w-4 h-4 ${
                    isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'
                  }`}
                />
              </button>
            )}

            {/* Views counter */}
            <div className="absolute bottom-3 left-3 flex items-center space-x-1 bg-white/80 backdrop-blur-sm rounded-full px-2 py-1">
              <Eye className="w-3 h-3 text-gray-600" />
              <span className="text-xs text-gray-600">
                {vehicle.views ?? 0}
              </span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-4">
          {/* Title & Price */}
          <div className="mb-3">
            <h3 className="font-semibold text-lg leading-tight mb-1 group-hover:text-primary transition-colors">
              {vehicle.title}
            </h3>
            <div className="text-2xl font-bold text-primary">
              {formatPrice(vehicle.price)}
            </div>
          </div>

          {/* Details grid */}
          <div className="grid grid-cols-2 gap-2 mb-3 text-sm text-gray-600">
            {vehicle.year && (
              <div className="flex items-center space-x-1">
                <Calendar className="w-3 h-3" />
                <span>{vehicle.year}</span>
              </div>
            )}
            {vehicle.mileage != null && (
              <div className="flex items-center space-x-1">
                <span>{formatMileage(vehicle.mileage)}</span>
              </div>
            )}
            {vehicle.fuelType && (
              <div>
                <span className="capitalize">{vehicle.fuelType}</span>
              </div>
            )}
            {vehicle.transmission && (
              <div>
                <span className="capitalize">{vehicle.transmission}</span>
              </div>
            )}
          </div>

          {/* Location & date */}
          <div className="flex items-center space-x-1 text-sm text-gray-500 mb-2">
            <MapPin className="w-3 h-3" />
            <span>{vehicle.location}</span>
          </div>

          {/* Category & created date */}
          <div className="flex justify-between items-center">
            <Badge variant="outline" className="text-xs">
              {vehicle.category
                .split('-')
                .map(w => w[0]?.toUpperCase() + w.slice(1))
                .join(' ')}
            </Badge>
            <span className="text-xs text-gray-500">
              {new Date(vehicle.createdAt).toLocaleDateString('pl-PL')}
            </span>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
