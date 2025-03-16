import { NextRequest, NextResponse } from 'next/server';
import { getItem } from '@/lib/db';

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

// このルートは動的に生成されるため、ビルド時には実行されない
export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    // Cosmos DBから商品詳細を取得
    let product: Product | null = null;
    
    try {
      // 本番環境ではCosmosDBからデータを取得
      product = await getItem<Product>('products', id);
      console.log('Product fetched from Cosmos DB:', product?.id);
    } catch (dbError) {
      console.warn(`Failed to fetch product ${id} from Cosmos DB, using mock data:`, dbError);
      
      // データベース接続に失敗した場合はモックデータを使用
      const mockProducts: { [key: string]: Product } = {
        '1': {
          id: '1',
          name: 'SETO Blend Coffee',
          description: 'コーヒーの奥深い世界への「最初の一歩」をテーマにした特別なブレンドです。\n\n厳選された2種類のシングルオリジンを絶妙な配合でブレンドし、深煎りと浅煎りの絶妙なバランスを実現しました。\n\n王道のコーヒーの味が好きな方にとって、コーヒーの奥深い世界へ踏み出す「最初の一歩目」となるような、特別なコーヒーです。\n\n【特徴】\n・酸味：★★★☆☆\n・コク：★★★★☆\n・苦味：★★★☆☆\n\n【お楽しみ方】\n豆のまま、挽いた状態、ドリップバッグの3種類からお選びいただけます。豆のままをご購入の場合は、ご家庭の挽き方に合わせてお楽しみください。挽いた状態は中挽きでご用意し、ペーパードリップに最適です。ドリップバッグは手軽に本格的な味わいをお楽しみいただけます。',
          price: 1200,
          imageUrl: '/images/seto-blend-package.jpeg',
          stock: 100,
          grindOptions: ['豆のまま', '挽いた状態', 'ドリップバッグ'],
          weightOptions: [100],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      };
      
      product = mockProducts[id] || null;
    }
    
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ product }, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch product:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
} 