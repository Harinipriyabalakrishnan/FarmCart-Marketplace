import { useCartStore } from "@/lib/cart-store";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, clearCart, totalPrice } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <ShoppingBag className="h-16 w-16 text-muted-foreground/50" />
        <h2 className="mt-4 font-heading text-xl font-bold text-foreground">Your cart is empty</h2>
        <p className="mt-2 text-sm text-muted-foreground">Browse the marketplace to add products</p>
        <Link to="/marketplace" className="mt-6 rounded-xl gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:shadow-elevated">
          Browse Marketplace
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-heading text-3xl font-bold text-foreground">Shopping Cart</h1>
      <p className="mt-1 text-muted-foreground">{items.length} item{items.length > 1 ? "s" : ""}</p>

      <div className="mt-6 grid gap-8 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="flex gap-4 rounded-xl border border-border bg-card p-4 shadow-card">
              <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-accent text-3xl shrink-0">🌾</div>
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <h3 className="font-heading font-semibold text-foreground">{product.name}</h3>
                  <p className="text-xs text-muted-foreground">{product.farmerLocation} · ₹{product.price}/{product.unit}</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center rounded-lg border border-border">
                    <button onClick={() => updateQuantity(product.id, quantity - 1)} className="p-1.5 text-muted-foreground hover:text-foreground"><Minus className="h-3.5 w-3.5" /></button>
                    <span className="min-w-[2rem] text-center text-sm font-medium">{quantity}</span>
                    <button onClick={() => updateQuantity(product.id, quantity + 1)} className="p-1.5 text-muted-foreground hover:text-foreground"><Plus className="h-3.5 w-3.5" /></button>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="font-heading font-bold text-foreground">₹{(product.price * quantity).toLocaleString()}</p>
                    <button onClick={() => { removeFromCart(product.id); toast.info("Removed from cart"); }} className="text-destructive hover:text-destructive/80"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="h-fit rounded-xl border border-border bg-card p-6 shadow-card">
          <h3 className="font-heading text-lg font-semibold text-foreground">Order Summary</h3>
          <div className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between text-muted-foreground"><span>Subtotal</span><span>₹{totalPrice().toLocaleString()}</span></div>
            <div className="flex justify-between text-muted-foreground"><span>Delivery</span><span>₹200</span></div>
            <div className="border-t border-border pt-3 flex justify-between font-heading font-bold text-foreground">
              <span>Total</span><span>₹{(totalPrice() + 200).toLocaleString()}</span>
            </div>
          </div>
          <Link to="/checkout" className="mt-6 block rounded-xl gradient-primary py-3 text-center text-sm font-semibold text-primary-foreground hover:shadow-elevated">
            Proceed to Checkout
          </Link>
          <button onClick={() => { clearCart(); toast.info("Cart cleared"); }} className="mt-3 w-full text-center text-sm text-destructive hover:underline">
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
}
