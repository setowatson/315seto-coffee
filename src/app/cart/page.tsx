'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CartItem } from '@/components/features/cart/cart-item';
import { useCart } from '@/lib/cart-context';
import Navbar from '@/components/layout/navbar/navbar';

export default function CartPage() {
  const { items } = useCart();
  const totalAmount = items.reduce((total, item) => total + (item.price * item.quantity), 0);

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">カート</h1>
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">カートに商品がありません</p>
            <Link href="/purchase">
              <Button>
                商品一覧に戻る
              </Button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">カート</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          </div>
          <div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">注文内容</h2>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>小計</span>
                  <span>¥{totalAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>送料</span>
                  <span>無料</span>
                </div>
                <div className="border-t pt-2 font-semibold">
                  <div className="flex justify-between">
                    <span>合計</span>
                    <span>¥{totalAmount.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              <Link href="/checkout/shipping">
                <Button className="w-full">
                  レジに進む
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 