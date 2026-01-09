'use client';

import DOMPurify from 'dompurify';
import parse from 'html-react-parser';
import { useEffect, useState } from 'react';

type Props = {
    html: string;
    className?: string;
};

/**
 * XSS対策済みのHTML描画コンポーネント
 * microCMSのリッチエディタコンテンツを安全に表示する
 */
export default function SafeHtml({ html, className }: Props) {
    const [sanitizedHtml, setSanitizedHtml] = useState<string>('');
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        // DOMPurifyでサニタイズ
        const clean = DOMPurify.sanitize(html, {
            USE_PROFILES: { html: true },
            ADD_TAGS: ['iframe'], // YouTube埋め込み等を許可
            ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling', 'target'],
        });
        setSanitizedHtml(clean);
    }, [html]);

    // SSR時は空を返す（ハイドレーションエラー回避）
    if (!isClient) {
        return <div className={className} />;
    }

    return <div className={className}>{parse(sanitizedHtml)}</div>;
}
