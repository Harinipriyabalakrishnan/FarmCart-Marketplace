import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Leaf } from "lucide-react";
import axios from "axios";

export default function LoginPage() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e:any) => {
    e.preventDefault();

    try {

      const res = await axios.post("https://farmcart-backend-hs8m.onrender.com/login", {
        email,
        password
      });

      alert("Login successful!");

      console.log(res.data);

      // ✅ Save user session
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // ✅ Redirect based on role
      if(res.data.user.role === "farmer"){
        navigate("/farmer-dashboard")
      }
      else if(res.data.user.role === "buyer"){
        navigate("/buyer-dashboard")
      }
      else if(res.data.user.role === "admin"){
        navigate("/admin")
      }

    } catch (error) {

      console.error(error);
      alert("Invalid email or password");

    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">

        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-green-600">
            <Leaf className="h-7 w-7 text-white" />
          </div>

          <h1 className="mt-4 text-2xl font-bold">Welcome back</h1>
          <p className="mt-1 text-sm text-gray-500">
            Sign in to your FarmCart account
          </p>
        </div>

        <form className="mt-8 space-y-4" onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="w-full border p-3 rounded-lg"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className="w-full border p-3 rounded-lg"
            required
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg"
          >
            Sign In
          </button>

        </form>

        <p className="mt-6 text-center text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="text-green-600">
            Create account
          </Link>
        </p>

      </div>
    </div>
  );
}
