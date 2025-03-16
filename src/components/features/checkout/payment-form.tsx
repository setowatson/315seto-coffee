'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { ShippingInfo } from '@/shared/types/order';

interface PaymentFormProps {
  amount: number;
  shippingInfo: ShippingInfo;
  onComplete: () => void;
}

export function PaymentForm({ amount, shippingInfo, onComplete }: PaymentFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null);
  const [merchantPaymentId, setMerchantPaymentId] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const { toast } = useToast();

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

      if (!response.ok) {
        throw new Error('決済の作成に失敗しました');
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || '決済の作成に失敗しました');
      }

      // 決済URLとQRコードを設定
      setPaymentUrl(result.data?.url || null);
      setMerchantPaymentId(result.data?.merchantPaymentId || null);

      // 決済状態のポーリングを開始
      if (result.data?.merchantPaymentId) {
        startPaymentStatusPolling(result.data.merchantPaymentId);
      }

      toast({
        title: "決済を開始しました",
        description: "PayPayアプリで決済を完了してください。",
      });
    } catch (error) {
      console.error('PayPay payment error:', error);
      setPaymentError(error instanceof Error ? error.message : '決済の作成中にエラーが発生しました');
      toast({
        variant: "destructive",
        title: "エラー",
        description: error instanceof Error ? error.message : '決済の作成中にエラーが発生しました',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // 決済状態をポーリングする関数
  const startPaymentStatusPolling = async (merchantPaymentId: string) => {
    const checkPaymentStatus = async () => {
      try {
        const response = await fetch(`/api/payment/status?merchantPaymentId=${merchantPaymentId}`);
        const result = await response.json();

        if (!response.ok) {
          throw new Error('決済状態の確認に失敗しました');
        }

        if (result.success && result.data) {
          setPaymentStatus(result.data.status);

          switch (result.data.status) {
            case 'COMPLETED':
              toast({
                title: "決済が完了しました",
                description: "ご注文ありがとうございます。",
              });
              onComplete();
              return;

            case 'CANCELED':
              setPaymentError('決済がキャンセルされました');
              setPaymentUrl(null);
              setMerchantPaymentId(null);
              toast({
                variant: "destructive",
                title: "決済がキャンセルされました",
                description: "もう一度お試しください。",
              });
              return;

            case 'FAILED':
              setPaymentError('決済が失敗しました');
              setPaymentUrl(null);
              setMerchantPaymentId(null);
              toast({
                variant: "destructive",
                title: "決済が失敗しました",
                description: "もう一度お試しください。",
              });
              return;

            default:
              // 決済が進行中の場合は5秒後に再度チェック
              setTimeout(checkPaymentStatus, 5000);
          }
        } else {
          throw new Error(result.error || '決済状態の確認に失敗しました');
        }
      } catch (error) {
        console.error('Payment status check error:', error);
        toast({
          variant: "destructive",
          title: "エラー",
          description: error instanceof Error ? error.message : '決済状態の確認中にエラーが発生しました',
        });
        // エラーの場合は10秒後に再度チェック
        setTimeout(checkPaymentStatus, 10000);
      }
    };

    // 初回チェックを開始
    checkPaymentStatus();
  };

  return (
    <div>
      <div className="mb-8">
        <Link href="/checkout/shipping" className="flex items-center text-amber-700 hover:text-amber-800">
          <ArrowLeft className="h-4 w-4 mr-2" />
          配送情報に戻る
        </Link>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">注文内容</h2>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>小計</span>
                <span>¥{amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm text-green-600">
                <span>送料</span>
                <span>無料</span>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between font-semibold">
                  <span>合計</span>
                  <span>¥{amount.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">配送先</h2>
            <div className="space-y-2 text-sm">
              <p>{shippingInfo.fullName}</p>
              <p>〒{shippingInfo.postalCode}</p>
              <p>{shippingInfo.prefecture} {shippingInfo.city} {shippingInfo.address}</p>
              {shippingInfo.building && <p>{shippingInfo.building}</p>}
              <p>電話番号: {shippingInfo.phone}</p>
              <p>メール: {shippingInfo.email}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">お支払い方法</h2>

            {paymentError && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>エラー</AlertTitle>
                <AlertDescription>{paymentError}</AlertDescription>
              </Alert>
            )}

            {paymentUrl ? (
              <div className="text-center">
                <div className="mb-6">
                  <h3 className="font-medium mb-2">PayPayで支払う</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    以下のQRコードをスキャンするか、リンクをクリックしてPayPayアプリで支払いを完了してください。
                  </p>

                  <div className="flex justify-center mb-4">
                    <div className="relative">
                      <Image
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(paymentUrl)}`}
                        alt="PayPay QR Code"
                        width={200}
                        height={200}
                        className="border p-2 rounded-lg"
                      />
                      {isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white/80">
                          <Loader2 className="h-8 w-8 animate-spin text-amber-700" />
                        </div>
                      )}
                    </div>
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
                <div className="flex items-center gap-4 p-4 border rounded-md bg-white mb-6">
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

                <div>
                  <p className="text-sm text-gray-500 mb-4">
                    「注文を確定する」ボタンをクリックすると、PayPayでの支払い処理が開始されます。
                  </p>

                  <Button
                    onClick={createPayPayPayment}
                    disabled={isLoading}
                    className="w-full bg-amber-700 hover:bg-amber-800"
                    size="lg"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        処理中...
                      </>
                    ) : (
                      <>
                        注文を確定する
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 