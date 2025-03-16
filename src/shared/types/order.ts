export interface ShippingInfo {
  fullName: string;
  postalCode: string;
  prefecture: string;
  city: string;
  address: string;
  building: string;
  phone: string;
  email: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  grindType: string;
}

export interface Order {
  orderId: string;
  orderDate: string;
  shippingInfo: ShippingInfo;
  items: CartItem[];
  totalAmount: number;
  paymentMethod: string;
  status: string;
}

export interface PayPayResponse {
  success: boolean;
  data: {
    orderId: string;
    paymentUrl: string;
    deepLink: string;
    expiryDate: string;
    merchantPaymentId: string;
  };
  error?: string;
} 