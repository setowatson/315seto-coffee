'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ShippingForm } from '@/components/features/checkout/shipping-form';
import { ShippingInfo } from '@/shared/types/order';
import Navbar from '@/components/layout/navbar/navbar';

export default function ShippingPage() {
  const router = useRouter();

  const handleSubmit = (data: ShippingInfo) => {
    // 配送情報をセッションストレージに保存
    sessionStorage.setItem('shippingInfo', JSON.stringify(data));
    // 支払い画面に遷移
    router.push('/checkout/payment');
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">配送情報の入力</h1>
        <div className="max-w-2xl mx-auto">
          <ShippingForm onSubmit={handleSubmit} />
        </div>
      </div>
    </main>
  );
} 