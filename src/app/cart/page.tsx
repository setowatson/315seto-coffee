'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Trash2, Plus, Minus, Coffee, ArrowRight, Star } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import Navbar from '@/components/navbar';
import { Button } from '@/components/ui/button';

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // カート情報をローカルストレージに保存
  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem('cartItems', JSON.stringify(items));
    }
  }, [items]);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    
    // カート情報をローカルストレージに保存
    localStorage.setItem('cartItems', JSON.stringify(items));
    
    // 配送情報入力ページへリダイレクト
    window.location.href = '/checkout/shipping';
  };

  // 画像のソースを決定する関数
  const getImageSource = (imageUrl: string) => {
    return imageUrl?.startsWith('http') ? '/images/seto-blend-package.jpeg' : imageUrl;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 py-8">
        <div className="container">
          <h1 className="text-2xl font-bold mb-6">ショッピングカート</h1>

          {items.length === 0 ? (
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <p className="text-gray-500 mb-4">カートに商品がありません</p>
              <Link
                href="/purchase"
                className="inline-block bg-amber-700 hover:bg-amber-800 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
              >
                商品を探す
              </Link>
            </div>
          ) : (
            <>
              <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                <div className="divide-y">
                  {items.map((item) => (
                    <div key={item.id} className="p-4 flex flex-col sm:flex-row gap-4">
                      <div className="relative h-24 w-24 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                        <Image
                          src={getImageSource(item.imageUrl)}
                          alt={item.name}
                          fill
                          sizes="96px"
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                      <div className="flex-grow">
                        <Link href={`/purchase/${item.id}`}>
                          <h3 className="font-semibold text-lg hover:text-amber-700 transition-colors">
                            {item.name}
                          </h3>
                        </Link>
                        <p className="text-amber-700 font-medium mt-1">
                          ¥{item.price.toLocaleString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 rounded-md hover:bg-gray-100"
                          aria-label="数量を減らす"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 rounded-md hover:bg-gray-100"
                          aria-label="数量を増やす"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="text-right sm:min-w-[100px]">
                        <p className="font-semibold">
                          ¥{(item.price * item.quantity).toLocaleString()}
                        </p>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 mt-2 flex items-center gap-1 text-sm"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span>削除</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="font-semibold text-lg mb-4">注文情報</h2>
                  
                  <div className="bg-amber-50 border border-amber-200 rounded-md p-4 mb-4">
                    <p className="text-amber-800 font-medium flex items-center">
                      <span className="bg-amber-100 p-1 rounded-full mr-2">
                        <Star className="h-4 w-4 text-amber-600" />
                      </span>
                      期間限定！全国送料無料キャンペーン実施中
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 border border-gray-200 rounded-md p-4 mb-4">
                    <p className="text-gray-700 font-medium">お支払い方法：PayPayのみ</p>
                    <p className="text-gray-500 text-sm mt-1">
                      現在、PayPay決済のみ対応しております。その他の決済方法は準備中です。
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">小計</span>
                      <span className="font-medium">¥{totalPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">送料</span>
                      <span className="font-medium">¥0</span>
                    </div>
                    <div className="border-t pt-3 mt-3">
                      <div className="flex justify-between">
                        <span className="font-semibold">合計</span>
                        <span className="font-semibold">¥{totalPrice.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex justify-between mb-4">
                    <span className="font-semibold">小計</span>
                    <span className="font-semibold">¥{totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between mb-4">
                    <span className="font-semibold">送料</span>
                    <span className="font-semibold">¥0</span>
                  </div>
                  <div className="border-t pt-4 flex justify-between">
                    <span className="text-lg font-bold">合計</span>
                    <span className="text-lg font-bold">¥{totalPrice.toLocaleString()}</span>
                  </div>

                  <Button
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                    className={`w-full mt-6 py-6 ${
                      isCheckingOut
                        ? 'bg-gray-400'
                        : 'bg-amber-700 hover:bg-amber-800'
                    }`}
                  >
                    {isCheckingOut ? '処理中...' : 'レジに進む'}
                    {!isCheckingOut && <ArrowRight className="ml-2 h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      <footer className="w-full border-t py-8 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <Link href="/" className="flex items-center gap-2 font-bold text-xl mb-4">
                <Coffee className="h-6 w-6 text-amber-700" />
                <span>SETO Blend Coffee</span>
              </Link>
              <p className="text-sm text-gray-500 mb-4">
                コーヒーの奥深い世界への「最初の一歩」をテーマにした特別なブレンド
              </p>
              <p className="text-sm text-gray-500">
                &copy; {new Date().getFullYear()} SETO Blend Coffee. All rights reserved.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">リンク</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/purchase" className="text-sm text-gray-500 hover:text-amber-700">
                    購入
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-sm text-gray-500 hover:text-amber-700">
                    コーヒーについて
                  </Link>
                </li>
                <li>
                  <Link href="/brewing" className="text-sm text-gray-500 hover:text-amber-700">
                    淹れ方
                  </Link>
                </li>
                <li>
                  <Link href="/profile" className="text-sm text-gray-500 hover:text-amber-700">
                    プロフィール
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-sm text-gray-500 hover:text-amber-700">
                    よくある質問
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">お問い合わせ</h3>
              <p className="text-sm text-gray-500 mb-4">
                ご質問やお問い合わせは、以下のSNSからお気軽にどうぞ。
              </p>
              <div className="flex gap-4">
                <a 
                  href="https://www.instagram.com/shu_no_kristoff?igsh=MWJpdmk4eHAyNGZwNA%3D%3D&utm_source=qr" 
                  className="text-sm text-gray-500 hover:text-amber-700"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
                <a 
                  href="https://rogue-boat-75a.notion.site/Seto-s-Diary-1aacf2b416868011bcbbf441df15a054" 
                  className="text-sm text-gray-500 hover:text-amber-700"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Blog
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 