const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

const nextConfig = {
  // reactStrictMode: true,
};

module.exports = withPWA(nextConfig);

// /** @type {import('next').NextConfig} */
// const nextConfig = {}

// module.exports = nextConfig
