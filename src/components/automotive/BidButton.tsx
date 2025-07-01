'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CurrencyDollarIcon, 
  ArrowUpIcon,
  ExclamationTriangleIcon 
} from '@heroicons/react/24/outline';
import type { BidButtonProps } from '@/types/automotive';
import { formatPrice } from '@/lib/utils';
import { cn } from '@/lib/utils';

export function BidButton({ auction, onBid, disabled = false, isLoading = false }: BidButtonProps) {
  const [bidAmount, setBidAmount] = useState<number>(auction.currentBid + 100);
  const [showCustomBid, setShowCustomBid] = useState(false);
  const [customAmount, setCustomAmount] = useState<string>('');

  const minBidAmount = auction.currentBid + 50; // Minimum increment
  const quickBidAmounts = [
    auction.currentBid + 100,
    auction.currentBid + 250,
    auction.currentBid + 500,
    auction.currentBid + 1000,
  ];

  const handleQuickBid = (amount: number) => {
    setBidAmount(amount);
    onBid(amount);
  };

  const handleCustomBid = () => {
    const amount = parseInt(customAmount.replace(/[^0-9]/g, ''));
    if (amount >= minBidAmount) {
      onBid(amount);
      setShowCustomBid(false);
      setCustomAmount('');
    }
  };

  const isValidCustomBid = () => {
    const amount = parseInt(customAmount.replace(/[^0-9]/g, ''));
    return amount >= minBidAmount;
  };

  if (auction.status === 'ended') {
    return (
      <div className="text-center py-4">
        <span className="text-gray-500 font-medium">Aukcja zakończona</span>
      </div>
    );
  }

  if (auction.status === 'upcoming') {
    return (
      <div className="text-center py-4">
        <span className="text-auction-upcoming font-medium">Aukcja wkrótce</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Current Bid Display */}
      <div className="text-center">
        <div className="text-sm text-gray-600">Aktualna najwyższa oferta</div>
        <div className="text-2xl font-bold text-primary-600">
          {formatPrice(auction.currentBid, 'CHF')}
        </div>
        <div className="text-xs text-gray-500">
          Minimalna oferta: {formatPrice(minBidAmount, 'CHF')}
        </div>
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
              index === 0 && 'ring-2 ring-primary-300' // Highlight default bid
            )}
            whileTap={{ scale: 0.98 }}
            whileHover={{ scale: disabled ? 1 : 1.02 }}
          >
            <ArrowUpIcon className="w-4 h-4" />
            <span>{formatPrice(amount, 'CHF')}</span>
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-primary-600/80 rounded-lg">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </motion.button>
        ))}
      </div>

      {/* Custom Bid */}
      <div className="space-y-2">
        {!showCustomBid ? (
          <button
            onClick={() => setShowCustomBid(true)}
            className="w-full py-2 text-sm text-primary-600 hover:text-primary-700 font-medium border border-primary-200 hover:border-primary-300 rounded-lg transition-colors duration-200"
          >
            Inna kwota
          </button>
        ) : (
          <div className="space-y-2">
            <div className="relative">
              <input
                type="text"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                placeholder="Wprowadź kwotę"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                CHF
              </span>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={handleCustomBid}
                disabled={!isValidCustomBid() || disabled || isLoading}
                className="flex-1 py-2 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 text-white font-semibold rounded-lg transition-colors duration-200"
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
                <span>Minimalna oferta to {formatPrice(minBidAmount, 'CHF')}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Buy Now Option */}
      {auction.buyNowPrice && (
        <motion.button
          onClick={() => onBid(auction.buyNowPrice!)}
          disabled={disabled || isLoading}
          className="w-full py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white font-bold rounded-lg transition-colors duration-200"
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center justify-center gap-2">
            <CurrencyDollarIcon className="w-5 h-5" />
            <span>Kup Teraz - {formatPrice(auction.buyNowPrice, 'CHF')}</span>
          </div>
        </motion.button>
      )}
    </div>
  );
}
