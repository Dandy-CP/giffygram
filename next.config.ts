import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media0.giphy.com',
      },
      {
        protocol: 'https',
        hostname: 'media1.giphy.com',
      },
      {
        protocol: 'https',
        hostname: 'media2.giphy.com',
      },
      {
        protocol: 'https',
        hostname: 'media3.giphy.com',
      },
      {
        protocol: 'https',
        hostname: 'media4.giphy.com',
      },
      {
        protocol: 'https',
        hostname: 'media5.giphy.com',
      },
      {
        protocol: 'https',
        hostname: 'media6.giphy.com',
      },
      {
        protocol: 'https',
        hostname: 'media7.giphy.com',
      },
      {
        protocol: 'https',
        hostname: 'media8.giphy.com',
      },
      {
        protocol: 'https',
        hostname: 'media9.giphy.com',
      },
      {
        protocol: 'https',
        hostname: 'media10.giphy.com',
      },
    ],
  },
};

export default nextConfig;
