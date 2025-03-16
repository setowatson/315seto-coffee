import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Product } from '@/shared/types/product';

interface ProductListProps {
  products: Product[];
}

export function ProductList({ products }: ProductListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <Card key={product.id} className="flex flex-col">
          <CardContent className="p-4">
            <div className="aspect-square relative mb-4">
              <Image
                src={product.imageUrl || '/images/coffee-placeholder.jpg'}
                alt={product.name}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
            <p className="text-sm text-gray-600 mb-2">{product.description}</p>
            <p className="text-lg font-bold">¥{product.price.toLocaleString()}</p>
          </CardContent>
          <CardFooter className="p-4 pt-0 mt-auto">
            <Link href={`/purchase/${product.id}`} className="w-full">
              <Button className="w-full">
                詳細を見る
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
} 