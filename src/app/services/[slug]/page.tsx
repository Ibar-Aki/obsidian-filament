import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllServiceSlugs, getServiceBySlug } from '@/libs/microcms';
import type { Service } from '@/types';
import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';

type Props = {
    params: Promise<{ slug: string }>;
};

// SSG: ビルド時に全slugでページを生成
export async function generateStaticParams() {
    try {
        const services = await getAllServiceSlugs();
        return services.map((service) => ({
            slug: service.slug,
        }));
    } catch (error) {
        console.error('Failed to generate static params for services:', error);
        return [];
    }
}

// 動的メタデータ
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    try {
        const { slug } = await params;
        const service = await getServiceBySlug(slug);
        if (!service) {
            return { title: 'サービスが見つかりません' };
        }
        return {
            title: service.title,
            description: service.description.substring(0, 160),
            openGraph: {
                title: service.title,
                description: service.description,
                images: service.image ? [service.image.url] : [],
            },
        };
    } catch {
        return {
            title: 'サービスが見つかりません',
        };
    }
}

export default async function ServiceDetailPage({ params }: Props) {
    let service: Service | null = null;

    try {
        const { slug } = await params;
        service = await getServiceBySlug(slug);
    } catch (error) {
        console.error('Failed to fetch service:', error);
    }

    if (!service) {
        notFound();
    }

    return (
        <div className="animate-fade-in">
            {/* パンくずリスト */}
            <div className="bg-gray-50 border-b border-gray-100">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <nav className="flex items-center space-x-2 text-sm text-gray-500">
                        <Link href="/" className="hover:text-indigo-600 transition-colors">
                            ホーム
                        </Link>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        <Link href="/services" className="hover:text-indigo-600 transition-colors">
                            サービス
                        </Link>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        <span className="text-gray-900 font-medium truncate max-w-xs">
                            {service.title}
                        </span>
                    </nav>
                </div>
            </div>

            {/* サービス詳細 */}
            <section className="py-12">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* 左カラム: 画像とデモ動画 */}
                        <div className="space-y-8">
                            {/* サービス画像 */}
                            <div className="aspect-video relative rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-indigo-100 to-purple-100">
                                {service.image ? (
                                    <Image
                                        src={service.image.url}
                                        alt={service.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        className="object-cover"
                                        priority
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <svg className="w-24 h-24 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                )}
                            </div>

                            {/* デモ動画エリア */}
                            {service.demo_url && (
                                <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-lg">
                                    <div className="p-4 border-b border-gray-800">
                                        <h3 className="text-white font-semibold flex items-center gap-2">
                                            <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M8 5v14l11-7z" />
                                            </svg>
                                            デモ動画
                                        </h3>
                                    </div>
                                    <div className="aspect-video relative">
                                        <iframe
                                            src={service.demo_url}
                                            className="absolute inset-0 w-full h-full"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            title={`${service.title} デモ動画`}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* デモ動画がない場合のプレースホルダー */}
                            {!service.demo_url && (
                                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 text-center">
                                    <div className="w-16 h-16 mx-auto mb-4 bg-gray-700 rounded-full flex items-center justify-center">
                                        <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <p className="text-gray-400 text-sm">
                                        デモ動画は準備中です
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* 右カラム: 詳細情報 */}
                        <div className="space-y-8">
                            {/* タイトルと価格 */}
                            <div>
                                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                                    {service.title}
                                </h1>
                                <div className="mt-4 flex items-center gap-4">
                                    <span className="text-3xl font-bold text-indigo-600">
                                        {service.price}
                                    </span>
                                </div>
                            </div>

                            {/* 説明 */}
                            <div className="prose prose-gray max-w-none">
                                <p className="text-gray-600 leading-relaxed text-lg">
                                    {service.description}
                                </p>
                            </div>

                            {/* 特徴リスト (仮) */}
                            <div className="bg-gray-50 rounded-2xl p-6">
                                <h3 className="font-semibold text-gray-900 mb-4">サービスの特徴</h3>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3">
                                        <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-gray-600">専門スタッフによる丁寧なサポート</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-gray-600">納品まで一貫したプロジェクト管理</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-gray-600">柔軟なカスタマイズ対応</span>
                                    </li>
                                </ul>
                            </div>

                            {/* お問い合わせボタン */}
                            <div className="space-y-4">
                                <a
                                    href="#contact-form"
                                    className="block w-full py-4 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl text-center hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                                >
                                    このサービスについて問い合わせる
                                </a>
                                <Link
                                    href="/services"
                                    className="block w-full py-4 px-6 bg-white text-gray-700 font-semibold rounded-xl text-center border border-gray-200 hover:border-indigo-300 hover:text-indigo-600 transition-all duration-200"
                                >
                                    サービス一覧に戻る
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* お問い合わせフォーム */}
            <section id="contact-form" className="py-16 bg-gray-50">
                <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-gray-900">
                            {service.title}に関するお問い合わせ
                        </h2>
                        <p className="mt-2 text-gray-600">
                            ご質問やお見積りのご依頼など、お気軽にどうぞ。
                        </p>
                    </div>
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                        <ContactForm serviceTitle={service.title} />
                    </div>
                </div>
            </section>
        </div>
    );
}
