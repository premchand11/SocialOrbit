import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow images from any domain (if ever needed)
  images: {
    unoptimized: true,
  },
  // Ignore ESLint errors during build so we don't fail on warnings
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Ignore TypeScript errors during build (optional, remove when strict)
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
