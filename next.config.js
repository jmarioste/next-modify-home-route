/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return [
      {
        source: "/home",
        destination: "/",
        statusCode: 301,
      },
      {
        source: "/my-index",
        destination: "/index",
        statusCode: 301,
      },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/",
          destination: "/home",
        },
      ],
    };
  },
};

module.exports = nextConfig;
