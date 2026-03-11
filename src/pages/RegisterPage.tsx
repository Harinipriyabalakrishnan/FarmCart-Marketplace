import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Leaf } from "lucide-react";
import axios from "axios";

export default function RegisterPage() {

  const navigate = useNavigate();

  const [role, setRole] = useState<"farmer" | "buyer">("farmer");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    farmLocation: "",
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

      const res = await axios.post(
        "https://farmcart-backend-hs8m.onrender.com/register",
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          farmLocation: formData.farmLocation,
          role: role,
        }
      );

      console.log(res.data);

      const user = res.data.user;

      // Save user session
      localStorage.setItem("user", JSON.stringify(user));

      alert("Account created successfully!");

      // Redirect directly based on role
      if (user.role === "farmer") {
        navigate("/farmer-dashboard");
      } else if (user.role === "buyer") {
        navigate("/buyer-dashboard");
      }

    } catch (error: any) {

      console.error(error.response?.data || error);

      alert(error.response?.data?.message || "Registration failed");

    }

  };

  const backgroundImage =
    role === "farmer"
      ? "/farmerregisteration.jpg"
      : "/buyerregisterpage.jpg";

  return (
    <div
      className="relative flex min-h-screen items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >

      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 w-full max-w-md bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-lg">

        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-green-600">
            <Leaf className="h-7 w-7 text-white" />
          </div>

          <h1 className="mt-4 text-2xl font-bold">Create account</h1>
          <p className="mt-1 text-sm text-gray-600">
            Join FarmCart as a farmer or buyer
          </p>
        </div>

        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>

          {/* Role Toggle */}
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
            required
          />

          <input
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className="w-full border p-3 rounded-lg"
            required
          />

          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full border p-3 rounded-lg"
            required
          />

          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="w-full border p-3 rounded-lg"
            required
          />

          {role === "farmer" && (
            <input
              name="farmLocation"
              value={formData.farmLocation}
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
            required
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
          >
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
