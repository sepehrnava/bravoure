/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    OMDB_API: process.env.OMDB_API,
    OMDB_API_KEY: process.env.OMDB_API_KEY,
  },
  images: {
    domains: ["m.media-amazon.com"],
  },
  webpack(config) {
    config.module.rules.push({
      issuer: /\.[jt]sx?$/,
      test: /\.svg$/i,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

module.exports = nextConfig;
