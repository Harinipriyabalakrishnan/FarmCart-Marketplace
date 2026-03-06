import { Link, useLocation } from "react-router-dom";
import { Home, Store, BarChart3, ShoppingCart, User } from "lucide-react";

const tabs = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/marketplace", icon: Store, label: "Market" },
  { to: "/farmer-dashboard", icon: BarChart3, label: "Farm" },
  { to: "/cart", icon: ShoppingCart, label: "Cart" },
  { to: "/login", icon: User, label: "Account" },
];

export default function MobileNav() {
  const location = useLocation();
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 backdrop-blur-lg md:hidden">
      <div className="flex items-center justify-around py-2">
        {tabs.map((t) => {
          const active = location.pathname === t.to;
          return (
            <Link key={t.to} to={t.to} className={`flex flex-col items-center gap-1 px-3 py-1 ${active ? "text-primary" : "text-muted-foreground"}`}>
              <t.icon className="h-5 w-5" />
              <span className="text-[10px] font-medium">{t.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
