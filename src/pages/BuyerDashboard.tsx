import { ShoppingBag, Package, Clock, DollarSign } from "lucide-react";
import StatCard from "@/components/StatCard";
import { orders } from "@/lib/mock-data";
import { Link } from "react-router-dom";

export default function BuyerDashboard() {
  return (
    <div className="container mx-auto px-4 py-8 pb-24 md:pb-8">
      <h1 className="font-heading text-3xl font-bold text-foreground">Buyer Dashboard</h1>
      <p className="mt-1 text-muted-foreground">Welcome back, Buyer</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Orders" value="24" change="+3 this month" icon={<ShoppingBag className="h-5 w-5" />} trend="up" />
        <StatCard title="Total Spent" value="₹1,42,500" change="+8% from last month" icon={<DollarSign className="h-5 w-5" />} trend="up" />
        <StatCard title="Active Orders" value="3" icon={<Package className="h-5 w-5" />} />
        <StatCard title="Pending Delivery" value="2" icon={<Clock className="h-5 w-5" />} />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-6 shadow-card">
          <div className="flex items-center justify-between">
            <h3 className="font-heading text-lg font-semibold text-foreground">Recent Orders</h3>
            <Link to="/order-history" className="text-sm text-primary hover:underline">View all</Link>
          </div>
          <div className="mt-4 space-y-3">
            {orders.map((o) => (
              <div key={o.id} className="flex items-center justify-between rounded-lg bg-muted p-3">
                <div>
                  <p className="text-sm font-medium text-foreground">{o.product}</p>
                  <p className="text-xs text-muted-foreground">{o.date}</p>
                </div>
                <span className={`text-xs font-medium capitalize ${o.status === "delivered" ? "text-success" : o.status === "shipped" ? "text-info" : "text-warning"}`}>{o.status}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 shadow-card">
          <h3 className="font-heading text-lg font-semibold text-foreground">Quick Actions</h3>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <Link to="/marketplace" className="flex flex-col items-center rounded-xl border border-border p-6 text-center transition-colors hover:bg-accent">
              <span className="text-3xl">🛒</span>
              <span className="mt-2 text-sm font-medium text-foreground">Browse Market</span>
            </Link>
            <Link to="/order-history" className="flex flex-col items-center rounded-xl border border-border p-6 text-center transition-colors hover:bg-accent">
              <span className="text-3xl">📦</span>
              <span className="mt-2 text-sm font-medium text-foreground">Track Orders</span>
            </Link>
            <Link to="/cart" className="flex flex-col items-center rounded-xl border border-border p-6 text-center transition-colors hover:bg-accent">
              <span className="text-3xl">🛍️</span>
              <span className="mt-2 text-sm font-medium text-foreground">My Cart</span>
            </Link>
            <Link to="/" className="flex flex-col items-center rounded-xl border border-border p-6 text-center transition-colors hover:bg-accent">
              <span className="text-3xl">❤️</span>
              <span className="mt-2 text-sm font-medium text-foreground">Favorites</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
