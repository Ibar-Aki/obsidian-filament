import Image from 'next/image';
import Link from 'next/link';
import { getServices } from '@/libs/microcms';
import type { Service } from '@/types';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'サービス',
    description: 'ビジネスの成長をサポートする多様なサービスを提供。Web制作、デザイン、コンサルティングなど。',
};

// SSG: ビルド時に静的生成
export const revalidate = false;

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
                <h2 className="text-xl font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                    {service.title}
                </h2>
                <p className="mt-2 text-gray-600 line-clamp-3">
                    {service.description}
                </p>
                <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-bold text-indigo-600">{service.price}</span>
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

export default async function ServicesPage() {
    let services: Service[] = [];

    try {
        const data = await getServices(100);
        services = data.contents;
    } catch (error) {
        console.error('Failed to fetch services:', error);
    }

    return (
        <div className="animate-fade-in">
            {/* ヘッダー */}
            <section className="bg-gradient-to-r from-indigo-50 to-purple-50 py-16">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl font-bold text-gray-900">サービス</h1>
                    <p className="mt-4 text-lg text-gray-600">
                        ビジネスの成長をサポートする多様なサービスを提供
                    </p>
                </div>
            </section>

            {/* サービス一覧 */}
            <section className="py-16">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    {services.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {services.map((service) => (
                                <ServiceCard key={service.id} service={service} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-gray-50 rounded-2xl border border-gray-100">
                            <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                            <p className="text-gray-500">サービス情報を準備中です。</p>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-2xl font-bold text-gray-900">サービスについてのご質問</h2>
                    <p className="mt-4 text-gray-600">
                        ご不明な点やカスタマイズのご相談など、お気軽にお問い合わせください。
                    </p>
                    <Link
                        href="/contact"
                        className="mt-8 inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                        お問い合わせ
                        <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </section>
        </div>
    );
}
