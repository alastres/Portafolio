import type { NextConfig } from 'next';

const YEAR = 60 * 60 * 24 * 365;

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    // Las imágenes optimizadas se guardan un año: los archivos de public/ no cambian de nombre.
    minimumCacheTTL: YEAR,
    deviceSizes: [360, 640, 828, 1080, 1280, 1600, 1920],
    imageSizes: [64, 128, 256, 384, 520],
    qualities: [40, 50, 75, 90],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion', 'react-icons', 'radix-ui'],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
        ],
      },
      {
        // Imágenes y documentos estáticos: cache largo en navegador y CDN.
        source: '/images/(.*)',
        headers: [{ key: 'Cache-Control', value: `public, max-age=${YEAR}, immutable` }],
      },
      {
        source: '/(.*)\\.pdf',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' }],
      },
    ];
  },
};

export default nextConfig;
