import { useParams, Link } from "react-router-dom";
import { products } from "@/lib/mock-data";
import { useCartStore } from "@/lib/cart-store";
import { ArrowLeft, MapPin, Star, ShoppingCart, Truck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const addToCart = useCartStore((s) => s.addToCart);
  const [qty, setQty] = useState(1);

  if (!product) return <div className="flex min-h-[50vh] items-center justify-center text-muted-foreground">Product not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/marketplace" className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back to Marketplace
      </Link>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="aspect-square overflow-hidden rounded-2xl bg-accent flex items-center justify-center text-8xl">🌾</div>

        <div>
          <span className="inline-block rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">{product.category}</span>
          <h1 className="mt-3 font-heading text-3xl font-bold text-foreground">{product.name}</h1>
          <div className="mt-2 flex items-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{product.farmerLocation}</span>
            <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-warning text-warning" />{product.rating}</span>
          </div>
          <p className="mt-4 text-muted-foreground">{product.description}</p>

          <div className="mt-6 rounded-xl border border-border bg-card p-6">
            <p className="font-heading text-3xl font-bold text-foreground">₹{product.price.toLocaleString()}<span className="text-base font-normal text-muted-foreground">/{product.unit}</span></p>
            <p className="mt-1 text-sm text-success">Available: {product.quantity} {product.unit}</p>

            <div className="mt-4 flex items-center gap-3">
              <label className="text-sm font-medium text-foreground">Qty:</label>
              <div className="flex items-center rounded-lg border border-border">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-2 text-muted-foreground hover:text-foreground">−</button>
                <span className="min-w-[3rem] text-center text-sm font-medium">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="px-3 py-2 text-muted-foreground hover:text-foreground">+</button>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button onClick={() => { addToCart(product, qty); toast.success("Added to cart"); }}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl gradient-primary py-3 font-semibold text-primary-foreground hover:shadow-elevated">
                <ShoppingCart className="h-5 w-5" /> Add to Cart
              </button>
              <Link to="/cart" onClick={() => addToCart(product, qty)}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-primary py-3 font-semibold text-primary hover:bg-accent">
                Buy Now
              </Link>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-border p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-lg">👨‍🌾</div>
              <div>
                <p className="font-medium text-foreground">{product.farmer}</p>
                <p className="text-xs text-muted-foreground">Verified Farmer · {product.farmerLocation}</p>
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
            <Truck className="h-4 w-4" /> Delivery within 3-5 business days
          </div>
        </div>
      </div>
    </div>
  );
}
