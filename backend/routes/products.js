import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

/* ADD PRODUCT */

router.post("/", async (req, res) => {

  try {

    const product = new Product(req.body);

    await product.save();

    res.json(product);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

});

/* GET ALL PRODUCTS */

router.get("/", async (req, res) => {

  const products = await Product.find();

  res.json(products);

});

export default router;
