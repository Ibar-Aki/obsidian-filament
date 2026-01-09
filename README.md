# ポートフォリオ＆ブログサイト

Next.js (App Router) + Tailwind CSS + microCMS で構築されたポートフォリオ兼ブログサイトです。

## 技術スタック

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS
- **CMS**: microCMS (microcms-js-sdk)
- **Form**: SSGform（外部連携）
- **Rendering**: SSG (Static Site Generation)

## ディレクトリ構造

```
src/
├── app/
│   ├── layout.tsx          # ルートレイアウト（Header/Footer含む）
│   ├── page.tsx             # トップページ
│   ├── not-found.tsx        # 404ページ
│   ├── globals.css          # グローバルスタイル
│   ├── blog/
│   │   ├── page.tsx         # ブログ一覧
│   │   └── [id]/
│   │       └── page.tsx     # ブログ詳細（IDルーティング）
│   ├── services/
│   │   ├── page.tsx         # サービス一覧
│   │   └── [slug]/
│   │       └── page.tsx     # サービス詳細（slugルーティング）
│   └── contact/
│       └── page.tsx         # お問い合わせページ
├── components/
│   ├── Header.tsx           # ヘッダーナビゲーション
│   ├── Footer.tsx           # フッター
│   └── ContactForm.tsx      # 問い合わせフォーム
├── libs/
│   └── microcms.ts          # microCMS SDK & データ取得関数
└── types/
    └── index.ts             # TypeScript型定義
```

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数の設定

`.env.local` ファイルを作成し、以下を設定してください：

```env
# microCMS
MICROCMS_SERVICE_DOMAIN=your-service-domain
MICROCMS_API_KEY=your-api-key

# SSGform
NEXT_PUBLIC_SSGFORM_ENDPOINT=https://ssgform.com/s/your-form-id
```

### 3. microCMSのセットアップ

#### ブログAPI（blogs）

| フィールドID | 表示名 | 種類 |
|-------------|--------|------|
| title | タイトル | テキストフィールド |
| content | 本文 | リッチエディタ |
| eyecatch | アイキャッチ | 画像（任意） |

#### サービスAPI（services）

| フィールドID | 表示名 | 種類 |
|-------------|--------|------|
| slug | スラッグ | テキストフィールド（必須） |
| title | タイトル | テキストフィールド |
| description | 説明 | テキストエリア |
| price | 価格 | テキストフィールド |
| image | 画像 | 画像（任意） |
| demo_url | デモURL | テキストフィールド（任意） |

### 4. 開発サーバーの起動

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000) でアクセスできます。

### 5. ビルド

```bash
npm run build
npm run start
```

## URL仕様

| ページ | URL | ルーティング方式 |
|--------|-----|------------------|
| トップ | `/` | - |
| ブログ一覧 | `/blog/` | - |
| ブログ詳細 | `/blog/{id}/` | microCMS コンテンツID |
| サービス一覧 | `/services/` | - |
| サービス詳細 | `/services/{slug}/` | microCMS slugフィールド |
| お問い合わせ | `/contact/` | - |

## 特徴

- 📱 **レスポンシブデザイン**: モバイル・タブレット・デスクトップ対応
- 🎨 **モダンなUI**: グラデーション、アニメーション、グラスモーフィズム
- ⚡ **高速表示**: SSGによる静的生成
- 📝 **問い合わせフォーム**: SSGformとの連携
- 📺 **デモ動画対応**: サービス詳細ページに動画埋め込み可能
- 🚫 **電話対応不可ポリシー**: チャット窓口のみの明示

## ライセンス

MIT
