import "dotenv/config"; // Ensures environment variables load

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    DATABASE_URL: process.env.DATABASE_URL, // Explicitly set DATABASE_URL
  },
};

console.log("DATABASE_URL from next.config.mjs:", `"${process.env.DATABASE_URL}"`);

export default nextConfig;
