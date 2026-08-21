/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  poweredByHeader: false,
  compress: true,
  experimental: {
    optimizePackageImports: ['@prisma/client', 'bcryptjs', 'next-auth'],
  },
};

export default nextConfig;

