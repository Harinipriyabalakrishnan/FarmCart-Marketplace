import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  location: String,
  image: String
});

const Product = mongoose.model("Product", ProductSchema);

export default Product;