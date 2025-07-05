// src/components/automotive/VehicleCard.tsx

import React from 'react';
import type { VehicleCardProps } from '@/types/automotive'; // Upewnij się, że ten typ jest poprawnie zdefiniowany
import { formatPrice } from '@/lib/utils'; // Upewnij się, że ta funkcja istnieje
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export function VehicleCard({ vehicle }: VehicleCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <Link href={{ pathname: `/listings/${vehicle.id}` }}>
        <div className="aspect-video bg-gray-200">
          {vehicle.images?.[0] && (
            <img src={vehicle.images[0]} alt={vehicle.title} className="w-full h-full object-cover" />
          )}
        </div>
        <CardHeader>
          <CardTitle>{vehicle.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xl font-bold">{formatPrice(vehicle.price)}</p>
          <div className="flex justify-between text-sm text-gray-500 mt-2">
            <span>{vehicle.location}</span>
            {/* POPRAWKA: Użycie snake_case */}
            {vehicle.fuel_type && (
                <span className="capitalize">{vehicle.fuel_type}</span>
            )}
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
