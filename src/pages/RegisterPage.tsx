import { useState } from "react";
import { Link } from "react-router-dom";
import { Leaf } from "lucide-react";
import axios from "axios";

export default function RegisterPage() {
  const [role, setRole] = useState<"farmer" | "buyer">("farmer");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    password: "",
  });

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/register", {
        ...formData,
        role,
      });

      alert("Account created successfully!");
      console.log(res.data);
    } catch (error) {
      console.error(error);
      alert("Registration failed");
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">

        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl gradient-primary">
            <Leaf className="h-7 w-7 text-primary-foreground" />
          </div>

          <h1 className="mt-4 text-2xl font-bold">Create account</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Join FarmCart as a farmer or buyer
          </p>
        </div>

        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>

          {/* Role toggle */}
          <div className="flex rounded-xl border p-1">
            {(["farmer", "buyer"] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`flex-1 rounded-lg py-2 ${
                  role === r ? "bg-green-600 text-white" : ""
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          <input
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className="w-full border p-3 rounded-lg"
          />

          <input
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className="w-full border p-3 rounded-lg"
          />

          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full border p-3 rounded-lg"
          />

          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="w-full border p-3 rounded-lg"
          />

          {role === "farmer" && (
            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Farm Location"
              className="w-full border p-3 rounded-lg"
            />
          )}

          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full border p-3 rounded-lg"
          />

          <button className="w-full bg-green-600 text-white py-3 rounded-lg">
            Create Account
          </button>
        </form>

        <p className="mt-6 text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-green-600">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
