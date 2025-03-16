'use client';

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/lib/cart-context';

export default function CartIcon() {
  const { totalItems } = useCart();
  
  return (
    <Link href="/cart" className="relative inline-flex items-center justify-center p-2 hover:bg-gray-100 rounded-full transition-colors">
      <ShoppingCart className="h-5 w-5 text-gray-700" />
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-amber-700 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
          {totalItems > 99 ? '99+' : totalItems}
        </span>
      )}
    </Link>
  );
} 