/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['hebbkx1anhila5yf.public.blob.vercel-storage.com'],
  },
  eslint: {
    ignoreDuringBuilds: true,
    dirs: ['src'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig 