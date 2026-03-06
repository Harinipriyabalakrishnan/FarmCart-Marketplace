import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Menu, X, Leaf } from "lucide-react";
import { useState } from "react";
import { useCartStore } from "@/lib/cart-store";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/marketplace", label: "Marketplace" },
  { to: "/farmer-dashboard", label: "Farmer" },
  { to: "/buyer-dashboard", label: "Buyer" },
  { to: "/admin", label: "Admin" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const totalItems = useCartStore((s) => s.totalItems());

  return (
    <nav className="sticky top-0 z-50 border-b-2 border-green-200 bg-card/90 backdrop-blur-lg shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">

        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary shadow-sm">
            <Leaf className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-heading text-xl font-bold text-foreground">FarmCart</span>
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`rounded-lg px-4 py-2 text-sm font-medium border transition-all ${
                location.pathname === l.to
                  ? "bg-green-100 text-green-700 border-green-300 shadow-sm"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-green-200 hover:bg-muted"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/cart"
            className="relative rounded-lg border border-transparent p-2 text-muted-foreground transition-all hover:bg-muted hover:text-foreground hover:border-green-200"
          >
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-[10px] font-bold text-secondary-foreground">
                {totalItems}
              </span>
            )}
          </Link>

          <Link
            to="/login"
            className="hidden rounded-lg gradient-primary px-4 py-2 text-sm font-medium text-primary-foreground border border-green-300 shadow-sm transition hover:shadow-md md:block"
          >
            Sign In
          </Link>

          <button
            onClick={() => setOpen(!open)}
            className="rounded-lg border border-transparent p-2 text-muted-foreground md:hidden hover:bg-muted hover:border-green-200"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-green-200 md:hidden"
          >
            <div className="flex flex-col gap-2 p-4">
              {navLinks.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={`rounded-lg border px-4 py-3 text-sm font-medium ${
                    location.pathname === l.to
                      ? "bg-green-100 text-green-700 border-green-300"
                      : "border-transparent text-muted-foreground hover:border-green-200"
                  }`}
                >
                  {l.label}
                </Link>
              ))}

              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-lg gradient-primary border border-green-300 px-4 py-3 text-center text-sm font-medium text-primary-foreground"
              >
                Sign In
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
