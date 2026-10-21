'use client';

import { useState } from 'react';

type ContactFormProps = {
    serviceTitle?: string; // サービス詳細ページから渡されるサービス名
};

export default function ContactForm({ serviceTitle }: ContactFormProps) {
    const defaultSubject = serviceTitle ? `【${serviceTitle}】に関するお問い合わせ` : '';
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: defaultSubject,
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const endpoint = process.env.NEXT_PUBLIC_SSGFORM_ENDPOINT;
            if (!endpoint) {
                throw new Error('フォームエンドポイントが設定されていません。');
            }

            // SSGformはURLエンコード形式を期待
            const formBody = new URLSearchParams();
            formBody.append('name', formData.name);
            formBody.append('email', formData.email);
            formBody.append('subject', formData.subject);
            formBody.append('message', formData.message);

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formBody.toString(),
            });

            if (!response.ok) {
                throw new Error('送信に失敗しました。時間をおいて再度お試しください。');
            }

            setIsSubmitted(true);
            setFormData({ name: '', email: '', subject: defaultSubject, message: '' });
        } catch (err) {
            setError(err instanceof Error ? err.message : '送信中にエラーが発生しました。');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">送信完了</h3>
                <p className="text-gray-600">
                    お問い合わせありがとうございます。<br />
                    内容を確認の上、チャットにてご連絡いたします。
                </p>
                <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-6 text-indigo-600 hover:text-indigo-700 text-sm font-medium underline underline-offset-2"
                >
                    別のお問い合わせをする
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* 電話対応不可の案内 */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4">
                <div className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm text-amber-800">
                        <span className="font-semibold">電話対応は行っておりません。</span>
                        お問い合わせはこちらのフォームまたはチャット窓口をご利用ください。
                    </p>
                </div>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm" role="alert">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* お名前 */}
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        お名前 <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        autoComplete="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white focus:bg-white"
                        placeholder="山田 太郎"
                    />
                </div>

                {/* メールアドレス */}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        メールアドレス <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        autoComplete="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white focus:bg-white"
                        placeholder="example@email.com"
                    />
                </div>
            </div>

            {/* 件名 */}
            <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    件名 <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white focus:bg-white"
                    placeholder="お問い合わせ内容の概要"
                />
            </div>

            {/* メッセージ */}
            <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    メッセージ <span className="text-red-500">*</span>
                </label>
                <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white focus:bg-white resize-none"
                    placeholder="お問い合わせ内容を詳しくお書きください"
                />
            </div>

            {/* 送信ボタン */}
            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
                {isSubmitting ? (
                    <span className="flex items-center justify-center space-x-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>送信中...</span>
                    </span>
                ) : (
                    '送信する'
                )}
            </button>
        </form>
    );
}
