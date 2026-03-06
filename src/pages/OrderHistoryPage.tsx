import { orders } from "@/lib/mock-data";
import { Package, CheckCircle, Truck, Clock } from "lucide-react";

const statusConfig: Record<string, { icon: React.ReactNode; color: string }> = {
  delivered: { icon: <CheckCircle className="h-4 w-4" />, color: "text-success bg-success/10" },
  shipped: { icon: <Truck className="h-4 w-4" />, color: "text-info bg-info/10" },
  processing: { icon: <Package className="h-4 w-4" />, color: "text-warning bg-warning/10" },
  pending: { icon: <Clock className="h-4 w-4" />, color: "text-muted-foreground bg-muted" },
};

export default function OrderHistoryPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-heading text-3xl font-bold text-foreground">Order History</h1>
      <p className="mt-1 text-muted-foreground">Track your recent orders</p>

      <div className="mt-6 space-y-4">
        {orders.map((o) => {
          const sc = statusConfig[o.status];
          return (
            <div key={o.id} className="flex flex-col gap-3 rounded-xl border border-border bg-card p-5 shadow-card sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-heading font-semibold text-foreground">{o.product}</p>
                  <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${sc.color}`}>
                    {sc.icon} {o.status}
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">Order #{o.id} · {o.buyer} · {o.date}</p>
              </div>
              <div className="text-right">
                <p className="font-heading text-lg font-bold text-foreground">₹{o.total.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Qty: {o.quantity}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
