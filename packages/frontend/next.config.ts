import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: process.env.BACKEND_API_URL || 'localhost',
        port: process.env.BACKEND_API_PORT || '5000',
        pathname: '/public/**',
      },
    ],
  },
};

export default nextConfig;
