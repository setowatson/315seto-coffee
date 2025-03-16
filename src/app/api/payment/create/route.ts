import { NextRequest, NextResponse } from 'next/server';
import { createQRCodePayment } from '@/lib/paypay';
import { v4 as uuidv4 } from 'uuid';

// PayPay APIのレスポンス型を定義
interface PayPayResponse {
  resultInfo: {
    code: string;
    message: string;
  };
  data?: {
    url: string;
    deepLink: string;
    expiryDate: string;
    merchantPaymentId: string;
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, orderDescription } = body;
    
    if (!amount || !orderDescription) {
      return NextResponse.json(
        { error: '金額と注文内容は必須です' },
        { status: 400 }
      );
    }
    
    // 注文IDを生成
    const orderId = `order_${uuidv4()}`;
    
    // ユーザーエージェントを取得
    const userAgent = request.headers.get('user-agent') || 'unknown';
    
    // PayPay QRコード決済を作成
    const response = await createQRCodePayment(
      orderId,
      amount,
      orderDescription,
      userAgent
    );
    
    // レスポンスを安全に処理
    const payPayResponse = response as unknown as PayPayResponse;
    
    if (payPayResponse.resultInfo.code !== 'SUCCESS') {
      return NextResponse.json(
        { error: payPayResponse.resultInfo.message },
        { status: 400 }
      );
    }
    
    if (!payPayResponse.data) {
      return NextResponse.json(
        { error: '決済データが取得できませんでした' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: {
        orderId,
        paymentUrl: payPayResponse.data.url,
        deepLink: payPayResponse.data.deepLink,
        expiryDate: payPayResponse.data.expiryDate,
        merchantPaymentId: payPayResponse.data.merchantPaymentId,
      },
    });
  } catch (error) {
    console.error('PayPay payment creation error:', error);
    return NextResponse.json(
      { error: '決済の作成中にエラーが発生しました' },
      { status: 500 }
    );
  }
} 