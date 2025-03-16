import { Suspense } from 'react';
import { ProductList } from '@/components/features/products/product-list';
import { Product } from '@/shared/types/product';
import Navbar from '@/components/layout/navbar/navbar';

async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, {
    cache: 'no-store'
  });
  
  if (!res.ok) {
    throw new Error('商品データの取得に失敗しました');
  }

  return res.json();
}

export default async function PurchasePage() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">商品一覧</h1>
        <Suspense fallback={<div>Loading...</div>}>
          <ProductList products={products} />
        </Suspense>
      </div>
    </main>
  );
}