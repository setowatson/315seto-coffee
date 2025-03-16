export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
  grindOptions: string[];
  weightOptions: number[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductVariant {
  id: string;
  productId: string;
  grindType: string;
  weight: number;
  price: number;
  stock: number;
} 