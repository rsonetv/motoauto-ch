'use client';

import React, { useState, useEffect } from 'react';
import { AuctionTimerProps } from '@/types/automotive';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function AuctionTimer({ endDate, onTimeUp, className = '' }: AuctionTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const target = new Date(endDate).getTime();
      const difference = target - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
        setIsExpired(false);
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsExpired(true);
        if (onTimeUp) {
          onTimeUp();
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate, onTimeUp]);

  const formatTimeUnit = (value: number, unit: string) => {
    return (
      <div className="flex flex-col items-center">
        <div className="text-2xl font-bold text-primary">{value.toString().padStart(2, '0')}</div>
        <div className="text-xs text-gray-500 uppercase">{unit}</div>
      </div>
    );
  };

  if (isExpired) {
    return (
      <div className={`text-center p-4 bg-red-50 border border-red-200 rounded-lg ${className}`}>
        <div className="text-red-600 font-semibold">Aukcja zakończona</div>
      </div>
    );
  }

  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-4 ${className}`}>
      <div className="text-center mb-2">
        <div className="text-sm text-gray-600">Pozostały czas:</div>
      </div>
      <div className="flex justify-center space-x-4">
        {formatTimeUnit(timeLeft.days, 'dni')}
        <div className="text-2xl font-bold text-gray-400">:</div>
        {formatTimeUnit(timeLeft.hours, 'godz')}
        <div className="text-2xl font-bold text-gray-400">:</div>
        {formatTimeUnit(timeLeft.minutes, 'min')}
        <div className="text-2xl font-bold text-gray-400">:</div>
        {formatTimeUnit(timeLeft.seconds, 'sek')}
      </div>
    </div>
  );
}
