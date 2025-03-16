/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    // 外部ドメインの設定を削除し、ローカルの画像のみを使用
  },
  // PostCSSの設定を追加
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
};

module.exports = nextConfig;
