
## 基本設定と構造

### 1. プロジェクトのセットアップ

```shellscript
npx create-next-app@latest seto-coffee --typescript --tailwind --app
cd seto-coffee
npm install lucide-react @radix-ui/react-icons
```

### 2. shadcn/uiのセットアップ

```shellscript
npx shadcn@latest init
```

以下のコンポーネントをインストール:

```shellscript
npx shadcn@latest add button card input label radio-group select textarea tabs checkbox accordion
```

### 3. フォルダ構造

```plaintext
/app
  /page.tsx (ホームページ)
  /about/page.tsx (コーヒーについて)
  /purchase/page.tsx (購入ページ)
  /brewing/page.tsx (淹れ方ガイド)
  /profile/page.tsx (プロフィール)
  /faq/page.tsx (よくある質問)
  /layout.tsx (共通レイアウト)
  /globals.css (グローバルスタイル)
/public
  /images (画像フォルダ)
    /hero-background.jpg
    /coffee-beans.jpg
    /about-image-1.jpg
    /about-image-2.jpg
    /about-image-3.jpg
    /seto-blend-package.jpg
    /coffee-beans-closeup.jpg
    /coffee-cup.jpg
    /brewing-dripper.jpg
    /brewing-drip-bag.jpg
    /brewing-grinder.jpg
    /seto-profile.jpg
    /seto-brewing.jpg
```

## 各ページの実装指示

### 1. レイアウト (app/layout.tsx)

```typescriptreact
import type React from "react"
import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SETO Blend Coffee",
  description: "コーヒーの奥深い世界への「最初の一歩」をテーマにした特別なブレンド",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
```

### 2. グローバルCSS (app/globals.css)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 20 14.3% 4.1%;
    --card: 0 0% 100%;
    --card-foreground: 20 14.3% 4.1%;
    --popover: 0 0% 100%;
    --popover-foreground: 20 14.3% 4.1%;
    --primary: 24 9.8% 10%;
    --primary-foreground: 60 9.1% 97.8%;
    --secondary: 60 4.8% 95.9%;
    --secondary-foreground: 24 9.8% 10%;
    --muted: 60 4.8% 95.9%;
    --muted-foreground: 25 5.3% 44.7%;
    --accent: 60 4.8% 95.9%;
    --accent-foreground: 24 9.8% 10%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 60 9.1% 97.8%;
    --border: 20 5.9% 90%;
    --input: 20 5.9% 90%;
    --ring: 24 9.8% 10%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 20 14.3% 4.1%;
    --foreground: 60 9.1% 97.8%;
    --card: 20 14.3% 4.1%;
    --card-foreground: 60 9.1% 97.8%;
    --popover: 20 14.3% 4.1%;
    --popover-foreground: 60 9.1% 97.8%;
    --primary: 60 9.1% 97.8%;
    --primary-foreground: 24 9.8% 10%;
    --secondary: 12 6.5% 15.1%;
    --secondary-foreground: 60 9.1% 97.8%;
    --muted: 12 6.5% 15.1%;
    --muted-foreground: 24 5.4% 63.9%;
    --accent: 12 6.5% 15.1%;
    --accent-foreground: 60 9.1% 97.8%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 60 9.1% 97.8%;
    --border: 12 6.5% 15.1%;
    --input: 12 6.5% 15.1%;
    --ring: 24 5.7% 82.9%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

### 3. ホームページ (app/page.tsx)

**指示**:

- ヘッダーナビゲーションを作成（リンク: 購入、コーヒーについて、淹れ方、プロフィール、FAQ）
- ヒーローセクション（背景画像、タイトル、説明文、CTAボタン2つ）
- 3つの特徴紹介セクション
- コンセプト説明セクション（画像と説明文）
- メニューナビゲーション（6つのカードリンク）
- CTAセクション
- フッター


**重要ポイント**:

- 背景画像には半透明のグラデーションオーバーレイを適用
- ボタンやリンクには適切なアイコンを追加
- レスポンシブデザインを実装（モバイル、タブレット、デスクトップ）


**画像パス例**:

```typescriptreact
<Image
  src="/images/hero-background.jpg"
  width={1920}
  height={1080}
  alt="ヒーロー背景"
  className="object-cover"
/>
```

### 4. コーヒーについて (app/about/page.tsx)

**指示**:

- 「ホームに戻る」リンク
- ページタイトルと説明
- 3つのセクション（テーマ、シングルオリジン、楽しみ方）を画像とテキストで交互に配置
- CTAセクション


**重要ポイント**:

- 画像とテキストを交互に配置（デスクトップ）
- モバイルでは縦並びに調整
- 「テーマは「最初の一歩」」セクションには4つの段落を含める


**テーマは「最初の一歩」のテキスト**:

```plaintext
コーヒーの世界は広く、奥深い。でも、何にだって最初の一歩を踏み出すのは、いつだって少しの勇気が必要です。

SETO Blend Coffee は、王道のコーヒーを愛するあなたも、コーヒー初心者のあなたも、お気に入りのコーヒー豆がすでに持っているあなたも、新たな味わいの旅へ踏み出す「最初の一歩」となるように生まれました。

親しみやすい飲みやすさの中に、ほんの少しの冒険心を。  

「いつもと同じ」から、一歩先の世界へ。SETO Blend Coffee で、変化のはじまりを味わいませんか？
```

### 5. 購入ページ (app/purchase/page.tsx)

**指示**:

- 'use client' ディレクティブを使用（クライアントコンポーネント）
- 「ホームに戻る」リンク
- 商品情報表示（タイトル、説明、画像3枚）
- 購入オプション選択フォーム（グラム数、コーヒーの状態）
- ギフト包装オプション（チェックボックスで表示/非表示切り替え）
- 価格計算機能
- 配送・支払い・商品詳細のタブ


**重要ポイント**:

- useState フックで選択状態を管理
- 条件付きレンダリングでギフトオプションを表示/非表示
- 選択に基づいて動的に価格を計算
- 画像アップロード機能とプレビュー表示


**価格計算関数例**:

```typescriptreact
const calculatePrice = () => {
  const basePrice = 1500;
  const gramMultiplier = Number.parseInt(selectedGrams) / 100;
  let formAdditional = 0;

  if (selectedForm === "ground") formAdditional = 100;
  if (selectedForm === "drip") formAdditional = 300;

  return (basePrice * gramMultiplier + formAdditional).toFixed(0);
};
```

### 6. 淹れ方ガイド (app/brewing/page.tsx)

**指示**:

- 「ホームに戻る」リンク
- ページタイトルと説明
- コーヒーを美味しく淹れるポイント（画像と説明）
- 3つの淹れ方タブ（ドリップバッグ、ドリッパー、豆から淹れる）
- 各タブに画像と詳細な手順
- 補足情報カード3枚（保存方法、お湯の温度、挽き方の違い）
- CTAセクション


**重要ポイント**:

- Tabsコンポーネントで淹れ方を切り替え表示
- 各タブに適切な画像と手順リスト
- Cardコンポーネントで補足情報を整理


### 7. プロフィール (app/profile/page.tsx)

**指示**:

- 「ホームに戻る」リンク
- ページタイトルと説明
- プロフィール情報（画像、名前、肩書き）
- 自己紹介文（4段落）
- SNS/ブログリンク（アイコン付きボタン）
- 3つのカード（コーヒーとの出会い、コーヒーへの想い、ブレンドへのこだわり）
- メッセージセクション


**重要ポイント**:

- プロフィール画像は円形表示
- SNSボタンにはアイコンを追加
- 外部リンクには target="_blank" と rel="noopener noreferrer" を設定


**SNSボタン例**:

```typescriptreact
<Button variant="outline" size="sm" asChild className="flex items-center gap-2">
  <Link href="https://example.com/blog" target="_blank" rel="noopener noreferrer">
    <BookOpen className="h-4 w-4" />
    ブログ
  </Link>
</Button>
```

### 8. よくある質問 (app/faq/page.tsx)

**指示**:

- 'use client' ディレクティブを使用（クライアントコンポーネント）
- 「ホームに戻る」リンク
- ページタイトルと説明
- アコーディオン形式のFAQ（8項目）
- お問い合わせフォーム（名前、メール、メッセージ）
- フォーム送信後の確認メッセージ表示


**重要ポイント**:

- useState フックでフォーム状態を管理
- フォーム送信ハンドラーで状態を更新
- 送信後は確認メッセージを表示


## 画像の準備と使用方法

### 1. 必要な画像一覧

以下の画像をローカルの `/public/images/` フォルダに保存してください：

1. hero-background.jpg - ヒーローセクションの背景
2. coffee-beans.jpg - コーヒー豆のイメージ
3. about-image-1.jpg - 「最初の一歩」セクション用（海辺の子供）
4. about-image-2.jpg - 「楽しみ方」セクション用
5. about-image-3.jpg - 「シングルオリジン」セクション用（コーヒー豆を持つ手）
6. seto-blend-package.jpg - 商品メイン画像
7. coffee-beans-closeup.jpg - コーヒー豆のアップ
8. coffee-cup.jpg - コーヒーカップ
9. brewing-dripper.jpg - ドリッパーでコーヒーを淹れる様子
10. brewing-drip-bag.jpg - ドリップバッグ
11. brewing-grinder.jpg - コーヒー豆を挽く様子
12. seto-profile.jpg - プロフィール画像
13. seto-brewing.jpg - コーヒーを淹れるSETO


### 2. 画像の使用方法

Next.jsの`Image`コンポーネントを使用して、以下のように画像を表示します：

```typescriptreact
import Image from "next/image"

// 使用例
<Image
  src="/images/seto-profile.jpg" // /public フォルダからの相対パス
  width={100}
  height={100}
  alt="SETOのイラスト"
  className="object-cover"
/>
```

### 3. 画像サイズの推奨値

- ヒーロー画像: 1920×1080px
- コンテンツ画像: 600×600px
- プロフィール画像: 200×200px


## 実装のコツと注意点

1. **コンポーネントの分割**

1. 各ページは大きすぎる場合、小さなコンポーネントに分割する



2. **レスポンシブデザイン**

1. Tailwindの`sm:`, `md:`, `lg:`プレフィックスを活用
2. モバイルファーストで設計（デフォルトはモバイル用、メディアクエリで大きな画面に対応）



3. **クライアントコンポーネントとサーバーコンポーネント**

1. 状態管理や副作用が必要なページには`'use client'`を追加
2. それ以外はサーバーコンポーネントとして実装



4. **アクセシビリティ**

1. 画像には適切なalt属性を設定
2. セマンティックなHTML要素を使用
3. 十分なコントラスト比を確保



5. **パフォーマンス**

1. 画像は最適化されたNext.jsのImageコンポーネントを使用
2. 不要なJavaScriptを避ける


