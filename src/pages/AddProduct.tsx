import { useState } from "react";
import axios from "axios";

export default function AddProduct() {

  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    location: "",
    image: ""
  });

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    try {
      await axios.post("https://farmcart-backend-hs8m.onrender.com/api/products",form);
      alert("Product added successfully 🌾");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">

      <h1 className="text-2xl font-bold mb-6">
        Add Farm Product
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          placeholder="Product Name"
          className="w-full border p-3 rounded"
          onChange={(e)=>setForm({...form,name:e.target.value})}
        />

        <input
          placeholder="Price"
          className="w-full border p-3 rounded"
          onChange={(e)=>setForm({...form,price:e.target.value})}
        />

        <input
          placeholder="Category"
          className="w-full border p-3 rounded"
          onChange={(e)=>setForm({...form,category:e.target.value})}
        />

        <input
          placeholder="Farmer Location"
          className="w-full border p-3 rounded"
          onChange={(e)=>setForm({...form,location:e.target.value})}
        />

        <input
          placeholder="Image URL"
          className="w-full border p-3 rounded"
          onChange={(e)=>setForm({...form,image:e.target.value})}
        />

        <button className="bg-green-600 text-white px-6 py-3 rounded">
          Add Product
        </button>

      </form>
    </div>
  );
}
