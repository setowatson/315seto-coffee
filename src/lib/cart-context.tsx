'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// カート内の商品アイテムの型定義
export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  grindType: string;
}

// カートコンテキストの型定義
interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>, quantity: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

// デフォルト値を持つカートコンテキストを作成
const CartContext = createContext<CartContextType>({
  items: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  totalItems: 0,
  totalPrice: 0,
});

// カートコンテキストプロバイダーのpropsの型定義
interface CartProviderProps {
  children: ReactNode;
}

// ローカルストレージからアイテムを取得する関数
const getStoredCart = (): CartItem[] => {
  if (typeof window === 'undefined') {
    return [];
  }
  
  try {
    const storedItems = localStorage.getItem('cart');
    return storedItems ? JSON.parse(storedItems) : [];
  } catch (error) {
    console.error('Failed to parse cart items from localStorage:', error);
    return [];
  }
};

// カートコンテキストプロバイダーコンポーネント
export function CartProvider({ children }: CartProviderProps) {
  // ローカルストレージからカートアイテムを取得するための状態
  const [items, setItems] = useState<CartItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // コンポーネントがマウントされたときにローカルストレージからカートアイテムを読み込む
  useEffect(() => {
    setItems(getStoredCart());
    setIsInitialized(true);
  }, []);

  // カートアイテムが変更されたときにローカルストレージに保存
  useEffect(() => {
    if (isInitialized && typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(items));
    }
  }, [items, isInitialized]);

  // カートに商品を追加する関数
  const addToCart = (item: Omit<CartItem, 'quantity'>, quantity: number) => {
    setItems((prevItems) => {
      // 既存のアイテムを探す
      const existingItemIndex = prevItems.findIndex((i) => i.id === item.id);
      
      if (existingItemIndex >= 0) {
        // 既存のアイテムがある場合は数量を更新
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity,
        };
        return updatedItems;
      } else {
        // 新しいアイテムを追加
        return [...prevItems, { ...item, quantity }];
      }
    });
  };

  // カートから商品を削除する関数
  const removeFromCart = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // カート内の商品の数量を更新する関数
  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  // カートを空にする関数
  const clearCart = () => {
    setItems([]);
  };

  // カート内の合計アイテム数を計算
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  
  // カート内の合計金額を計算
  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

  // コンテキスト値を提供
  const value = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// カートコンテキストを使用するためのカスタムフック
export function useCart() {
  return useContext(CartContext);
} 