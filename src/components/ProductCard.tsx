import type { Product } from "@/lib/mock-data";
import { ShoppingCart, MapPin, Star } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function ProductCard({ product }: { product: Product }) {
  const addToCart = useCartStore((s) => s.addToCart);

  return (
    <div className="group overflow-hidden rounded-xl border border-border bg-card shadow-card transition-all hover:shadow-elevated">
      <Link to={`/product/${product.id}`}>
        <div className="relative aspect-[4/3] overflow-hidden bg-accent">
          <div className="flex h-full items-center justify-center text-6xl">🌾</div>
          <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-[10px] font-semibold text-primary-foreground">{product.category}</span>
        </div>
      </Link>
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-heading text-lg font-semibold text-foreground group-hover:text-primary transition-colors">{product.name}</h3>
        </Link>
        <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" />
          <span>{product.farmerLocation}</span>
          <span className="mx-1">·</span>
          <Star className="h-3.5 w-3.5 fill-warning text-warning" />
          <span>{product.rating}</span>
        </div>
        <div className="mt-3 flex items-end justify-between">
          <div>
            <p className="font-heading text-xl font-bold text-foreground">₹{product.price.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">per {product.unit}</p>
          </div>
          <button
            onClick={() => { addToCart(product); toast.success(`${product.name} added to cart`); }}
            className="rounded-lg gradient-primary p-2.5 text-primary-foreground transition-shadow hover:shadow-elevated"
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
