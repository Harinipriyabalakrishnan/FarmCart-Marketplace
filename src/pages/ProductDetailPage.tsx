import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ProductDetailPage() {

  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {

    const fetchProduct = async () => {
      try {

        const res = await axios.get(
          "https://farmcart-backend-hs8m.onrender.com/api/products"
        );

        const found = res.data.find((p: any) => p._id === id);

        setProduct(found);

      } catch (error) {
        console.error("Error fetching product", error);
      }
    };

    fetchProduct();

  }, [id]);

  if (!product) {
    return (
      <div className="p-10 text-center text-lg">
        Loading product...
      </div>
    );
  }

  return (

    <div className="container mx-auto p-10">

      <div className="grid md:grid-cols-2 gap-10">

        <img
          src={product.image}
          alt={product.name}
          className="w-full max-w-md rounded-xl shadow-lg"
        />

        <div>

          <h1 className="text-4xl font-bold">{product.name}</h1>

          <p className="text-2xl text-green-600 mt-4">
            ₹{product.price}
          </p>

          <p className="mt-4">
            <b>Category:</b> {product.category}
          </p>

          <p className="mt-2">
            <b>Farmer:</b> {product.farmer}
          </p>

          <p className="mt-2">
            <b>Available Stock:</b> {product.stock}
          </p>

          <button className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700">
            Add to Cart
          </button>

        </div>

      </div>

    </div>

  );
}
