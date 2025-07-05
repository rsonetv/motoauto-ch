'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  CurrencyDollarIcon,
  ArrowUpIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import type { Auction, VehicleStatus } from '@/types/automotive';
import { formatPrice, cn } from '@/lib/utils';

export interface BidButtonProps {
  auction: Auction;
  onBid: (amount: number) => void;
  disabled?: boolean;
  isLoading?: boolean;
}

export function BidButton({
  auction,
  onBid,
  disabled = false,
  isLoading = false
}: BidButtonProps) {
  // Zapewnij, że currentBid jest liczbą
 const currentBid = typeof auction.current_bid === 'number' ? auction.current_bid : 0;
  const minBidAmount = currentBid + 1;
  const [bidAmount, setBidAmount] = useState(currentBid + 100);
  const [showCustomBid, setShowCustomBid] = useState(false);
  const [customAmount, setCustomAmount] = useState('');

  const quickBidAmounts = [
    currentBid + 100,
    currentBid + 250,
    currentBid + 500,
    currentBid + 1000,
  ];

  const handleQuickBid = (amount: number) => {
    setBidAmount(amount);
    onBid(amount);
  };

  const handleCustomBid = () => {
    const amount = parseInt(customAmount.replace(/[^0-9]/g, ''), 10);
    if (!isNaN(amount) && amount >= minBidAmount) {
      onBid(amount);
      setShowCustomBid(false);
      setCustomAmount('');
    }
  };

  const isValidCustomBid = () => {
    const amount = parseInt(customAmount.replace(/[^0-9]/g, ''), 10);
    return !isNaN(amount) && amount >= minBidAmount;
  };

  // Obsługa statusu aukcji - poprawka dla enum type
  if (auction.status === 'sold' || auction.status === 'expired') {
    return (
      <div className="text-center py-4">
        <p className="text-gray-600 font-medium">
          {auction.status === 'sold' ? 'Aukcja zakończona' : 'Aukcja wygasła'}
        </p>
      </div>
    );
  }

  if (auction.status === 'active') {
    return (
      <div className="text-center py-4">
        <p className="text-gray-600 font-medium">Aukcja wkrótce</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4 bg-white rounded-lg border">
      {/* Current Bid Display */}
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">
          Aktualna najwyższa oferta
        </h3>
        <p className="text-3xl font-bold text-blue-600">
          {formatPrice(currentBid)}
        </p>
        <p className="text-sm text-gray-500 mt-1">
          Minimalna oferta: {formatPrice(minBidAmount)}
        </p>
      </div>

      {/* Quick Bid Buttons */}
      <div className="grid grid-cols-2 gap-2">
        {quickBidAmounts.map((amount, index) => (
          <motion.button
            key={amount}
            onClick={() => handleQuickBid(amount)}
            disabled={disabled || isLoading}
            className={cn(
              'bid-button relative flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-semibold transition-all duration-200',
              'bg-primary-600 hover:bg-primary-700 text-white',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              index === 0 && 'ring-2 ring-primary-300'
            )}
            whileTap={{ scale: 0.98 }}
            whileHover={{ scale: disabled ? 1 : 1.02 }}
          >
            <ArrowUpIcon className="w-4 h-4" />
            {formatPrice(amount)}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              </div>
            )}
          </motion.button>
        ))}
      </div>

      {/* Custom Bid */}
      {!showCustomBid ? (
        <button
          onClick={() => setShowCustomBid(true)}
          className="w-full py-2 text-sm text-primary-600 hover:text-primary-700 font-medium border border-primary-200 hover:border-primary-300 rounded-lg transition-colors duration-200"
        >
          Inna kwota
        </button>
      ) : (
        <div className="space-y-3">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                placeholder="Wprowadź kwotę"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                CHF
              </span>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleCustomBid}
              disabled={!isValidCustomBid() || disabled || isLoading}
              className="flex-1 px-4 py-2 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 text-white font-medium rounded-lg transition-colors duration-200"
            >
              Licytuj
            </button>

            <button
              onClick={() => {
                setShowCustomBid(false);
                setCustomAmount('');
              }}
              className="px-4 py-2 text-gray-600 hover:text-gray-700 border border-gray-300 hover:border-gray-400 rounded-lg transition-colors duration-200"
            >
              Anuluj
            </button>
          </div>

          {customAmount && !isValidCustomBid() && (
            <div className="flex items-center gap-2 text-red-600 text-sm">
              <ExclamationTriangleIcon className="w-4 h-4" />
              Minimalna oferta to {formatPrice(minBidAmount)}
            </div>
          )}
        </div>
      )}

      {/* Buy Now Option */}
      {typeof auction.buy_now_price === 'number' && (
        <motion.button
          onClick={() => onBid(auction.buy_now_price!)}
          disabled={disabled || isLoading}
          className="w-full py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white font-bold rounded-lg transition-colors duration-200"
          whileTap={{ scale: 0.98 }}
        >
          <CurrencyDollarIcon className="w-5 h-5 inline mr-2" />
          Kup Teraz - {formatPrice(auction.buy_now_price)}
        </motion.button>
      )}
    </div>
  );
}
