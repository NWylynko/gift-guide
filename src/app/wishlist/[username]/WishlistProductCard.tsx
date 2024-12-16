"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Link from "next/link";
import { markAsGifted } from "./actions";

interface WishlistProductCardProps {
  product: {
    username: string;
    name: string;
    giftId: number;
    url: string;
    image: string | null;
    price: number | null;
    salePrice: number | null;
    createdAt: Date;
  };
}

export function WishlistProductCard({ product }: WishlistProductCardProps) {
  return (
    <Card className="overflow-hidden hover:scale-[1.01] transition-transform">
      {product.image ? (
        <Link href={product.url} target="_blank">
          <div className="w-full">
            <div className="aspect-square relative mb-4">
              <img src={product.image} alt={product.name} className="object-cover rounded-md size-full" />
            </div>
          </div>
        </Link>
      ) : null}
      <Link href={product.url} target="_blank">
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
          <div className="flex items-center gap-2">
            {product.price ? (
              product.salePrice ? (
                <>
                  <p className="text-sm text-gray-600 line-through">${(product.price / 100).toFixed(2)}</p>
                  <p className="text-sm font-semibold text-red-600">${(product.salePrice / 100).toFixed(2)}</p>
                </>
              ) : (
                <p className="text-sm text-gray-600">${(product.price / 100).toFixed(2)}</p>
              )
            ) : (
              <p className="text-sm text-gray-600">Price not available</p>
            )}
          </div>
        </CardContent>
      </Link>
      <CardFooter className="flex justify-between items-center">
        <Button variant="secondary" size="sm" asChild>
          <Link href={product.url} target="_blank">
            View
          </Link>
        </Button>
        <Button
          variant="default"
          size="sm"
          onClick={() => {
            markAsGifted(product.giftId);
          }}
        >
          Gifted 🎁
        </Button>
      </CardFooter>
    </Card>
  );
}
