'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Coffee, ArrowLeft, ArrowRight, Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/navbar";

interface ShippingInfo {
  fullName: string;
  postalCode: string;
  prefecture: string;
  city: string;
  address: string;
  building: string;
  phone: string;
  email: string;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

// PayPay QRコード決済のレスポンス型
interface PayPayResponse {
  success: boolean;
  data: {
    orderId: string;
    paymentUrl: string;
    deepLink: string;
    expiryDate: string;
    merchantPaymentId: string;
  };
  error?: string;
}

export default function PaymentPage() {
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isPaymentComplete, setIsPaymentComplete] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null);
  const [paymentQrCode, setPaymentQrCode] = useState<string | null>(null);
  const [merchantPaymentId, setMerchantPaymentId] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  
  useEffect(() => {
    // ローカルストレージから配送情報を取得
    const storedShippingInfo = localStorage.getItem("shippingInfo");
    if (storedShippingInfo) {
      setShippingInfo(JSON.parse(storedShippingInfo));
    }
    
    // ローカルストレージからカート情報を取得
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      const items = JSON.parse(storedCartItems);
      setCartItems(items);
      
      // 合計金額を計算
      const total = items.reduce((sum: number, item: CartItem) => sum + (item.price * item.quantity), 0);
      setTotalAmount(total);
    }
  }, []);
  
  // PayPay決済を作成する関数
  const createPayPayPayment = async () => {
    setIsLoading(true);
    setPaymentError(null);
    
    try {
      // 注文内容を作成
      const orderItems = cartItems.map(item => `${item.name} x ${item.quantity}`).join(', ');
      const orderDescription = `SETO Blend Coffee: ${orderItems}`;
      
      // PayPay QRコード決済を作成
      const response = await fetch('/api/payment/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: totalAmount,
          orderDescription,
        }),
      });
      
      const result: PayPayResponse = await response.json();
      
      if (!response.ok || !result.success) {
        throw new Error(result.error || '決済の作成に失敗しました');
      }
      
      // 決済URLとQRコードを設定
      setPaymentUrl(result.data.paymentUrl);
      setMerchantPaymentId(result.data.merchantPaymentId);
      
      // 決済状態のポーリングを開始
      startPaymentStatusPolling(result.data.merchantPaymentId);
      
    } catch (error) {
      console.error('PayPay payment error:', error);
      setPaymentError(error instanceof Error ? error.message : '決済の作成中にエラーが発生しました');
    } finally {
      setIsLoading(false);
    }
  };
  
  // 決済状態をポーリングする関数
  const startPaymentStatusPolling = (merchantPaymentId: string) => {
    const checkPaymentStatus = async () => {
      try {
        const response = await fetch(`/api/payment/status?merchantPaymentId=${merchantPaymentId}`);
        const result = await response.json();
        
        if (response.ok && result.success && result.data) {
          setPaymentStatus(result.data.status);
          
          // 決済が完了した場合
          if (result.data.status === 'COMPLETED') {
            setIsPaymentComplete(true);
            
            // 注文情報をローカルストレージに保存
            const orderInfo = {
              orderId: result.data.merchantPaymentId,
              orderDate: new Date().toISOString(),
              shippingInfo,
              items: cartItems,
              totalAmount,
              paymentMethod: "PayPay",
              status: "paid"
            };
            
            localStorage.setItem("lastOrder", JSON.stringify(orderInfo));
            
            // 3秒後に注文完了ページへリダイレクト
            setTimeout(() => {
              window.location.href = "/checkout/complete";
            }, 3000);
            
            return; // ポーリングを停止
          }
          
          // 決済がキャンセルされた場合
          if (result.data.status === 'CANCELED') {
            setPaymentError('決済がキャンセルされました');
            setPaymentUrl(null);
            setMerchantPaymentId(null);
            return; // ポーリングを停止
          }
          
          // 決済が失敗した場合
          if (result.data.status === 'FAILED') {
            setPaymentError('決済が失敗しました');
            setPaymentUrl(null);
            setMerchantPaymentId(null);
            return; // ポーリングを停止
          }
          
          // 決済が進行中の場合は5秒後に再度チェック
          setTimeout(checkPaymentStatus, 5000);
        } else {
          // エラーの場合は10秒後に再度チェック
          setTimeout(checkPaymentStatus, 10000);
        }
      } catch (error) {
        console.error('Payment status check error:', error);
        // エラーの場合は10秒後に再度チェック
        setTimeout(checkPaymentStatus, 10000);
      }
    };
    
    // 初回チェックを開始
    checkPaymentStatus();
  };
  
  // 画像のソースを決定する関数
  const getImageSource = (imageUrl: string | undefined) => {
    if (!imageUrl) return "/images/coffee-placeholder.jpeg";
    if (typeof imageUrl !== 'string') return "/images/coffee-placeholder.jpeg";
    return imageUrl.startsWith('http') ? imageUrl : 
           imageUrl.includes('/') ? imageUrl : "/images/coffee-placeholder.jpeg";
  };
  
  if (!shippingInfo || cartItems.length === 0) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 container px-4 py-8">
          <div className="max-w-3xl mx-auto text-center py-12">
            <h1 className="text-2xl font-bold mb-4">情報が見つかりません</h1>
            <p className="mb-6">配送情報またはカート情報が見つかりません。</p>
            <Button asChild className="bg-amber-700 hover:bg-amber-800">
              <Link href="/cart">
                カートに戻る
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
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 container px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {!isPaymentComplete ? (
            <>
              <div className="mb-8">
                <Link href="/checkout/shipping" className="flex items-center text-amber-700 hover:text-amber-800">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  配送情報に戻る
                </Link>
              </div>
              
              <h1 className="text-2xl font-bold mb-6">お支払い</h1>
              
              <div className="bg-gray-50 p-6 rounded-lg mb-8">
                <h2 className="text-lg font-semibold mb-4">注文内容</h2>
                
                <div className="bg-amber-50 border border-amber-200 rounded-md p-4 mb-4">
                  <p className="text-amber-800 font-medium flex items-center">
                    <span className="bg-amber-100 p-1 rounded-full mr-2">
                      <Star className="h-4 w-4 text-amber-600" />
                    </span>
                    期間限定！全国送料無料キャンペーン実施中
                  </p>
                </div>
                
                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
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
                    <span>¥{totalAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>送料</span>
                    <span>¥0</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>合計</span>
                    <span>¥{totalAmount.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg mb-8">
                <h2 className="text-lg font-semibold mb-4">配送先</h2>
                
                <div className="space-y-2">
                  <p>{shippingInfo.fullName}</p>
                  <p>〒{shippingInfo.postalCode}</p>
                  <p>{shippingInfo.prefecture} {shippingInfo.city} {shippingInfo.address}</p>
                  {shippingInfo.building && <p>{shippingInfo.building}</p>}
                  <p>電話番号: {shippingInfo.phone}</p>
                  <p>メール: {shippingInfo.email}</p>
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg mb-8">
                <h2 className="text-lg font-semibold mb-4">お支払い方法</h2>
                
                {paymentUrl ? (
                  <div className="text-center">
                    <div className="mb-6">
                      <h3 className="font-medium mb-2">PayPayで支払う</h3>
                      <p className="text-sm text-gray-500 mb-4">
                        以下のQRコードをスキャンするか、リンクをクリックしてPayPayアプリで支払いを完了してください。
                      </p>
                      
                      <div className="flex justify-center mb-4">
                        <Image
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(paymentUrl)}`}
                          alt="PayPay QR Code"
                          width={200}
                          height={200}
                          className="border p-2 rounded-lg"
                        />
                      </div>
                      
                      <a
                        href={paymentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-amber-700 hover:bg-amber-800 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
                      >
                        PayPayアプリで開く
                      </a>
                    </div>
                    
                    <div className="text-sm text-gray-500">
                      <p>支払い状態: {paymentStatus || '処理中...'}</p>
                      <p className="mt-2">支払いが完了すると、自動的に次の画面に進みます。</p>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-4 p-4 border rounded-md bg-white">
                      <div className="w-12 h-12 relative">
                        <Image
                          src="/images/paypay-logo.png"
                          alt="PayPay"
                          width={48}
                          height={48}
                          className="object-contain"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium">PayPay</h3>
                        <p className="text-sm text-gray-500">PayPayアプリでお支払い</p>
                      </div>
                    </div>
                    
                    {paymentError && (
                      <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
                        {paymentError}
                      </div>
                    )}
                    
                    <div className="mt-6">
                      <p className="text-sm text-gray-500 mb-4">
                        「注文を確定する」ボタンをクリックすると、PayPayでの支払い処理が開始されます。
                      </p>
                      
                      <Button
                        onClick={createPayPayPayment}
                        disabled={isLoading}
                        className="w-full bg-amber-700 hover:bg-amber-800"
                      >
                        {isLoading ? "処理中..." : "注文を確定する"}
                        {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-6">
                <Check className="h-8 w-8" />
              </div>
              <h1 className="text-2xl font-bold mb-4">お支払いが完了しました</h1>
              <p className="mb-6">ご注文ありがとうございます。注文完了ページに移動します...</p>
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