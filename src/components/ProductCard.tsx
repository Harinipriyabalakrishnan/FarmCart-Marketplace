import type { Product } from "@/lib/mock-data";
import { ShoppingCart, MapPin, Star } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import { Link } from "react-router-dom";
import { toast } from "sonner";

/* IMPORT IMAGES */
import mango from "../assets/images/alphonso-mango.jpg";
import rice from "../assets/images/basmati-rice.jpg";
import cotton from "../assets/images/cotton-bales.jpg";
import chillies from "../assets/images/green-chillies.jpg";
import turmeric from "../assets/images/organic-turmeric.jpg";
import sugarcane from "../assets/images/sugarcane.jpg";
import tomatoes from "../assets/images/tomatoes.jpg";
import wheat from "../assets/images/wheat.jpg";

/* IMAGE MAP */
const productImages: Record<string, string> = {
  "Alphonso Mango": mango,
  "Basmati Rice": rice,
  "Cotton Bales": cotton,
  "Green Chillies": chillies,
  "Organic Turmeric": turmeric,
  "Sugarcane": sugarcane,
  "Tomato": tomatoes,
  "Tomatoes": tomatoes,
  "Wheat": wheat,
};

export default function ProductCard({ product }: { product: any }) {

  const addToCart = useCartStore((s) => s.addToCart);

  /* HANDLE BOTH id and _id */
  const productId = product._id || product.id;

  /* IMAGE FALLBACK */
  const image =
    productImages[product.name] ||
    product.image ||
    "/placeholder.svg";

  return (
    <div className="group overflow-hidden rounded-xl border border-border bg-card shadow-card transition-all hover:shadow-elevated">

      {/* IMAGE */}
      <Link to={`/product/${productId}`}>
        <div className="relative aspect-[4/3] overflow-hidden bg-accent">

          <img
            src={image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />

          <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-[10px] font-semibold text-primary-foreground">
            {product.category}
          </span>

        </div>
      </Link>

      <div className="p-4">

        {/* PRODUCT NAME */}
        <Link to={`/product/${productId}`}>
          <h3 className="font-heading text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* FARMER INFO */}
        <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">

          <MapPin className="h-3.5 w-3.5" />

          <span>
            {product.farmerLocation || product.farmer || "Local Farmer"}
          </span>

          <span className="mx-1">·</span>

          <Star className="h-3.5 w-3.5 fill-warning text-warning" />

          <span>
            {product.rating || "4.5"}
          </span>

        </div>

        {/* PRICE */}
        <div className="mt-3 flex items-end justify-between">

          <div>
            <p className="font-heading text-xl font-bold text-foreground">
              ₹{product.price}
            </p>

            <p className="text-xs text-muted-foreground">
              per {product.unit || "kg"}
            </p>
          </div>

          {/* ADD TO CART */}
          <button
            onClick={() => {
              addToCart(product);
              toast.success(`${product.name} added to cart`);
            }}
            className="rounded-lg gradient-primary p-2.5 text-primary-foreground transition-shadow hover:shadow-elevated"
          >
            <ShoppingCart className="h-4 w-4" />
          </button>

        </div>

      </div>
    </div>
  );
}
