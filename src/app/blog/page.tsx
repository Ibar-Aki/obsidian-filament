import Image from 'next/image';
import Link from 'next/link';
import { getBlogs } from '@/libs/microcms';
import type { Blog } from '@/types';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'ブログ',
    description: '業界のトレンドやノウハウ、最新情報を発信するブログ。',
};

// SSG: ビルド時に静的生成
export const revalidate = false;

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
                <h2 className="mt-2 text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-2">
                    {blog.title}
                </h2>
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

export default async function BlogListPage() {
    let blogs: Blog[] = [];

    try {
        const data = await getBlogs(100);
        blogs = data.contents;
    } catch (error) {
        console.error('Failed to fetch blogs:', error);
    }

    return (
        <div className="animate-fade-in">
            {/* ヘッダー */}
            <section className="bg-gradient-to-r from-gray-50 to-indigo-50 py-16">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl font-bold text-gray-900">ブログ</h1>
                    <p className="mt-4 text-lg text-gray-600">
                        業界のトレンドやノウハウを発信
                    </p>
                </div>
            </section>

            {/* 記事一覧 */}
            <section className="py-16">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    {blogs.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {blogs.map((blog) => (
                                <BlogCard key={blog.id} blog={blog} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-gray-50 rounded-2xl border border-gray-100">
                            <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                            </svg>
                            <p className="text-gray-500">ブログ記事を準備中です。</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
