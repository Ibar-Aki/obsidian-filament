import ContactForm from '@/components/ContactForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'お問い合わせ',
    description: 'サービスに関するご質問やお見積りのご依頼など、お気軽にお問い合わせください。',
};

export default function ContactPage() {
    return (
        <div className="animate-fade-in">
            {/* ヘッダー */}
            <section className="bg-gradient-to-r from-indigo-50 to-purple-50 py-16">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl font-bold text-gray-900">お問い合わせ</h1>
                    <p className="mt-4 text-lg text-gray-600">
                        ご質問やお見積りのご依頼など、お気軽にどうぞ。
                    </p>
                </div>
            </section>

            {/* フォームセクション */}
            <section className="py-16">
                <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 sm:p-12">
                        <ContactForm />
                    </div>

                    {/* 追加情報 */}
                    <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* 対応時間 */}
                        <div className="bg-white rounded-xl border border-gray-100 p-6">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                                    <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="font-semibold text-gray-900">対応時間</h3>
                            </div>
                            <p className="text-gray-600 text-sm">
                                平日 10:00〜18:00<br />
                                ※土日祝日は翌営業日に対応
                            </p>
                        </div>

                        {/* 返信について */}
                        <div className="bg-white rounded-xl border border-gray-100 p-6">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <h3 className="font-semibold text-gray-900">返信について</h3>
                            </div>
                            <p className="text-gray-600 text-sm">
                                通常1〜2営業日以内に<br />
                                チャットにてご連絡いたします。
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
