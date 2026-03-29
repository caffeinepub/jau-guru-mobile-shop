import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star } from "lucide-react";
import { toast } from "sonner";
import type { Product } from "../backend.d";
import { useCart } from "../context/CartContext";

const CATEGORY_IMAGES: Record<string, string> = {
  repair: "/assets/uploads/images-019d3771-302a-7349-a7c7-6babc76e25be-1.jpeg",
  accessories: "https://placehold.co/300x300/6B21A8/white?text=Accessories",
  new: "https://placehold.co/300x300/4C1D95/white?text=New+Phone",
  used: "https://placehold.co/300x300/7C3AED/white?text=Used+Phone",
};

function getProductImage(product: Product): string {
  if (product.imageUrl?.startsWith("http")) return product.imageUrl;
  const cat = product.category.toLowerCase();
  for (const key of Object.keys(CATEGORY_IMAGES)) {
    if (cat.includes(key)) return CATEGORY_IMAGES[key];
  }
  return `https://placehold.co/300x300/6B21A8/white?text=${encodeURIComponent(product.name.slice(0, 12))}`;
}

interface ProductCardProps {
  product: Product;
  index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAdd = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div
      data-ocid={`product.item.${index}`}
      className="bg-white rounded-lg border border-gray-100 overflow-hidden card-hover shadow-xs group"
    >
      <div className="relative overflow-hidden">
        <img
          src={getProductImage(product)}
          alt={product.name}
          className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://placehold.co/300x300/6B21A8/white?text=Product";
          }}
        />
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Badge variant="destructive">Out of Stock</Badge>
          </div>
        )}
        <Badge className="absolute top-2 left-2 bg-primary text-white text-xs">
          {product.category}
        </Badge>
      </div>
      <div className="p-3">
        <h3 className="font-semibold text-gray-800 text-sm line-clamp-2 mb-1 min-h-[2.5rem]">
          {product.name}
        </h3>
        <div className="flex items-center gap-1 mb-2">
          {Array.from({ length: 5 }, (_, i) => i).map((i) => (
            <Star
              key={`star-${i}`}
              className={`w-3 h-3 ${
                i < Number(product.rating)
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-200"
              }`}
            />
          ))}
          <span className="text-xs text-gray-400 ml-1">
            {Number(product.rating)}.0
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-primary font-bold text-lg">
              ₹{Number(product.price).toLocaleString()}
            </p>
            <p className="text-green-600 text-xs font-medium">Free Delivery</p>
          </div>
          <Button
            data-ocid={`product.primary_button.${index}`}
            onClick={handleAdd}
            disabled={!product.inStock}
            size="sm"
            className="bg-accent text-accent-foreground hover:opacity-90 gap-1 text-xs font-semibold"
          >
            <ShoppingCart className="w-3 h-3" />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}
