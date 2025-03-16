'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Coffee, Check, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/navbar";

interface OrderInfo {
  orderId: string;
  orderDate: string;
  shippingInfo: {
    fullName: string;
    postalCode: string;
    prefecture: string;
    city: string;
    address: string;
    building: string;
    phone: string;
    email: string;
  };
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }>;
  totalAmount: number;
  paymentMethod: string;
  status: string;
}

export default function OrderCompletePage() {
  const [orderInfo, setOrderInfo] = useState<OrderInfo | null>(null);
  
  useEffect(() => {
    // ローカルストレージから注文情報を取得
    const storedOrderInfo = localStorage.getItem("lastOrder");
    if (storedOrderInfo) {
      setOrderInfo(JSON.parse(storedOrderInfo));
    }
    
    // カート情報をクリア
    localStorage.removeItem("cartItems");
  }, []);
  
  if (!orderInfo) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 container px-4 py-8">
          <div className="max-w-3xl mx-auto text-center py-12">
            <h1 className="text-2xl font-bold mb-4">注文情報が見つかりません</h1>
            <p className="mb-6">注文情報が見つかりませんでした。</p>
            <Button asChild className="bg-amber-700 hover:bg-amber-800">
              <Link href="/">
                ホームに戻る
              </Link>
            </Button>
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
  
  // 注文日時をフォーマット
  const orderDate = new Date(orderInfo.orderDate);
  const formattedDate = new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(orderDate);
  
  // 画像のソースを決定する関数
  const getImageSource = (imageUrl: string | undefined) => {
    if (!imageUrl) return "/images/coffee-placeholder.jpeg";
    if (typeof imageUrl !== 'string') return "/images/coffee-placeholder.jpeg";
    return imageUrl.startsWith('http') ? imageUrl : 
           imageUrl.includes('/') ? imageUrl : "/images/coffee-placeholder.jpeg";
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 container px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-6">
              <Check className="h-8 w-8" />
            </div>
            <h1 className="text-2xl font-bold mb-4">ご注文ありがとうございます</h1>
            <p className="text-gray-600">
              ご注文が正常に完了しました。注文の詳細は以下でご確認いただけます。
            </p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h2 className="text-lg font-semibold mb-4">注文情報</h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">注文番号</p>
                  <p className="font-medium">{orderInfo.orderId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">注文日時</p>
                  <p className="font-medium">{formattedDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">お支払い方法</p>
                  <p className="font-medium">{orderInfo.paymentMethod}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">ステータス</p>
                  <p className="font-medium text-green-600">
                    {orderInfo.status === "paid" ? "支払い完了" : orderInfo.status}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h2 className="text-lg font-semibold mb-4">注文内容</h2>
            
            <div className="space-y-4 mb-6">
              {orderInfo.items.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="w-16 h-16 relative rounded-md overflow-hidden">
                    <Image
                      src={getImageSource(item.image)}
                      alt={item.name}
                      width={64}
                      height={64}
                      className="rounded-md"
                      style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                      priority
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-500">数量: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">¥{item.price.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t pt-4">
              <div className="flex justify-between mb-2">
                <span>小計</span>
                <span>¥{orderInfo.totalAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>送料</span>
                <span>¥0</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>合計</span>
                <span>¥{orderInfo.totalAmount.toLocaleString()}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-amber-50 p-6 rounded-lg mb-8">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <Star className="h-5 w-5 text-amber-600 mr-2" />
              キャンペーン情報
            </h2>
            <p className="text-amber-800 font-medium mb-2">期間限定！全国送料無料キャンペーン実施中</p>
            <p className="text-gray-600">
              当店では期間限定で全国送料無料キャンペーンを実施しております。お得なこの機会にぜひご利用ください。
            </p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h2 className="text-lg font-semibold mb-4">お支払い情報</h2>
            <div className="space-y-2">
              <p><span className="font-medium">お支払い方法:</span> {orderInfo.paymentMethod}</p>
              <p><span className="font-medium">ステータス:</span> <span className="text-green-600">支払い完了</span></p>
              <p className="text-gray-500 text-sm mt-2">
                現在、PayPay決済のみ対応しております。その他の決済方法は準備中です。
              </p>
            </div>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h2 className="text-lg font-semibold mb-4">配送先</h2>
            
            <div className="space-y-2">
              <p>{orderInfo.shippingInfo.fullName}</p>
              <p>〒{orderInfo.shippingInfo.postalCode}</p>
              <p>{orderInfo.shippingInfo.prefecture} {orderInfo.shippingInfo.city} {orderInfo.shippingInfo.address}</p>
              {orderInfo.shippingInfo.building && <p>{orderInfo.shippingInfo.building}</p>}
              <p>電話番号: {orderInfo.shippingInfo.phone}</p>
              <p>メール: {orderInfo.shippingInfo.email}</p>
            </div>
          </div>
          
          <div className="bg-amber-50 p-6 rounded-lg mb-8">
            <h2 className="text-lg font-semibold mb-4">お届けについて</h2>
            
            <p className="text-gray-600 mb-4">
              商品は通常3〜5営業日以内に発送いたします。発送後、追跡番号をメールでお知らせいたします。
            </p>
            
            <p className="text-gray-600">
              ご不明な点がございましたら、お問い合わせフォームまたはSNSからお気軽にご連絡ください。
            </p>
          </div>
          
          <div className="text-center mt-8">
            <Button asChild className="bg-amber-700 hover:bg-amber-800">
              <Link href="/">
                ショッピングを続ける
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
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