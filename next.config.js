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
};

module.exports = nextConfig;
