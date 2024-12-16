import { Product } from "@/types/product";

export async function fetchProductDetails(url: string): Promise<Product> {
  // This is a mock function. In a real application, you would scrape the product details from the provided URL
  const mockProduct: Product = {
    id: Math.random().toString(36).substr(2, 9),
    name: "Sample Product",
    image: "/placeholder.svg?height=200&width=200",
    price: "$99.99",
    url: url,
    dateAdded: new Date(),
  };

  // Randomly add a sale price to some products
  if (Math.random() > 0.5) {
    const salePrice = (parseFloat(mockProduct.price.slice(1)) * 0.8).toFixed(2);
    mockProduct.salePrice = `$${salePrice}`;
  }

  return mockProduct;
}

