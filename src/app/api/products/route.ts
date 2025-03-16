import { NextResponse } from 'next/server';
import { getItems } from '@/lib/db';

// このルートは動的に生成されるため、ビルド時には実行されない
export const dynamic = 'force-dynamic';

// 商品の型定義
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
  grindOptions: string[];
  weightOptions: number[];
  createdAt: string;
  updatedAt: string;
}

export async function GET() {
  try {
    // Cosmos DBから商品情報を取得
    let products: Product[] = [];
    
    try {
      // 本番環境ではCosmosDBからデータを取得
      products = await getItems<Product>('products', 'SELECT * FROM c');
      console.log('Products fetched from Cosmos DB:', products.length);
    } catch (dbError) {
      console.warn('Failed to fetch from Cosmos DB, using mock data:', dbError);
      
      // データベース接続に失敗した場合はモックデータを使用
      products = [
        {
          id: '1',
          name: 'SETO Blend Coffee',
          description: 'コーヒーの奥深い世界への「最初の一歩」をテーマにした特別なブレンドです。\n\n厳選された2種類のシングルオリジンを絶妙な配合でブレンドし、深煎りと浅煎りの絶妙なバランスを実現しました。\n\n王道のコーヒーの味が好きな方にとって、コーヒーの奥深い世界へ踏み出す「最初の一歩目」となるような、特別なコーヒーです。',
          price: 1200,
          imageUrl: '/images/seto-blend-package.jpeg',
          stock: 100,
          grindOptions: ['豆のまま', '挽いた状態', 'ドリップバッグ'],
          weightOptions: [100],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ];
    }
    
    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
} 