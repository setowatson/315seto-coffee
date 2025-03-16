import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { CartItem as CartItemType } from '@/shared/types/order';
import { useCart } from '@/lib/cart-context';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (change: number) => {
    const newQuantity = item.quantity + change;
    if (newQuantity <= 0) {
      removeFromCart(item.id);
    } else {
      updateQuantity(item.id, newQuantity);
    }
  };

  return (
    <div className="flex items-center space-x-4 py-4">
      <div className="relative w-24 h-24">
        <Image
          src={item.image || '/images/coffee-placeholder.jpg'}
          alt={item.name}
          fill
          className="object-cover rounded-md"
        />
      </div>
      <div className="flex-1">
        <h3 className="font-semibold">{item.name}</h3>
        <p className="text-sm text-gray-600">¥{item.price.toLocaleString()}</p>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleQuantityChange(-1)}
        >
          -
        </Button>
        <span className="w-8 text-center">{item.quantity}</span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleQuantityChange(1)}
        >
          +
        </Button>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => removeFromCart(item.id)}
        className="text-red-500 hover:text-red-700"
      >
        削除
      </Button>
    </div>
  );
} 