'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ShippingInfo } from '@/shared/types/order';

interface OrderInfo {
  orderId: string;
  orderDate: string;
  shippingInfo: ShippingInfo;
  totalAmount: number;
  paymentMethod: string;
  status: string;
}

export function OrderComplete() {
  const [orderInfo, setOrderInfo] = useState<OrderInfo | null>(null);

  useEffect(() => {
    // セッションストレージから注文情報を取得
    const storedOrderInfo = sessionStorage.getItem('orderInfo');
    if (storedOrderInfo) {
      setOrderInfo(JSON.parse(storedOrderInfo));
    }
  }, []);

  if (!orderInfo) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">注文情報が見つかりません</h1>
        <p className="mb-6">注文情報が見つかりませんでした。</p>
        <Button asChild className="bg-amber-700 hover:bg-amber-800">
          <Link href="/">
            ホームに戻る
          </Link>
        </Button>
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

  return (
    <div>
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
  );
} 