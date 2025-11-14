import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Set basePath for production deployment under /next path
  // Use NEXT_PUBLIC_BASE_PATH env variable, or default to '/next' for production
  // Set NEXT_PUBLIC_BASE_PATH='' in development to disable basePath
  basePath: process.env.NEXT_PUBLIC_BASE_PATH !== undefined 
    ? process.env.NEXT_PUBLIC_BASE_PATH 
    : (process.env.NODE_ENV === 'production' ? '/next' : ''),
  // Ensure assetPrefix matches basePath for proper asset loading
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH !== undefined 
    ? process.env.NEXT_PUBLIC_BASE_PATH 
    : (process.env.NODE_ENV === 'production' ? '/next' : ''),
};

export default nextConfig;
