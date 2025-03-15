'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ShoppingCart } from 'lucide-react';

// 商品の型定義
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
}

export default function PurchasePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error('商品情報の取得に失敗しました');
        }
        const data = await response.json();
        setProducts(data.products);
      } catch (err) {
        setError(err instanceof Error ? err.message : '商品情報の取得中にエラーが発生しました');
        console.error('Failed to fetch products:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <ArrowLeft className="h-5 w-5" />
            <span>戻る</span>
          </Link>
          <h1 className="text-xl font-bold">商品一覧</h1>
          <div className="w-10"></div> {/* スペーサー */}
        </div>
      </header>

      <main className="flex-1 py-8">
        <div className="container">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-lg">読み込み中...</p>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-lg text-red-500">{error}</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <div key={product.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="relative h-48">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h2 className="text-xl font-semibold">{product.name}</h2>
                    <p className="text-muted-foreground mt-2">{product.description}</p>
                    <div className="flex justify-between items-center mt-4">
                      <p className="text-lg font-bold">¥{product.price.toLocaleString()}</p>
                      <button className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        カートに追加
                      </button>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      {product.stock > 0 ? `在庫: ${product.stock}` : '在庫切れ'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <footer className="w-full py-6 border-t">
        <div className="container">
          <p className="text-center text-sm text-muted-foreground">
            © 2024 SETO Blend Coffee. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
} 