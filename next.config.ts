import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // microCMSの画像ドメインを許可
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.microcms-assets.io',
        pathname: '/**',
      },
    ],
    // 静的エクスポート時は画像最適化を無効化
    unoptimized: true,
  },

  // トレイリングスラッシュの設定
  trailingSlash: true,
};

export default nextConfig;
