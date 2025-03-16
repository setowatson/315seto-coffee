'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, Check, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ShippingInfo } from '@/shared/types/order';

interface PaymentFormProps {
  amount: number;
  shippingInfo: ShippingInfo;
  onComplete: () => void;
}

interface PayPayResponse {
  success: boolean;
  error?: string;
  data?: {
    paymentUrl: string;
    merchantPaymentId: string;
    status?: string;
  };
}

export function PaymentForm({ amount, shippingInfo, onComplete }: PaymentFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null);
  const [merchantPaymentId, setMerchantPaymentId] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [isPaymentComplete, setIsPaymentComplete] = useState(false);

  // PayPay決済を作成する関数
  const createPayPayPayment = async () => {
    setIsLoading(true);
    setPaymentError(null);

    try {
      // 注文内容を作成
      const orderDescription = `SETO Blend Coffee: ¥${amount.toLocaleString()}`;

      // PayPay QRコード決済を作成
      const response = await fetch('/api/payment/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          orderDescription,
        }),
      });

      const result: PayPayResponse = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || '決済の作成に失敗しました');
      }

      // 決済URLとQRコードを設定
      setPaymentUrl(result.data?.paymentUrl || null);
      setMerchantPaymentId(result.data?.merchantPaymentId || null);

      // 決済状態のポーリングを開始
      if (result.data?.merchantPaymentId) {
        startPaymentStatusPolling(result.data.merchantPaymentId);
      }

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
            onComplete();
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

  return (
    <div>
      {!isPaymentComplete ? (
        <>
          <div className="mb-8">
            <Link href="/checkout/shipping" className="flex items-center text-amber-700 hover:text-amber-800">
              <ArrowLeft className="h-4 w-4 mr-2" />
              配送情報に戻る
            </Link>
          </div>

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

            <div className="border-t pt-4">
              <div className="flex justify-between mb-2">
                <span>小計</span>
                <span>¥{amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>送料</span>
                <span>¥0</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>合計</span>
                <span>¥{amount.toLocaleString()}</span>
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
  );
} 