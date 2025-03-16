'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, ArrowLeft, Coffee, Star } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import Navbar from '@/components/navbar';

// 商品の型定義
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
  grindOptions: string[];
  weightOptions: number[];
}

export default function PurchasePage() {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error('商品情報の取得に失敗しました');
        }
        const data = await response.json();
        // 1種類のみの商品を取得
        if (data.products && data.products.length > 0) {
          setProduct(data.products[0]);
        } else {
          setError('商品が見つかりませんでした');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : '商品情報の取得中にエラーが発生しました');
        console.error('Failed to fetch products:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAF9]">
      <Navbar />

      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <Link href="/" className="inline-flex items-center text-sm font-medium text-amber-700 hover:text-amber-900 mb-6">
            <ArrowLeft className="mr-1 h-4 w-4" />
            ホームに戻る
          </Link>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-700"></div>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-lg text-red-500">{error}</p>
            </div>
          ) : product ? (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                <div className="space-y-8">
                  <div className="relative aspect-square rounded-2xl overflow-hidden bg-white shadow-md">
                    <Image
                      src="/images/seto-blend-package.jpeg"
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="relative aspect-square rounded-lg overflow-hidden bg-white shadow-sm">
                      <Image
                        src="/images/coffee-beans-closeup.jpeg"
                        alt="コーヒー豆のアップ"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="relative aspect-square rounded-lg overflow-hidden bg-white shadow-sm">
                      <Image
                        src="/images/coffee-cup.jpeg"
                        alt="コーヒーカップ"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="relative aspect-square rounded-lg overflow-hidden bg-white shadow-sm">
                      <Image
                        src="/images/brewing-dripper.jpeg"
                        alt="ドリッパー"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-8">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                    <p className="text-xl font-semibold text-amber-700 mb-4">¥{product.price.toLocaleString()} <span className="text-sm font-normal">(税込)</span></p>
                    <p className="text-gray-600 mb-6">{product.description}</p>
                    
                    <div className="bg-amber-50 border border-amber-200 rounded-md p-4 mb-6">
                      <p className="text-amber-800 font-medium flex items-center">
                        <span className="bg-amber-100 p-1 rounded-full mr-2">
                          <Star className="h-4 w-4 text-amber-600" />
                        </span>
                        期間限定！全国送料無料キャンペーン実施中
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 border border-gray-200 rounded-md p-4 mb-6">
                      <p className="text-gray-700 font-medium">お支払い方法：PayPayのみ</p>
                      <p className="text-gray-500 text-sm mt-1">
                        現在、PayPay決済のみ対応しております。その他の決済方法は準備中です。
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col">
                    <div className="bg-white p-6 rounded-xl shadow-sm mb-8 border border-gray-100">
                      <h3 className="font-semibold text-lg mb-4 flex items-center">
                        <Coffee className="mr-2 h-5 w-5 text-amber-700" />
                        商品詳細
                      </h3>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <span className="inline-flex items-center justify-center rounded-full bg-amber-100 h-6 w-6 text-xs font-medium text-amber-800 mr-3 mt-0.5">1</span>
                          <span>厳選された2種類のシングルオリジンを絶妙な配合でブレンド</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-flex items-center justify-center rounded-full bg-amber-100 h-6 w-6 text-xs font-medium text-amber-800 mr-3 mt-0.5">2</span>
                          <span>深煎りと浅煎りの絶妙なバランス</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-flex items-center justify-center rounded-full bg-amber-100 h-6 w-6 text-xs font-medium text-amber-800 mr-3 mt-0.5">3</span>
                          <span>豆のまま、挽いた状態、ドリップバッグの3種類からお選びいただけます</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-flex items-center justify-center rounded-full bg-amber-100 h-6 w-6 text-xs font-medium text-amber-800 mr-3 mt-0.5">4</span>
                          <span>100gサイズでご提供</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="mt-auto">
                      <Link 
                        href={`/purchase/${product.id}`}
                        className="w-full inline-flex items-center justify-center rounded-lg bg-amber-700 px-6 py-4 text-base font-medium text-white shadow-sm hover:bg-amber-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                      >
                        <ShoppingCart className="mr-2 h-5 w-5" />
                        購入オプションを選択
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-16">
                <h2 className="text-2xl font-bold mb-10 text-center">SETO Blend Coffeeの特徴</h2>
                
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-6">
                      <Coffee className="h-6 w-6 text-amber-700" />
                    </div>
                    <h3 className="text-xl font-semibold mb-4">厳選された豆</h3>
                    <p className="text-gray-600 leading-relaxed">
                      2種類のシングルオリジンを絶妙な配合でブレンド。深煎りと浅煎りの絶妙なバランスをお楽しみください。
                    </p>
                  </div>
                  
                  <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-6">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-amber-700">
                        <path d="M17 8h1a4 4 0 1 1 0 8h-1"></path>
                        <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"></path>
                        <line x1="6" x2="6" y1="2" y2="4"></line>
                        <line x1="10" x2="10" y1="2" y2="4"></line>
                        <line x1="14" x2="14" y1="2" y2="4"></line>
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-4">毎月変わる味わい</h3>
                    <p className="text-gray-600 leading-relaxed">
                      1ヶ月単位でシングルオリジンを入れ替え、少しずつ変化する味わいをお楽しみいただけます。
                    </p>
                  </div>
                  
                  <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-6">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-amber-700">
                        <path d="M12 2a8 8 0 0 0-8 8c0 5.4 7.3 11.4 7.6 11.7a.7.7 0 0 0 .8 0c.3-.3 7.6-6.3 7.6-11.7a8 8 0 0 0-8-8Z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-4">毎日のちょっとした贅沢に</h3>
                    <p className="text-gray-600 leading-relaxed">
                      デジタルから離れた時間、ちょっとした休息に最適な一杯。特別なひとときをお届けします。
                    </p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex justify-center items-center h-64">
              <p className="text-lg">商品が見つかりませんでした</p>
            </div>
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