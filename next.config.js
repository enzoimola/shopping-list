// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// });

const dotenv = require('dotenv');
dotenv.config();

// module.exports = withBundleAnalyzer({
//   reactStrictMode: false,
//   eslint: {
//     ignoreDuringBuilds: true,
//   },
// });
const runtimeCaching = require("next-pwa/cache");

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  runtimeCaching
})

module.exports = withPWA({
  // other congigs
  reactStrictMode: false,
  webpack(config, options) {
    return config;
  }
})
