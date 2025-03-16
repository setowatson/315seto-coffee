import PAYPAY from '@paypayopa/paypayopa-sdk-node';

// 環境変数の確認
const apiKey = process.env.PAYPAY_API_KEY || '';
const apiSecret = process.env.PAYPAY_API_SECRET || '';
const merchantId = process.env.PAYPAY_MERCHANT_ID || '';
const environment = (process.env.PAYPAY_ENVIRONMENT as "STAGING" | "PROD") || 'STAGING';

// 環境変数のログ出力（APIキーとシークレットは一部のみ表示）
console.log('PayPay SDK Configuration:', {
  env: environment,
  clientId: apiKey ? `${apiKey.substring(0, 4)}...` : 'Not set',
  clientSecret: apiSecret ? `${apiSecret.substring(0, 4)}...` : 'Not set',
  merchantId: merchantId ? `${merchantId.substring(0, 4)}...` : 'Not set',
});

// PayPay APIの設定
PAYPAY.Configure({
  env: environment,
  clientId: apiKey,
  clientSecret: apiSecret,
  merchantId: merchantId,
});

interface PayPaySuccessResponse {
  resultInfo: {
    code: string;
    message: string;
  };
  data: {
    url: string;
    deepLink: string;
    expiryDate: string;
    merchantPaymentId: string;
  };
}

interface PayPayErrorResponse {
  resultInfo: {
    code: string;
    message: string;
  };
  error: string;
}

type PayPayResponse = PayPaySuccessResponse | PayPayErrorResponse;

// Web Payment決済を作成する関数
export const createQRCodePayment = async (
  orderId: string,
  amount: number,
  orderDescription: string,
  userAgent: string
): Promise<PayPayResponse> => {
  try {
    // Web Payment決済のリクエストを作成
    const payload = {
      merchantPaymentId: orderId,
      amount: {
        amount,
        currency: 'JPY',
      },
      codeType: 'ORDER_QR',
      orderDescription,
      isAuthorization: false,
      redirectUrl: `${process.env.NEXT_PUBLIC_API_URL}/checkout/complete`,
      redirectType: 'WEB_LINK',
      userAgent,
    };

    console.log('PayPay SDK Request Payload:', JSON.stringify(payload, null, 2));

    // Web Payment決済を作成
    const response = await PAYPAY.QRCodeCreate(payload);
    console.log('PayPay SDK Raw Response:', JSON.stringify(response, null, 2));

    return response as unknown as PayPayResponse;
  } catch (error) {
    console.error('PayPay payment creation error:', error);
    return {
      resultInfo: {
        code: 'ERROR',
        message: error instanceof Error ? error.message : '決済の作成に失敗しました',
      },
      error: 'PAYMENT_CREATION_FAILED'
    };
  }
};

// 決済状態を取得する関数
export const getPaymentDetails = async (merchantPaymentId: string) => {
  try {
    const response = await PAYPAY.GetCodePaymentDetails([merchantPaymentId]);
    return response;
  } catch (error) {
    console.error('PayPay payment details error:', error);
    throw error;
  }
};

// 決済をキャンセルする関数
export const cancelPayment = async (merchantPaymentId: string) => {
  try {
    const response = await PAYPAY.PaymentCancel([merchantPaymentId]);
    return response;
  } catch (error) {
    console.error('PayPay payment cancellation error:', error);
    throw error;
  }
};

// 決済を返金する関数
export const refundPayment = async (
  merchantPaymentId: string,
  amount: number,
  reason: string
) => {
  try {
    const payload = {
      merchantRefundId: `refund-${merchantPaymentId}-${Date.now()}`,
      paymentId: merchantPaymentId,
      amount: {
        amount,
        currency: 'JPY',
      },
      reason,
    };
    
    const response = await PAYPAY.PaymentRefund(payload);
    return response;
  } catch (error) {
    console.error('PayPay payment refund error:', error);
    throw error;
  }
};

export default PAYPAY; 