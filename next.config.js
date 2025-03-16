/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['hebbkx1anhila5yf.public.blob.vercel-storage.com'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    // ビルド時のページデータ収集をスキップ
    disableStaticGenerationForPages: ['/api/products/[id]', '/api/orders'],
  },
}

module.exports = nextConfig 