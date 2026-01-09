# 環境変数設定ガイド

microCMSとSSGformを利用するには、以下の環境変数を`.env.local`ファイルに設定してください。

## microCMS設定

```env
MICROCMS_SERVICE_DOMAIN=your-service-domain
MICROCMS_API_KEY=your-api-key
```

- `MICROCMS_SERVICE_DOMAIN`: microCMSのサービスドメイン（URLの最初の部分）
- `MICROCMS_API_KEY`: microCMSのAPIキー（管理画面から取得）

## SSGform設定

```env
NEXT_PUBLIC_SSGFORM_ENDPOINT=https://ssgform.com/s/your-form-id
```

- `NEXT_PUBLIC_SSGFORM_ENDPOINT`: SSGformのエンドポイントURL
