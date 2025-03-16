'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Product } from '@/shared/types/product';
import { useCart } from '@/lib/cart-context';
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Coffee } from "lucide-react";
import { Input } from "@/components/ui/input";

interface ProductDetailProps {
  product: Product;
}

// 挽き方ごとの価格設定
type GrindType = "豆のまま" | "挽いた状態" | "ドリップバッグ";

const GRIND_PRICES: Record<GrindType, number> = {
  "豆のまま": 1300,
  "挽いた状態": 1500,
  "ドリップバッグ": 2000
};

export function ProductDetail({ product }: ProductDetailProps) {
  const [selectedGrind, setSelectedGrind] = useState<GrindType>("豆のまま");
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(GRIND_PRICES["豆のまま"]);
  const { addToCart } = useCart();
  const { toast } = useToast();

  // 挽き方が変更されたときに価格を更新
  useEffect(() => {
    setPrice(GRIND_PRICES[selectedGrind]);
  }, [selectedGrind]);

  const handleQuantityChange = (value: number) => {
    if (value >= 1 && value <= 10) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    try {
      addToCart(
        {
          id: product.id,
          name: product.name,
          price: price,
          image: product.imageUrl,
          grindType: selectedGrind,
        },
        quantity
      );

      toast({
        title: "カートに追加しました",
        description: `${product.name} × ${quantity}個をカートに追加しました。`,
        duration: 3000,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "エラー",
        description: "カートへの追加に失敗しました。",
        duration: 3000,
      });
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-start">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{product.name}</h1>
          <p className="mt-4 text-muted-foreground">
            コーヒーの奥深い世界への「最初の一歩」をテーマにした特別なブレンド。
            2種類のシングルオリジンを絶妙な配合でブレンドし、深煎りと浅煎りの絶妙なバランスをお楽しみいただけます。
          </p>
        </div>

        <div className="aspect-square overflow-hidden rounded-lg">
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={600}
            height={600}
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      <div className="space-y-6">
        <Card>
          <CardContent className="p-6 space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-4">商品情報</h2>
              <div className="text-2xl font-bold mb-4">¥{price.toLocaleString()}</div>
              <p className="text-sm text-muted-foreground mb-6">
                {selectedGrind === "ドリップバッグ" ? "5杯分 / 1パック" : "100g / 1パック"}
              </p>
            </div>

            <div className="space-y-4">
              <Label className="text-base">コーヒーの状態</Label>
              <RadioGroup 
                value={selectedGrind} 
                onValueChange={(value: GrindType) => setSelectedGrind(value)} 
                className="grid grid-cols-3 gap-4"
              >
                <div>
                  <RadioGroupItem value="豆のまま" id="beans" className="peer sr-only" />
                  <Label
                    htmlFor="beans"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <Coffee className="mb-3 h-6 w-6" />
                    <span className="text-center">豆のまま</span>
                    <span className="text-sm font-medium mt-2">¥1,300</span>
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="挽いた状態" id="ground" className="peer sr-only" />
                  <Label
                    htmlFor="ground"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mb-3 h-6 w-6"
                    >
                      <path d="M2 12h10" />
                      <path d="M9 4v16" />
                      <path d="M3 9v6" />
                      <path d="M13 4h7a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-7" />
                    </svg>
                    <span className="text-center">挽いた状態</span>
                    <span className="text-sm font-medium mt-2">¥1,500</span>
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="ドリップバッグ" id="drip" className="peer sr-only" />
                  <Label
                    htmlFor="drip"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mb-3 h-6 w-6"
                    >
                      <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
                      <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
                      <line x1="6" x2="6" y1="2" y2="4" />
                      <line x1="10" x2="10" y1="2" y2="4" />
                      <line x1="14" x2="14" y1="2" y2="4" />
                    </svg>
                    <span className="text-center">ドリップバッグ</span>
                    <span className="text-sm font-medium mt-2">¥2,000</span>
                    <span className="text-xs text-muted-foreground">(5杯分)</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity" className="text-base">数量</Label>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                >
                  -
                </Button>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  max="10"
                  value={quantity}
                  onChange={(e) => handleQuantityChange(Number(e.target.value))}
                  className="w-20 text-center"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= 10}
                >
                  +
                </Button>
              </div>
            </div>

            <div className="pt-4">
              <div className="text-lg font-semibold mb-4">
                合計: ¥{(price * quantity).toLocaleString()}
              </div>
              <Button
                onClick={handleAddToCart}
                className="w-full bg-amber-700 hover:bg-amber-800"
                size="lg"
              >
                カートに追加
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 space-y-4">
            <h3 className="font-medium">商品詳細</h3>
            <div className="prose max-w-none">
              {product.description.split('\n').map((paragraph, index) => (
                <p key={index} className="text-sm text-gray-600 mb-2">{paragraph}</p>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 