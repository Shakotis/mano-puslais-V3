/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow cross-origin requests from specific IP addresses during development
  allowedDevOrigins: [
    '10.5.0.2',
    // Add other IP addresses or origins as needed
    // '192.168.1.100',
    // 'localhost',
  ],
};

module.exports = nextConfig;
