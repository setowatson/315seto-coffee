import { NextRequest, NextResponse } from 'next/server';
import { createQRCodePayment } from '@/lib/paypay';
import { v4 as uuidv4 } from 'uuid';

// このルートは動的に生成されるため、ビルド時には実行されない
export const dynamic = 'force-dynamic';

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
    
    console.log('PayPay payment request:', {
      orderId,
      amount,
      orderDescription,
      userAgent
    });
    
    // PayPay QRコード決済を作成
    const response = await createQRCodePayment(
      orderId,
      amount,
      orderDescription,
      userAgent
    );

    console.log('PayPay API raw response:', JSON.stringify(response, null, 2));

    // エラーチェック
    if (!response) {
      throw new Error('PayPay APIからの応答がありません');
    }

    // レスポンスの型チェック
    if ('error' in response) {
      return NextResponse.json(
        { error: response.error || '決済の作成に失敗しました' },
        { status: 400 }
      );
    }

    // 成功レスポンスの構造チェック
    if (!response.resultInfo || response.resultInfo.code !== 'SUCCESS') {
      return NextResponse.json(
        { 
          error: response.resultInfo?.message || '決済の作成に失敗しました',
          details: response
        },
        { status: 400 }
      );
    }

    // データの存在チェック
    if (!response.data) {
      return NextResponse.json(
        { 
          error: '決済データが不正です',
          details: response
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        orderId,
        url: response.data.url,
        deepLink: response.data.deepLink,
        expiryDate: response.data.expiryDate,
        merchantPaymentId: response.data.merchantPaymentId,
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