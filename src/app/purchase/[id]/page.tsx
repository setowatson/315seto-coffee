import { Suspense } from 'react';
import { ProductDetail } from '@/components/features/products/product-detail';
import { Product } from '@/shared/types/product';
import Navbar from '@/components/layout/navbar/navbar';

async function getProduct(id: string): Promise<Product> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`, {
    cache: 'no-store'
  });

  if (!res.ok) {
    throw new Error('商品データの取得に失敗しました');
  }

  return res.json();
}

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProduct(params.id);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <Suspense fallback={<div>Loading...</div>}>
          <ProductDetail product={product} />
        </Suspense>
      </div>
    </main>
  );
} 