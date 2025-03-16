'use client';

import React from 'react';
import { OrderComplete } from '@/components/features/checkout/order-complete';
import Navbar from '@/components/layout/navbar/navbar';

export default function CompletePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <OrderComplete />
        </div>
      </div>
    </main>
  );
} 