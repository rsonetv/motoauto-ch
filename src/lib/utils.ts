import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility function for combining Tailwind classes (from CAR FOR YOU patterns)
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Price formatting for Swiss market
export function formatPrice(price: number, currency: 'CHF' | 'EUR' = 'CHF'): string {
  return new Intl.NumberFormat('de-CH', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(price);
}

// Mileage formatting
export function formatMileage(mileage: number): string {
  return new Intl.NumberFormat('de-CH').format(mileage) + ' km';
}

// Date formatting for auction times
export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('pl-PL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
}

// Relative time formatting (e.g., "2 hours ago")
export function formatRelativeTime(date: string | Date): string {
  const now = new Date();
  const past = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  if (diffInSeconds < 60) return 'Przed chwilą';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} min temu`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} godz. temu`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} dni temu`;
  
  return formatDate(date);
}

// Swiss phone number validation
export function isValidSwissPhone(phone: string): boolean {
  const swissPhoneRegex = /^(\+41|0041|0)([1-9]\d{8})$/;
  return swissPhoneRegex.test(phone.replace(/\s/g, ''));
}

// Email validation
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Vehicle title generation
expo
