/** @type {import('next').NextConfig} */
const nextConfig = {
  // Performance optimizations inspired by CAR FOR YOU
  experimental: {
    appDir: true,
    typedRoutes: true,
    serverComponentsExternalPackages: ['mysql2'],
  },

  // Image optimization for vehicle photos
  images: {
    formats: ['image/webp', 'image/avif'],
    domains: [
      'localhost',
      'motoauto.ch',
      'cdn.motoauto.ch',
      // Add dealer image domains
      'static.carforyou.ch', // For migration from CAR FOR YOU assets
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Bundle analyzer for optimization (CAR FOR YOU approach)
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Optimize bundle size for automotive components
    config.optimization.splitChunks = {
      chunks: 'all',
      cacheGroups: {
        default: false,
        vendors: false,
        // Vendor chunks
        vendor: {
          name: 'vendor',
          chunks: 'all',
          test: /node_modules/,
          priority: 20,
        },
        // Automotive-specific components
        automotive: {
          name: 'automotive',
          chunks: 'all',
          test: /[\\/]src[\\/](components|hooks)[\\/](automotive|vehicle)/,
          priority: 30,
        },
        // Common UI components
        common: {
          name: 'common',
          chunks: 'all',
          test: /[\\/]src[\\/]components[\\/]common/,
          priority: 25,
        },
      },
    };

    return config;
  },

  // Compression and headers for better performance
  compress: true,
  poweredByHeader: false,

  // Environment variables (based on CAR FOR YOU configuration pattern)
  env: {
    NEXT_PUBLIC_APP_NAME: 'MotoAuto.ch',
    NEXT_PUBLIC_APP_VERSION: process.env.npm_package_version,
    NEXT_PUBLIC_ENVIRONMENT: process.env.NODE_ENV,
  },

  // Redirects for SEO (au
const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

module.exports = withNextIntl({
  env: {
    DEFAULT_LOCALE: 'pl',
    SUPPORTED_LOCALES: 'pl,de,fr,it'
  },
  images: { formats: ['image/webp', 'image/avif'] }
});

