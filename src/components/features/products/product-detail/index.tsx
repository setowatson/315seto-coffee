import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Product } from '@/shared/types/product';
import { useCart } from '@/lib/cart-context';

interface ProductDetailProps {
  product: Product;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [selectedGrind, setSelectedGrind] = useState(product.grindOptions[0]);
  const [selectedWeight, setSelectedWeight] = useState(product.weightOptions[0]);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.imageUrl || '/images/coffee-placeholder.jpg',
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="aspect-square relative">
        <Image
          src={product.imageUrl || '/images/coffee-placeholder.jpg'}
          alt={product.name}
          fill
          className="object-cover rounded-lg"
        />
      </div>
      <div>
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        <p className="text-xl font-bold mb-6">¥{product.price.toLocaleString()}</p>
        <p className="text-gray-600 mb-6">{product.description}</p>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-3">挽き方</h3>
            <RadioGroup
              value={selectedGrind}
              onValueChange={setSelectedGrind}
              className="grid grid-cols-2 gap-4"
            >
              {product.grindOptions.map((grind) => (
                <div key={grind} className="flex items-center space-x-2">
                  <RadioGroupItem value={grind} id={`grind-${grind}`} />
                  <Label htmlFor={`grind-${grind}`}>{grind}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">内容量</h3>
            <RadioGroup
              value={selectedWeight.toString()}
              onValueChange={(value) => setSelectedWeight(Number(value))}
              className="grid grid-cols-2 gap-4"
            >
              {product.weightOptions.map((weight) => (
                <div key={weight} className="flex items-center space-x-2">
                  <RadioGroupItem value={weight.toString()} id={`weight-${weight}`} />
                  <Label htmlFor={`weight-${weight}`}>{weight}g</Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <Button onClick={handleAddToCart} className="w-full">
            カートに追加
          </Button>
        </div>
      </div>
    </div>
  );
} 