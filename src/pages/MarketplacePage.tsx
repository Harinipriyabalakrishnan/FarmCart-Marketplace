import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { products } from "@/lib/mock-data";
import ProductCard from "@/components/ProductCard";

const categories = ["All", "Grains", "Vegetables", "Fruits", "Cash Crops", "Spices"];

export default function MarketplacePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("name");

  const filtered = products
    .filter((p) => (category === "All" || p.category === category) && p.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => sortBy === "price-low" ? a.price - b.price : sortBy === "price-high" ? b.price - a.price : a.name.localeCompare(b.name));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-foreground">Marketplace</h1>
        <p className="mt-1 text-muted-foreground">Browse fresh produce directly from farmers</p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search crops..."
            className="w-full rounded-xl border border-input bg-background py-2.5 pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div className="flex items-center gap-3">
          <div className="flex gap-2 overflow-x-auto">
            {categories.map((c) => (
              <button key={c} onClick={() => setCategory(c)}
                className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-colors ${category === c ? "gradient-primary text-primary-foreground" : "border border-border bg-card text-muted-foreground hover:text-foreground"}`}>
                {c}
              </button>
            ))}
          </div>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
            className="rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground">
            <option value="name">Name</option>
            <option value="price-low">Price: Low</option>
            <option value="price-high">Price: High</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
      {filtered.length === 0 && (
        <div className="py-20 text-center text-muted-foreground">No products found matching your criteria.</div>
      )}
    </div>
  );
}
