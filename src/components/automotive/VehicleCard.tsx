'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  HeartIcon, 
  MapPinIcon, 
  CalendarIcon,
  ClockIcon,
  EyeIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import type { VehicleCardProps, Vehicle } from '@/types/automotive';
import { AuctionTimer } from './AuctionTimer';
import { formatPrice, formatMileage } from '@/lib/utils';
import { cn } from '@/lib/utils';

export function VehicleCard({ 
  vehicle, 
  showAuctionInfo = true, 
  compact = false,
  onClick 
}: VehicleCardProps) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [imageError, setImageError] = useState(false);

  const primaryImage = vehicle.images.find(img => img.isPrimary) || vehicle.images[0];
  const hasAuction = vehicle.auction && showAuctionInfo;
  
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorited(!isFavorited);
  };

  const handleCardClick = () => {
    if (onClick) {
      onClick(vehicle);
    }
  };

  const getConditionColor = (condition: Vehicle['condition']) => {
    const colors = {
      excellent: 'text-condition-excellent bg-green-50 border-green-200',
      good: 'text-condition-good bg-cyan-50 border-cyan-200',
      fair: 'text-condition-fair bg-orange-50 border-orange-200',
      poor: 'text-condition-poor bg-red-50 border-red-200',
    };
    return colors[condition];
  };

  const getAuctionStatusColor = (status: string) => {
    const colors = {
      live: 'text-auction-live bg-red-50 border-red-200',
      ending: 'text-auction-ending bg-amber-50 border-amber-200',
      ended: 'text-auction-ended bg-gray-50 border-gray-200',
      upcoming: 'text-auction-upcoming bg-green-50 border-green-200',
    };
    retur
