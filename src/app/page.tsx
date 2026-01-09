import Image from 'next/image';
import Link from 'next/link';
import { getBlogs, getServices } from '@/libs/microcms';
import type { Blog, Service } from '@/types';

// SSG: ビルド時に静的生成
export const revalidate = false;

// サービスカードコンポーネント
function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden card-hover"
    >
      <div className="aspect-video relative bg-gradient-to-br from-indigo-100 to-purple-100">
        {service.image ? (
          <Image
            src={service.image.url}
            alt={service.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-16 h-16 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
          {service.title}
        </h3>
        <p className="mt-2 text-sm text-gray-600 line-clamp-2">
          {service.description}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-indigo-600 font-semibold">{service.price}</span>
          <span className="text-sm text-gray-500 group-hover:text-indigo-600 transition-colors flex items-center gap-1">
            詳細を見る
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}

// ブログカードコンポーネント
function BlogCard({ blog }: { blog: Blog }) {
  const date = blog.publishedAt
    ? new Date(blog.publishedAt).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
    : null;

  return (
    <Link
      href={`/blog/${blog.id}`}
      className="group block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden card-hover"
    >
      <div className="aspect-video relative bg-gradient-to-br from-gray-100 to-gray-200">
        {blog.eyecatch ? (
          <Image
            src={blog.eyecatch.url}
            alt={blog.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
        )}
      </div>
      <div className="p-6">
        {date && <time className="text-xs text-gray-500" dateTime={blog.publishedAt}>{date}</time>}
        <h3 className="mt-2 text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-2">
          {blog.title}
        </h3>
        <span className="mt-4 inline-flex items-center text-sm text-indigo-600 font-medium">
          続きを読む
          <svg className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </Link>
  );
}

export default async function HomePage() {
  // microCMSからデータ取得
  let services: Service[] = [];
  let blogs: Blog[] = [];

  try {
    const [servicesData, blogsData] = await Promise.all([
      getServices(6),
      getBlogs(3),
    ]);
    services = servicesData.contents;
    blogs = blogsData.contents;
  } catch (error) {
    console.error('Failed to fetch data from microCMS:', error);
  }

  return (
    <div className="animate-fade-in">
      {/* ヒーローセクション */}
      <section className="hero-gradient py-20 lg:py-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              <span className="block text-gray-900">あなたのビジネスを</span>
              <span className="block gradient-text mt-2">成功へ導く</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-gray-600 leading-relaxed">
              クリエイティブなソリューションで、<br className="hidden sm:block" />
              ビジョンを現実に変えるお手伝いをします。
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/services"
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl text-center"
              >
                サービスを見る
              </Link>
              <Link
                href="/contact"
                className="w-full sm:w-auto px-8 py-4 bg-white text-gray-700 font-semibold rounded-xl border border-gray-200 hover:border-indigo-300 hover:text-indigo-600 transition-all duration-200 text-center"
              >
                お問い合わせ
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* サービスセクション */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">サービス</h2>
            <p className="mt-4 text-gray-600">ビジネスの成長をサポートする多様なサービスを提供</p>
          </div>
          {services.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
              <p className="text-gray-500">サービス情報を準備中です。</p>
            </div>
          )}
          <div className="mt-12 text-center">
            <Link
              href="/services"
              className="inline-flex items-center text-indigo-600 font-semibold hover:text-indigo-700 transition-colors"
            >
              すべてのサービスを見る
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ブログセクション */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">最新のブログ</h2>
            <p className="mt-4 text-gray-600">業界のトレンドやノウハウを発信</p>
          </div>
          {blogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-2xl border border-gray-100">
              <p className="text-gray-500">ブログ記事を準備中です。</p>
            </div>
          )}
          <div className="mt-12 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center text-indigo-600 font-semibold hover:text-indigo-700 transition-colors"
            >
              すべての記事を見る
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTAセクション */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white">プロジェクトを始めましょう</h2>
          <p className="mt-4 text-lg text-indigo-100">
            お気軽にお問い合わせください。ご相談は無料です。
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto px-8 py-4 bg-white text-indigo-600 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-200 shadow-lg"
            >
              お問い合わせフォームへ
            </Link>
          </div>
          <p className="mt-6 text-sm text-indigo-200">
            ※ 電話対応は行っておりません。チャット窓口のみで承っております。
          </p>
        </div>
      </section>
    </div>
  );
}
