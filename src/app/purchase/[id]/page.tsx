'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useCart } from '@/lib/cart-context';
import Navbar from '@/components/navbar';
import { ArrowLeft, ShoppingCart, Check, Info, Coffee, Upload, Star } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';

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
  createdAt: string;
  updatedAt: string;
}

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedGrind, setSelectedGrind] = useState('豆のまま');
  const [addedToCart, setAddedToCart] = useState(false);
  const [isGift, setIsGift] = useState(false);
  const [giftMessage, setGiftMessage] = useState('');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const { addToCart } = useCart();
  
  useEffect(() => {
    async function fetchProductDetail() {
      try {
        setLoading(true);
        const response = await fetch(`/api/products/${productId}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch product: ${response.status}`);
        }
        
        const data = await response.json();
        setProduct(data.product);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('商品情報の取得に失敗しました。');
      } finally {
        setLoading(false);
      }
    }
    
    fetchProductDetail();
  }, [productId]);
  
  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuantity(parseInt(e.target.value, 10));
  };
  
  const handleGiftMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setGiftMessage(e.target.value);
  };
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const calculatePrice = () => {
    if (!product) return 0;
    
    // 豆の状態によって価格を変更
    let basePrice = 1200; // 豆のまま: 1200円
    
    if (selectedGrind === '挽いた状態') {
      basePrice = 1500; // 挽いた状態: 1500円
    } else if (selectedGrind === 'ドリップバッグ') {
      basePrice = 2000; // ドリップバッグ(5個入り): 2000円
    }
    
    // ギフト包装の追加料金
    const giftPrice = isGift ? 300 : 0;
    
    return basePrice + giftPrice;
  };
  
  const handleAddToCart = () => {
    if (product) {
      const finalPrice = calculatePrice();
      
      // ギフト情報を含める
      const giftInfo = isGift ? ` (ギフト包装あり${giftMessage ? '・メッセージ付き' : ''})` : '';
      
      // 豆の状態の表示を調整
      let grindInfo = selectedGrind;
      if (selectedGrind === 'ドリップバッグ') {
        grindInfo = 'ドリップバッグ(5個入り)';
      }
      
      addToCart({
        id: product.id,
        name: `${product.name} (100g, ${grindInfo})${giftInfo}`,
        price: finalPrice,
        imageUrl: product.imageUrl,
      }, quantity);
      
      // 追加成功メッセージを表示
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 3000);
    }
  };
  
  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-[#FAFAF9]">
        <Navbar />
        <div className="container mx-auto px-4 py-12">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-700"></div>
          </div>
        </div>
      </div>
    );
  }
  
  if (error || !product) {
    return (
      <div className="flex flex-col min-h-screen bg-[#FAFAF9]">
        <Navbar />
        <div className="container mx-auto px-4 py-12">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
            <p className="text-red-700 font-medium">{error || '商品が見つかりませんでした。'}</p>
          </div>
          <Link href="/purchase" className="inline-flex items-center text-amber-700 hover:text-amber-900 font-medium">
            <ArrowLeft className="mr-2 h-4 w-4" />
            商品一覧に戻る
          </Link>
        </div>
      </div>
    );
  }
  
  // 商品説明の改行を反映
  const descriptionParagraphs = product.description.split('\n\n');
  const finalPrice = calculatePrice();
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="container py-8 flex-1">
        <div className="container mx-auto px-4 py-12">
          <div className="mb-6">
            <Link href="/purchase" className="inline-flex items-center text-sm font-medium text-amber-700 hover:text-amber-900">
              <ArrowLeft className="mr-1 h-4 w-4" />
              商品一覧に戻る
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* 商品画像 */}
            <div className="space-y-6">
              <div className="relative aspect-square bg-white rounded-2xl overflow-hidden shadow-md">
                <Image
                  src="/images/seto-blend-package.jpeg"
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  priority
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
            
            {/* 商品情報 */}
            <div>
              <h1 className="text-3xl font-bold mb-3">{product.name}</h1>
              <p className="text-2xl font-semibold text-amber-700 mb-6">
                ¥{finalPrice.toLocaleString()} <span className="text-sm font-normal">(税込/100g)</span>
              </p>
              
              {/* 送料無料キャンペーンの案内を追加 */}
              <div className="bg-amber-50 border border-amber-200 rounded-md p-4">
                <p className="text-amber-800 font-medium flex items-center">
                  <span className="bg-amber-100 p-1 rounded-full mr-2">
                    <Star className="h-4 w-4 text-amber-600" />
                  </span>
                  期間限定！全国送料無料キャンペーン実施中
                </p>
              </div>
              
              {/* 支払い方法の案内を追加 */}
              <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
                <p className="text-gray-700 font-medium">お支払い方法：PayPayのみ</p>
                <p className="text-gray-500 text-sm mt-1">
                  現在、PayPay決済のみ対応しております。その他の決済方法は準備中です。
                </p>
              </div>
              
              <div className="prose prose-amber mb-8 max-w-none">
                {descriptionParagraphs.map((paragraph, index) => (
                  <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
              
              <div className="mb-6 inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm">
                <Check className="mr-1 h-4 w-4" />
                在庫あり: {product.stock}個
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
                {/* 豆の状態選択（ラジオボタン） */}
                <div className="mb-6">
                  <Label className="block text-gray-700 font-medium mb-2">豆の状態</Label>
                  <RadioGroup value={selectedGrind} onValueChange={setSelectedGrind} className="grid grid-cols-3 gap-4">
                    <div>
                      <RadioGroupItem value="豆のまま" id="beans" className="peer sr-only" />
                      <Label
                        htmlFor="beans"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-gray-200 bg-white p-4 hover:bg-gray-50 hover:border-gray-300 peer-data-[state=checked]:border-amber-700 [&:has([data-state=checked])]:border-amber-700"
                      >
                        <Coffee className="mb-3 h-6 w-6" />
                        豆のまま
                        <span className="text-xs text-gray-500 mt-1">¥1,200</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="挽いた状態" id="ground" className="peer sr-only" />
                      <Label
                        htmlFor="ground"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-gray-200 bg-white p-4 hover:bg-gray-50 hover:border-gray-300 peer-data-[state=checked]:border-amber-700 [&:has([data-state=checked])]:border-amber-700"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mb-3 h-6 w-6"
                        >
                          <path d="M2 12h10" />
                          <path d="M9 4v16" />
                          <path d="M3 9v6" />
                          <path d="M13 4h7a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-7" />
                        </svg>
                        挽いた状態
                        <span className="text-xs text-gray-500 mt-1">¥1,500</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="ドリップバッグ" id="drip" className="peer sr-only" />
                      <Label
                        htmlFor="drip"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-gray-200 bg-white p-4 hover:bg-gray-50 hover:border-gray-300 peer-data-[state=checked]:border-amber-700 [&:has([data-state=checked])]:border-amber-700"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mb-3 h-6 w-6"
                        >
                          <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
                          <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
                          <line x1="6" x2="6" y1="2" y2="4" />
                          <line x1="10" x2="10" y1="2" y2="4" />
                          <line x1="14" x2="14" y1="2" y2="4" />
                        </svg>
                        ドリップバッグ
                        <span className="text-xs text-gray-500 mt-1">¥2,000 (5個入り)</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
                
                {/* 数量の選択 */}
                <div className="flex items-center mb-6">
                  <label htmlFor="quantity" className="text-gray-700 font-medium mr-4">数量 (100g):</label>
                  <select
                    id="quantity"
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="border border-gray-300 rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  >
                    {[...Array(Math.min(10, product?.stock || 10))].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>
                
                {/* ギフト包装オプション */}
                <div className="flex items-center space-x-2 mb-6">
                  <Checkbox id="gift" checked={isGift} onCheckedChange={(checked) => setIsGift(checked === true)} />
                  <label
                    htmlFor="gift"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    ギフト包装する (+¥300)
                  </label>
                </div>

                {isGift && (
                  <div className="space-y-4 border rounded-lg p-4 mb-6">
                    <div className="space-y-2">
                      <Label htmlFor="message">ギフトメッセージ</Label>
                      <Textarea 
                        id="message" 
                        placeholder="メッセージを入力してください" 
                        value={giftMessage}
                        onChange={handleGiftMessageChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="image">画像をアップロード（包装紙に印刷されます）</Label>
                      <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label
                          htmlFor="image"
                          className="cursor-pointer flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg hover:bg-gray-50"
                        >
                          {uploadedImage ? (
                            <Image
                              src={uploadedImage}
                              width={100}
                              height={100}
                              alt="アップロードされた画像"
                              className="h-full w-full object-contain"
                            />
                          ) : (
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <Upload className="h-6 w-6 mb-2" />
                              <p className="mb-2 text-sm text-gray-500">クリックして画像をアップロード</p>
                            </div>
                          )}
                        </Label>
                        <Input id="image" type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="flex flex-col space-y-4">
                  <button
                    onClick={handleAddToCart}
                    className="w-full bg-amber-700 hover:bg-amber-800 text-white font-semibold py-4 px-6 rounded-lg transition duration-200 flex items-center justify-center"
                    disabled={addedToCart}
                  >
                    {addedToCart ? (
                      <>
                        <Check className="mr-2 h-5 w-5" />
                        カートに追加しました
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="mr-2 h-5 w-5" />
                        カートに追加 (¥{(finalPrice * quantity).toLocaleString()})
                      </>
                    )}
                  </button>
                  
                  <div className="flex items-start p-4 bg-amber-50 rounded-lg">
                    <Info className="h-5 w-5 text-amber-700 mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-amber-800">
                      コーヒー豆は焙煎後、2週間以内の消費をおすすめします。鮮度を保つため、密閉容器に入れて冷暗所で保存してください。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
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