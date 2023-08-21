/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["storage.googleapis.com"],
  },
  env: {
    infuraKey: process.env.INFURA_API_KEY,
    escrowFactoryAddress: process.env.ESCROW_FACTORY_CONTRACT_ADDRESS,
  },
};

module.exports = nextConfig;
