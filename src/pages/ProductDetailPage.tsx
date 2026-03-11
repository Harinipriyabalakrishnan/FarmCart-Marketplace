import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ProductPage() {

  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {

    axios
      .get("https://farmcart-backend-hs8m.onrender.com/api/products")
      .then((res) => {

        const found = res.data.find((p:any) => p._id === id);
        setProduct(found);

      });

  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (

    <div className="container mx-auto p-8">

      <img src={product.image} className="w-96 rounded-xl" />

      <h1 className="text-3xl font-bold mt-4">{product.name}</h1>

      <p className="text-xl text-green-600 mt-2">₹{product.price}</p>

      <p className="mt-2">Category: {product.category}</p>

      <p className="mt-2">Farmer: {product.farmer}</p>

      <p className="mt-2">Stock: {product.stock}</p>

    </div>
  );
}