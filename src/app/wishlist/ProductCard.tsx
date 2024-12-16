"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { removeGift } from "./actions";
import { format } from "date-fns";

interface ProductCardProps {
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
  view: "grid" | "list";
}

export function ProductCard({ product, view }: ProductCardProps) {
  return (
    <Card className={`overflow-hidden ${view === "list" ? "flex" : ""}`}>
      {product.image ? (
        <div className={`${view === "list" ? "w-1/4" : "w-full"}`}>
          <div className={`aspect-square relative ${view === "list" ? "h-full" : "mb-4"}`}>
            <img src={product.image} alt={product.name} className="object-cover rounded-md size-full" />
          </div>
        </div>
      ) : null}
      <div className={`${view === "list" ? "w-3/4 flex flex-col justify-between" : "w-full"}`}>
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
          <p className="text-xs text-gray-500 mt-2">Added on {format(product.createdAt, "MMMM d, yyyy")}</p>
        </CardContent>
        <CardFooter className="flex justify-end items-center">
          <Button variant="destructive" size="sm" onClick={() => removeGift(product.giftId)}>
            Remove
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}
