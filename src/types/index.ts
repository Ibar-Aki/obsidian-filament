/**
 * microCMS 型定義
 */

// microCMS共通のベース型
export type MicroCMSBase = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

// サービスコンテンツ型
export type Service = MicroCMSBase & {
  slug: string; // サービス専用のカスタムURL
  title: string;
  description: string;
  price: string;
  image?: { url: string };
  demo_url?: string;
};

// ブログコンテンツ型
export type Blog = MicroCMSBase & {
  title: string;
  content: string;
  eyecatch?: { url: string };
};

// microCMSリスト取得レスポンス型
export type MicroCMSListResponse<T> = {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
};
