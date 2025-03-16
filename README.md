# SETO Blend Coffee

コーヒーの奥深い世界への「最初の一歩」をテーマにした特別なブレンドコーヒーのECサイトです。

![SETO Blend Coffee](public/images/coffee-placeholder.jpeg)

## 概要

SETO Blend Coffeeは、コーヒー愛好家のために作られた専門のオンラインショップです。厳選されたコーヒー豆を使用したブレンドコーヒーを提供し、PayPayを利用した安全で便利な決済システムを実装しています。

## 主な機能

- 🛍️ 商品一覧・詳細表示
- 🛒 ショッピングカート機能
- 💳 PayPay決済システム
- 📦 配送情報管理
- 🔒 セキュアな注文処理
- 📱 レスポンシブデザイン

## 技術スタック

- **フロントエンド**
  - Next.js 14 (App Router)
  - TypeScript
  - Tailwind CSS
  - Lucide Icons

- **バックエンド**
  - Next.js API Routes
  - PayPay SDK

- **状態管理**
  - React Context API

- **その他**
  - ESLint
  - Prettier

## セットアップ

1. リポジトリのクローン
```bash
git clone https://github.com/yourusername/315seto-coffee.git
cd 315seto-coffee
```

2. 依存関係のインストール
```bash
npm install
```

3. 環境変数の設定
```bash
cp .env.example .env.local
```
`.env.local`ファイルを編集し、必要な環境変数を設定：
- `NEXT_PUBLIC_API_URL`: APIのベースURL
- `PAYPAY_API_KEY`: PayPay APIキー
- `PAYPAY_API_SECRET`: PayPay APIシークレット
- `PAYPAY_MERCHANT_ID`: PayPayマーチャントID

4. 開発サーバーの起動
```bash
npm run dev
```

アプリケーションは http://localhost:3000 で起動します。

## 開発環境

- Node.js 18.x以上
- npm 9.x以上

## デプロイ

このプロジェクトはAzure App Serviceへのデプロイを行います：

1. [Azure Portal](https://portal.azure.com)でアカウントを作成
2. App Serviceリソースを作成
   - ランタイムスタックとしてNode.js 18 LTSを選択
   - 適切なサービスプランを選択
3. デプロイメント設定
   - デプロイメントセンターでGitHubと連携
   - ビルド設定で以下を指定：
     - ビルドプロバイダー: GitHub Actions
     - Node.jsバージョン: 18.x
     - 出力ディレクトリ: .next
4. 環境変数の設定
   - アプリケーション設定で必要な環境変数を追加
5. デプロイを実行
   - mainブランチへのプッシュで自動デプロイ
   - または手動でGitHub Actionsを実行

## 機能の使い方

### 商品の閲覧と購入

1. トップページから商品一覧を閲覧
2. 商品をクリックして詳細を確認
3. 「カートに追加」ボタンで商品をカートに追加
4. カートページで数量を調整
5. 「レジに進む」ボタンでチェックアウト開始

### 決済プロセス

1. 配送情報の入力
2. PayPayでの支払い
   - QRコードをスキャン
   - または「PayPayアプリで開く」をクリック
3. 支払い完了後、注文確認ページへ自動遷移

## ライセンス

このプロジェクトはMITライセンスの下で公開されています。

## 作者

- Seto (@shu_no_kristoff)
  - [Instagram](https://www.instagram.com/shu_no_kristoff)
  - [Blog](https://rogue-boat-75a.notion.site/Seto-s-Diary-1aacf2b416868011bcbbf441df15a054)

## 貢献

1. このリポジトリをフォーク
2. 新しいブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add some amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## お問い合わせ

ご質問やご提案がありましたら、InstagramまたはBlogからお気軽にご連絡ください。
