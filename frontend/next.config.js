/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: 'build',
  reactStrictMode: true,
  env: {
    FETCH_URL: process.env.FETCH_URL,
  },
}

module.exports = nextConfig
