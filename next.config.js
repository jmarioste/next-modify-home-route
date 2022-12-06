/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites(){
    return [
      {
        source: "/",
        destination: "/home"
      },
      {
        source: "/index",
        destination: "/test-index"
      }
    ]
  }
}

module.exports = nextConfig
