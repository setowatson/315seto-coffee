import { Suspense } from 'react';
import { ProductDetail } from '@/components/features/products/product-detail';
import { Product } from '@/shared/types/product';
import Navbar from '@/components/layout/navbar/navbar';

/**
 * @important このECサイトは単一商品（SETO Blend Coffee）のみを扱います。
 * 商品の追加や商品一覧機能は要件に含まれていません。
 */

// 固定の商品データ
const setoBlendCoffee: Product = {
  id: '1',
  name: 'SETO Blend Coffee',
  description: 'コーヒーの奥深い世界への「最初の一歩」をテーマにした特別なブレンドです。\n\n厳選された2種類のシングルオリジンを絶妙な配合でブレンドし、深煎りと浅煎りの絶妙なバランスを実現しました。\n\n王道のコーヒーの味が好きな方にとって、コーヒーの奥深い世界へ踏み出す「最初の一歩目」となるような、特別なコーヒーです。\n\n【特徴】\n・酸味：★★★☆☆\n・コク：★★★★☆\n・苦味：★★★☆☆\n\n【お楽しみ方】\n豆のまま、挽いた状態、ドリップバッグの3種類からお選びいただけます。豆のままをご購入の場合は、ご家庭の挽き方に合わせてお楽しみください。挽いた状態は中挽きでご用意し、ペーパードリップに最適です。ドリップバッグは手軽に本格的な味わいをお楽しみいただけます。',
  price: 1200,
  imageUrl: '/images/seto-blend-package.jpeg',
  stock: 100,
  grindOptions: ['豆のまま', '挽いた状態', 'ドリップバッグ'],
  weightOptions: [100, 200, 500],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

export default function PurchasePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <Suspense fallback={<div>Loading...</div>}>
          <ProductDetail product={setoBlendCoffee} />
        </Suspense>
      </div>
    </main>
  );
} 