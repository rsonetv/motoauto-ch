const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/hooks/**/*.{js,ts,jsx,tsx}',
    './src/lib/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      // CAR FOR YOU inspired color palette adapted for MotoAuto.ch
      colors: {
        // Primary brand colors (Swiss automotive theme)
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6', // Main brand blue
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        // Secondary colors for auction features
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        // Auction status colors
        auction: {
          live: '#ef4444',      // Red for live auctions
          ending: '#f59e0b',    // Amber for ending soon
          ended: '#6b7280',     // Gray for ended
          upcoming: '#10b981',  // Green for upcoming
        },
        // Vehicle condition colors
        condition: {
          excellent: '#059669', // Green
          good: '#0891b2',      // Cyan  
          fair: '#d97706',      // Orange
          poor: '#dc2626',      // Red
        },
        // Success, warning, error states
        success: {
          50: '#f0fdf4',
          500: '#22c55e',
          600: '#16a34a',
        },
        warning: {
          50: '#fffbeb',
          500: '#f59e0b',
          600: '#d97706',
        },
        error: {
          50: '#fef2f2',
          500: '#ef4444',
          600: '#dc2626',
        },
      },
      
      // Typography (CAR FOR YOU approach)
      fontFamily: {
        sans: ['Inter', ...fontFamily.sans],
        mono: ['JetBrains Mono', ...fontFamily.mono],
      },
      
      // Spacing for automotive layout
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      
      // Border radius for automotive design
      borderRadius: {
        '4xl': '2rem',
      },
      
      // Box shadows for card elevation
      boxShadow: {
        'auction': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'vehicle-card': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'modal': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      },
      
      // Animation for auction timers and bid buttons
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-gentle': 'bounce 2s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bid-pulse': 'bidPulse 0.6s ease-in-out',
      },
      
      // Custom keyframes for automotive interactions
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        bidPulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
      },
      
      // Grid templates for vehicle listings
      gridTemplateColumns: {
        'auto-fit-300': 'repeat(auto-fit, minmax(300px, 1fr))',
        'auto-fit-350': 'repeat(auto-fit, minmax(350px, 1fr))',
      },
      
      // Container sizes for automotive content
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      
      // Z-index scale for modals and overlays
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    
    // Custom plugin for automotive-specific utilities
    function({ addUtilities, addComponents, theme }) {
      const newUtilities = {
        // Auction timer utilities
        '.timer-digit': {
          fontFamily: theme('fontFamily.mono'),
          fontWeight: '700',
          letterSpacing: '-0.025em',
        },
        
        // Vehicle price formatting
        '.price-display': {
          fontWeight: '600',
          letterSpacing: '-0.025em',
          color: theme('colors.primary.600'),
        },
        
        // Bid button states
        '.bid-button': {
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: theme('boxShadow.lg'),
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        },
        
        // Vehicle status badges
        '.status-badge': {
          display: 'inline-flex',
          alignItems: 'center',
          padding: '0.25rem 0.75rem',
          borderRadius: theme('borderRadius.full'),
          fontSize: theme('fontSize.sm'),
          fontWeight: '500',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        },
      };

      const newComponents = {
        // Vehicle card component
        '.vehicle-card': {
          backgroundColor: theme('colors.white'),
          borderRadius: theme('borderRadius.xl'),
          boxShadow: theme('boxShadow.vehicle-card'),
          overflow: 'hidden',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          },
        },
        
        // Auction card component
        '.auction-card': {
          backgroundColor: theme('colors.white'),
          border: `2px solid ${theme('colors.auction.live')}`,
          borderRadius: theme('borderRadius.xl'),
          boxShadow: theme('boxShadow.auction'),
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            height: '4px',
            background: `linear-gradient(90deg, ${theme('colors.auction.live')}, ${theme('colors.auction.ending')})`,
          },
        },
      };

      addUtilities(newUtilities);
      addComponents(newComponents);
    },
  ],
};
