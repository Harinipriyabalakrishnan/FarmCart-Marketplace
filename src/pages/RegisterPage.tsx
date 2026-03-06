import { useState } from "react";
import { Link } from "react-router-dom";
import { Leaf } from "lucide-react";
import axios from "axios";

const registerUser = async (userData: any) => {
  try {
    const response = await axios.post("http://localhost:5000/register", userData);
    console.log("User registered:", response.data);
  } catch (error) {
    console.error("Error registering user:", error);
  }
};

export default function RegisterPage() {
  const [role, setRole] = useState<"farmer" | "buyer">("farmer");

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl gradient-primary">
            <Leaf className="h-7 w-7 text-primary-foreground" />
          </div>
          <h1 className="mt-4 font-heading text-2xl font-bold text-foreground">Create account</h1>
          <p className="mt-1 text-sm text-muted-foreground">Join FarmCart as a farmer or buyer</p>
        </div>

        <form className="mt-8 space-y-4" onSubmit={(e) => e.preventDefault()}>
          {/* Role Toggle */}
          <div className="flex rounded-xl border border-border p-1">
            {(["farmer", "buyer"] as const).map((r) => (
              <button key={r} type="button" onClick={() => setRole(r)}
                className={`flex-1 rounded-lg py-2.5 text-sm font-medium capitalize transition-all ${role === r ? "gradient-primary text-primary-foreground shadow-card" : "text-muted-foreground"}`}>
                {r === "farmer" ? "🌾 " : "🛒 "}{r}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">First Name</label>
              <input type="text" placeholder="Rajesh" className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Last Name</label>
              <input type="text" placeholder="Kumar" className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Email</label>
            <input type="email" placeholder="farmer@example.com" className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Phone</label>
            <input type="tel" placeholder="+91 98765 43210" className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          {role === "farmer" && (
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Farm Location</label>
              <input type="text" placeholder="Village, District, State" className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
          )}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Password</label>
            <input type="password" placeholder="••••••••" className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <button type="submit" className="w-full rounded-xl gradient-primary py-3 text-sm font-semibold text-primary-foreground transition-shadow hover:shadow-elevated">
            Create Account
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account? <Link to="/login" className="font-medium text-primary hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
