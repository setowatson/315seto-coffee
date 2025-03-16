import { NextRequest, NextResponse } from 'next/server';
import { getPaymentDetails } from '@/lib/paypay';

// PayPay APIのレスポンス型を定義
interface PayPayStatusResponse {
  resultInfo: {
    code: string;
    message: string;
  };
  data?: {
    status: string;
    paymentId: string;
    merchantPaymentId: string;
    userAgent: string;
    amount: {
      amount: number;
      currency: string;
    };
    orderDescription: string;
    paymentDate: string;
    storeId: string;
    terminalId: string;
    receiptNumber: string;
    requestedAt: string;
    completedAt: string;
  };
}

export async function GET(request: NextRequest) {
  try {
    // URLからmerchantPaymentIdを取得
    const { searchParams } = new URL(request.url);
    const merchantPaymentId = searchParams.get('merchantPaymentId');
    
    if (!merchantPaymentId) {
      return NextResponse.json(
        { error: '決済IDは必須です' },
        { status: 400 }
      );
    }
    
    // PayPay決済の状態を取得
    const response = await getPaymentDetails(merchantPaymentId);
    
    // レスポンスを安全に処理
    const payPayResponse = response as unknown as PayPayStatusResponse;
    
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
        status: payPayResponse.data.status,
        paymentId: payPayResponse.data.paymentId,
        merchantPaymentId: payPayResponse.data.merchantPaymentId,
        amount: payPayResponse.data.amount,
        orderDescription: payPayResponse.data.orderDescription,
        paymentDate: payPayResponse.data.paymentDate,
        completedAt: payPayResponse.data.completedAt,
      },
    });
  } catch (error) {
    console.error('PayPay payment status error:', error);
    return NextResponse.json(
      { error: '決済状態の取得中にエラーが発生しました' },
      { status: 500 }
    );
  }
} 