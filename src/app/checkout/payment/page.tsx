'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PaymentForm } from '@/components/features/checkout/payment-form';
import { useCart } from '@/lib/cart-context';
import { ShippingInfo } from '@/shared/types/order';
import Navbar from '@/components/layout/navbar/navbar';

export default function PaymentPage() {
  const router = useRouter();
  const { items, clearCart } = useCart();
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo | null>(null);

  useEffect(() => {
    // 配送情報の取得
    const storedShippingInfo = sessionStorage.getItem('shippingInfo');
    if (!storedShippingInfo) {
      router.push('/checkout/shipping');
      return;
    }
    setShippingInfo(JSON.parse(storedShippingInfo));

    // カートが空の場合はカートページにリダイレクト
    if (items.length === 0) {
      router.push('/cart');
    }
  }, [items.length, router]);

  const handlePaymentComplete = () => {
    // カートをクリア
    clearCart();
    // 配送情報をクリア
    sessionStorage.removeItem('shippingInfo');
    // 注文完了ページへ遷移
    router.push('/checkout/complete');
  };

  if (!shippingInfo) {
    return null;
  }

  const totalAmount = items.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">お支払い情報</h1>
        <div className="max-w-2xl mx-auto">
          <PaymentForm
            amount={totalAmount}
            shippingInfo={shippingInfo}
            onComplete={handlePaymentComplete}
          />
        </div>
      </div>
    </main>
  );
} 