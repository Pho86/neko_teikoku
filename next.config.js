/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3.us-west-004.backblazeb2.com',
      },
    ],
  },
}

module.exports = nextConfig
