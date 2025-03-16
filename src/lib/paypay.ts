import PAYPAY from '@paypayopa/paypayopa-sdk-node';

// PayPay APIの設定
PAYPAY.Configure({
  env: (process.env.PAYPAY_ENVIRONMENT as "STAGING" | "PROD") || 'STAGING',
  clientId: process.env.PAYPAY_API_KEY || '',
  clientSecret: process.env.PAYPAY_API_SECRET || '',
  merchantId: process.env.PAYPAY_MERCHANT_ID || '',
});

// QRコード決済を作成する関数
export const createQRCodePayment = async (
  orderId: string,
  amount: number,
  orderDescription: string,
  userAgent: string
) => {
  try {
    // QRコード決済のリクエストを作成
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

    // QRコード決済を作成
    const response = await PAYPAY.QRCodeCreate(payload);
    return response;
  } catch (error) {
    console.error('PayPay QR Code creation error:', error);
    throw error;
  }
};

// 決済状態を取得する関数
export const getPaymentDetails = async (merchantPaymentId: string) => {
  try {
    // PayPay APIの型定義に合わせて配列として渡す
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
    // PayPay APIの正しいメソッド名と引数形式を使用
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
    
    // PayPay APIの正しいメソッド名を使用
    const response = await PAYPAY.PaymentRefund(payload);
    return response;
  } catch (error) {
    console.error('PayPay payment refund error:', error);
    throw error;
  }
};

export default PAYPAY; 