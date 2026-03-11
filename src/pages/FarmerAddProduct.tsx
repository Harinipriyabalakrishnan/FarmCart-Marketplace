import { useState } from "react";
import axios from "axios";

export default function FarmerAddProduct() {

  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
    image: ""
  });

  const handleChange = (e:any) => {

    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e:any) => {

    e.preventDefault();

    try {

      await axios.post(
        "https://farmcart-backend-hs8m.onrender.com/api/products",
        product
      );

      alert("Product added successfully");

    } catch (error) {

      console.error(error);

    }

  };

  return (

    <div className="p-10">

      <h1 className="text-2xl font-bold mb-6">
        Add Product
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">

        <input
          name="name"
          placeholder="Product Name"
          onChange={handleChange}
          className="border p-3 w-full"
        />

        <input
          name="price"
          placeholder="Price"
          onChange={handleChange}
          className="border p-3 w-full"
        />

        <input
          name="category"
          placeholder="Category"
          onChange={handleChange}
          className="border p-3 w-full"
        />

        <input
          name="stock"
          placeholder="Stock"
          onChange={handleChange}
          className="border p-3 w-full"
        />

        <input
          name="image"
          placeholder="Image URL"
          onChange={handleChange}
          className="border p-3 w-full"
        />

        <button className="bg-green-600 text-white px-6 py-3 rounded">
          Add Product
        </button>

      </form>

    </div>

  );

}
