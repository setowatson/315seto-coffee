import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ShippingInfo } from '@/shared/types/order';

interface PaymentFormProps {
  amount: number;
  shippingInfo: ShippingInfo;
  onComplete: () => void;
}

export function PaymentForm({
  amount,
  shippingInfo,
  onComplete,
}: PaymentFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 決済を開始する関数
  const handlePaymentSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/payment/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          orderDescription: `SETO Coffee Order - ¥${amount.toLocaleString()}`,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || '決済の作成に失敗しました');
      }

      // PayPayの決済ページまたはアプリに遷移
      if (result.data.deepLink && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
        // モバイルの場合はアプリに遷移
        window.location.href = result.data.deepLink;
      } else {
        // PCの場合はWebページに遷移
        window.location.href = result.data.url;
      }

      // 注文完了ページへの遷移はPayPayからのコールバックで処理
    } catch (error) {
      setError(error instanceof Error ? error.message : '決済の作成に失敗しました');
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">注文内容</h2>
          <div className="space-y-4">
            <div className="border-t pt-4">
              <p className="text-lg font-semibold flex justify-between">
                <span>合計</span>
                <span>¥{amount.toLocaleString()}</span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">配送先情報</h2>
          <div className="space-y-2">
            <p>{shippingInfo.fullName}</p>
            <p>〒{shippingInfo.postalCode}</p>
            <p>
              {shippingInfo.prefecture}
              {shippingInfo.city}
              {shippingInfo.address}
            </p>
            {shippingInfo.building && <p>{shippingInfo.building}</p>}
            <p>電話番号: {shippingInfo.phone}</p>
            <p>メール: {shippingInfo.email}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">お支払い方法</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-4">
                <Image
                  src="/images/paypay-logo.png"
                  alt="PayPay"
                  width={80}
                  height={24}
                />
                <span>PayPay決済</span>
              </div>
              <span className="text-green-600">利用可能</span>
            </div>

            {error && (
              <div className="p-4 bg-red-50 text-red-600 rounded-lg">
                {error}
              </div>
            )}

            <Button
              onClick={handlePaymentSubmit}
              disabled={loading}
              className="w-full"
            >
              {loading ? '処理中...' : 'PayPayで支払う'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 