import { NextRequest, NextResponse } from 'next/server';
import { cancelPayment } from '@/lib/paypay';

// PayPay APIのレスポンス型を定義
interface PayPayCancelResponse {
  resultInfo: {
    code: string;
    message: string;
  };
  data?: {
    status: string;
    acceptedAt: string;
    merchantPaymentId: string;
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { merchantPaymentId } = body;
    
    if (!merchantPaymentId) {
      return NextResponse.json(
        { error: '決済IDは必須です' },
        { status: 400 }
      );
    }
    
    // PayPay決済をキャンセル
    const response = await cancelPayment(merchantPaymentId);
    
    // レスポンスを安全に処理
    const payPayResponse = response as unknown as PayPayCancelResponse;
    
    if (payPayResponse.resultInfo.code !== 'SUCCESS') {
      return NextResponse.json(
        { error: payPayResponse.resultInfo.message },
        { status: 400 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: '決済がキャンセルされました',
      data: payPayResponse.data,
    });
  } catch (error) {
    console.error('PayPay payment cancellation error:', error);
    return NextResponse.json(
      { error: '決済のキャンセル中にエラーが発生しました' },
      { status: 500 }
    );
  }
} 