import { toast } from "sonner";
import { useCartStore } from "@/lib/cart-store";
import { useNavigate } from "react-router-dom";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCartStore();
  const navigate = useNavigate();

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Order placed successfully! 🎉");
    clearCart();
    navigate("/order-history");
  };

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <h1 className="font-heading text-3xl font-bold text-foreground">Checkout</h1>

      <form onSubmit={handleCheckout} className="mt-8 space-y-6">
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="font-heading text-lg font-semibold text-foreground">Delivery Address</h2>
          <div className="mt-4 space-y-4">
            <input placeholder="Full Name" className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" required />
            <input placeholder="Phone Number" className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" required />
            <textarea placeholder="Full Address" rows={3} className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none" required />
            <div className="grid grid-cols-2 gap-3">
              <input placeholder="City" className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" required />
              <input placeholder="PIN Code" className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" required />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="font-heading text-lg font-semibold text-foreground">Payment Method</h2>
          <div className="mt-4 space-y-3">
            {["PayU Gateway", "Cash on Delivery", "UPI"].map((m) => (
              <label key={m} className="flex cursor-pointer items-center gap-3 rounded-lg border border-border p-3 hover:bg-muted">
                <input type="radio" name="payment" value={m} defaultChecked={m === "PayU Gateway"} className="accent-primary" />
                <span className="text-sm font-medium text-foreground">{m}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="font-heading text-lg font-semibold text-foreground">Order Summary</h2>
          <div className="mt-4 space-y-2">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{product.name} × {quantity}</span>
                <span className="text-foreground">₹{(product.price * quantity).toLocaleString()}</span>
              </div>
            ))}
            <div className="border-t border-border pt-3 flex justify-between font-heading font-bold text-foreground">
              <span>Total</span><span>₹{(totalPrice() + 200).toLocaleString()}</span>
            </div>
          </div>
        </div>

        <button type="submit" className="w-full rounded-xl gradient-primary py-4 font-semibold text-primary-foreground hover:shadow-elevated">
          Place Order — ₹{(totalPrice() + 200).toLocaleString()}
        </button>
      </form>
    </div>
  );
}
