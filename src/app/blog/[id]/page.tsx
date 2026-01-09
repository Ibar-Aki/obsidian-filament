import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllBlogIds, getBlogById } from '@/libs/microcms';
import type { Blog } from '@/types';
import type { Metadata } from 'next';
import SafeHtml from '@/components/SafeHtml';

type Props = {
    params: Promise<{ id: string }>;
};

// SSG: ビルド時に全IDでページを生成
export async function generateStaticParams() {
    const blogs = await getAllBlogIds();
    return blogs.map((blog) => ({
        id: blog.id,
    }));
}

// 動的メタデータ
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const blog = await getBlogById(id);

    if (!blog) {
        return {
            title: '記事が見つかりません',
        };
    }

    return {
        title: blog.title,
        description: blog.content.replace(/<[^>]*>/g, '').substring(0, 160),
        openGraph: {
            title: blog.title,
            images: blog.eyecatch ? [blog.eyecatch.url] : [],
        },
    };
}

export default async function BlogDetailPage({ params }: Props) {
    const { id } = await params;
    const blog: Blog | null = await getBlogById(id);

    if (!blog) {
        notFound();
    }

    const publishedDate = blog.publishedAt
        ? new Date(blog.publishedAt).toLocaleDateString('ja-JP', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
        : null;

    const updatedDate = new Date(blog.updatedAt).toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div className="animate-fade-in">
            {/* パンくずリスト */}
            <div className="bg-gray-50 border-b border-gray-100">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <nav className="flex items-center space-x-2 text-sm text-gray-500" aria-label="パンくずリスト">
                        <Link href="/" className="hover:text-indigo-600 transition-colors">
                            ホーム
                        </Link>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        <Link href="/blog" className="hover:text-indigo-600 transition-colors">
                            ブログ
                        </Link>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        <span className="text-gray-900 font-medium truncate max-w-xs" aria-current="page">
                            {blog.title}
                        </span>
                    </nav>
                </div>
            </div>

            {/* 記事ヘッダー */}
            <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* アイキャッチ画像 */}
                {blog.eyecatch && (
                    <div className="aspect-video relative rounded-2xl overflow-hidden mb-8 shadow-lg">
                        <Image
                            src={blog.eyecatch.url}
                            alt={blog.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
                            className="object-cover"
                            priority
                        />
                    </div>
                )}

                {/* タイトルと日付 */}
                <header className="mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
                        {blog.title}
                    </h1>
                    <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-500">
                        {publishedDate && (
                            <span className="flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <time dateTime={blog.publishedAt}>公開: {publishedDate}</time>
                            </span>
                        )}
                        {blog.updatedAt !== blog.publishedAt && (
                            <span className="flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                <time dateTime={blog.updatedAt}>更新: {updatedDate}</time>
                            </span>
                        )}
                    </div>
                </header>

                {/* 記事本文 - XSS対策済み */}
                <SafeHtml
                    html={blog.content}
                    className="prose prose-lg prose-gray max-w-none prose-headings:font-bold prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-img:shadow-lg"
                />

                {/* フッター */}
                <footer className="mt-12 pt-8 border-t border-gray-200">
                    <Link
                        href="/blog"
                        className="inline-flex items-center text-indigo-600 font-semibold hover:text-indigo-700 transition-colors"
                    >
                        <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                        </svg>
                        ブログ一覧に戻る
                    </Link>
                </footer>
            </article>
        </div>
    );
}
