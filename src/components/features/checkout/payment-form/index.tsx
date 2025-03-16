import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CartItem, ShippingInfo } from '@/shared/types/order';

interface PaymentFormProps {
  items: CartItem[];
  shippingInfo: ShippingInfo;
  totalAmount: number;
  onPaymentSubmit: () => void;
}

export function PaymentForm({
  items,
  shippingInfo,
  totalAmount,
  onPaymentSubmit,
}: PaymentFormProps) {
  return (
    <div className="space-y-8">
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">注文内容</h2>
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex items-center space-x-4">
                <div className="relative w-16 h-16">
                  <Image
                    src={item.image || '/images/coffee-placeholder.jpg'}
                    alt={item.name}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-600">
                    数量: {item.quantity} × ¥{item.price.toLocaleString()}
                  </p>
                </div>
                <p className="font-semibold">
                  ¥{(item.price * item.quantity).toLocaleString()}
                </p>
              </div>
            ))}
            <div className="border-t pt-4">
              <p className="text-lg font-semibold flex justify-between">
                <span>合計</span>
                <span>¥{totalAmount.toLocaleString()}</span>
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
            <Button onClick={onPaymentSubmit} className="w-full">
              PayPayで支払う
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 