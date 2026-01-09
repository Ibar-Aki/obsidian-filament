import Link from 'next/link';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* ブランド情報 */}
                    <div className="space-y-4">
                        <Link
                            href="/"
                            className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"
                        >
                            Portfolio
                        </Link>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            クリエイティブなソリューションで<br />
                            あなたのビジネスを成功へ導きます。
                        </p>
                    </div>

                    {/* ナビゲーション */}
                    <div className="space-y-4">
                        <h3 className="text-white font-semibold">サイトマップ</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors">
                                    ホーム
                                </Link>
                            </li>
                            <li>
                                <Link href="/services" className="text-sm text-gray-400 hover:text-white transition-colors">
                                    サービス
                                </Link>
                            </li>
                            <li>
                                <Link href="/blog" className="text-sm text-gray-400 hover:text-white transition-colors">
                                    ブログ
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-sm text-gray-400 hover:text-white transition-colors">
                                    お問い合わせ
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* お問い合わせ情報 */}
                    <div className="space-y-4">
                        <h3 className="text-white font-semibold">お問い合わせ</h3>
                        <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-lg p-4">
                            <div className="flex items-start space-x-3">
                                <svg className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <div>
                                    <p className="text-sm font-medium text-amber-300">電話対応不可</p>
                                    <p className="text-xs text-gray-400 mt-1">
                                        お問い合わせはチャット窓口のみ<br />
                                        で承っております。
                                    </p>
                                </div>
                            </div>
                        </div>
                        <p className="text-sm text-gray-400">
                            <Link href="/contact" className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2">
                                お問い合わせフォーム
                            </Link>
                            よりご連絡ください。
                        </p>
                    </div>
                </div>

                {/* コピーライト */}
                <div className="mt-12 pt-8 border-t border-gray-800">
                    <p className="text-center text-sm text-gray-500">
                        &copy; {currentYear} Portfolio. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
