import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  compress: true,
  experimental: {
    optimizePackageImports: ['react', 'react-dom'],
  },
  async redirects() {
    return [
      // Legacy /contact page (still indexed by Google) → /book-now.
      // Permanent redirect forwards ranking signal and visitors.
      {
        source: '/contact',
        destination: '/en/book-now',
        permanent: true,
      },
      {
        source: '/:lang(en|ro|hu)/contact',
        destination: '/:lang/book-now',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
