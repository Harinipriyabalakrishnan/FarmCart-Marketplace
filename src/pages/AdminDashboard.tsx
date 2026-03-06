import { Users, Store, ShoppingBag, AlertTriangle, DollarSign, TrendingUp } from "lucide-react";
import StatCard from "@/components/StatCard";
import { orders, products } from "@/lib/mock-data";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const analyticsData = [
  { month: "Jan", farmers: 120, buyers: 340 },
  { month: "Feb", farmers: 135, buyers: 380 },
  { month: "Mar", farmers: 150, buyers: 420 },
  { month: "Apr", farmers: 168, buyers: 465 },
  { month: "May", farmers: 180, buyers: 510 },
  { month: "Jun", farmers: 195, buyers: 560 },
];

export default function AdminDashboard() {
  return (
    <div className="container mx-auto px-4 py-8 pb-24 md:pb-8">
      <h1 className="font-heading text-3xl font-bold text-foreground">Admin Dashboard</h1>
      <p className="mt-1 text-muted-foreground">Platform overview and management</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Farmers" value="5,234" change="+15 this week" icon={<Users className="h-5 w-5" />} trend="up" />
        <StatCard title="Total Buyers" value="12,560" change="+42 this week" icon={<Store className="h-5 w-5" />} trend="up" />
        <StatCard title="Total Orders" value="3,847" change="+128 this month" icon={<ShoppingBag className="h-5 w-5" />} trend="up" />
        <StatCard title="Revenue" value="₹2.5 Cr" change="+18% growth" icon={<DollarSign className="h-5 w-5" />} trend="up" />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-6 shadow-card">
          <h3 className="font-heading text-lg font-semibold text-foreground">User Growth</h3>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analyticsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(90, 15%, 88%)" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="farmers" fill="hsl(142, 55%, 35%)" radius={[4, 4, 0, 0]} name="Farmers" />
                <Bar dataKey="buyers" fill="hsl(36, 60%, 50%)" radius={[4, 4, 0, 0]} name="Buyers" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 shadow-card">
          <div className="flex items-center justify-between">
            <h3 className="font-heading text-lg font-semibold text-foreground">Recent Orders</h3>
          </div>
          <div className="mt-4 space-y-3">
            {orders.map((o) => (
              <div key={o.id} className="flex items-center justify-between rounded-lg bg-muted p-3">
                <div>
                  <p className="text-sm font-medium text-foreground">{o.product}</p>
                  <p className="text-xs text-muted-foreground">{o.buyer} · {o.date}</p>
                </div>
                <p className="text-sm font-bold text-foreground">₹{o.total.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Listings Management */}
      <div className="mt-8 rounded-xl border border-border bg-card p-6 shadow-card">
        <div className="flex items-center justify-between">
          <h3 className="font-heading text-lg font-semibold text-foreground">Product Listings</h3>
          <span className="text-sm text-muted-foreground">{products.length} active</span>
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-muted-foreground">
                <th className="pb-3 font-medium">Product</th>
                <th className="pb-3 font-medium">Farmer</th>
                <th className="pb-3 font-medium">Price</th>
                <th className="pb-3 font-medium">Location</th>
                <th className="pb-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-b border-border last:border-0">
                  <td className="py-3 font-medium text-foreground">{p.name}</td>
                  <td className="py-3 text-muted-foreground">{p.farmer}</td>
                  <td className="py-3 text-foreground">₹{p.price}</td>
                  <td className="py-3 text-muted-foreground">{p.farmerLocation}</td>
                  <td className="py-3">
                    <button className="rounded-lg bg-destructive/10 px-3 py-1.5 text-xs font-medium text-destructive hover:bg-destructive/20">Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
