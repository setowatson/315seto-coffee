import { NextResponse } from 'next/server';
import { getItems } from '@/lib/db';

// 商品の型定義
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
  createdAt: string;
  updatedAt: string;
}

export async function GET() {
  try {
    // Cosmos DBから商品情報を取得
    // 注意: 実際のデータベースが設定されるまでは、モックデータを返します
    
    // 本番環境では以下のようにCosmosDBからデータを取得
    // const products = await getItems<Product>('products', 'SELECT * FROM c');
    
    // モックデータ
    const products: Product[] = [
      {
        id: '1',
        name: 'SETO Blend Coffee - Light Roast',
        description: '軽やかな酸味と華やかな香りが特徴の浅煎りブレンド',
        price: 1200,
        imageUrl: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/coffee-beans.jpg-wXSniSHcICfSzPZnLfr8RgRn2CSnPg.jpeg',
        stock: 50,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '2',
        name: 'SETO Blend Coffee - Medium Roast',
        description: 'バランスの取れた味わいと豊かなコクが楽しめる中煎りブレンド',
        price: 1300,
        imageUrl: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/coffee-beans.jpg-wXSniSHcICfSzPZnLfr8RgRn2CSnPg.jpeg',
        stock: 45,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '3',
        name: 'SETO Blend Coffee - Dark Roast',
        description: '深いコクと苦味が特徴の深煎りブレンド',
        price: 1400,
        imageUrl: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/coffee-beans.jpg-wXSniSHcICfSzPZnLfr8RgRn2CSnPg.jpeg',
        stock: 40,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];
    
    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
} 