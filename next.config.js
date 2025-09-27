/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export for Netlify
  output: 'export',
  
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
  
  // Base path and asset prefix (leave empty for root domain)
  basePath: '',
  assetPrefix: '',
  
  // Trailing slash
  trailingSlash: false,
  
  // Allow cross-origin requests from specific IP addresses during development
  allowedDevOrigins: [
    '10.5.0.2',
    // Add other IP addresses or origins as needed
    // '192.168.1.100',
    // 'localhost',
  ],
  
  // ESLint configuration for build process
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  
  // TypeScript configuration
  typescript: {
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: false,
  },
};

module.exports = nextConfig;
