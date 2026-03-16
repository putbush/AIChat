import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000', // указываем порт
        pathname: '/public/**', // разрешаем все пути под /uploads
      },
    ],
  },
};

export default nextConfig;
