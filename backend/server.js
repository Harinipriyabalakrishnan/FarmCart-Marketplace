import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./routes/products.js";

dotenv.config();

const app = express();

/* ---------------- MIDDLEWARE ---------------- */

app.use(cors());
app.use(express.json());

/* ---------------- DATABASE ---------------- */

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/farmcart";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

/* ---------------- USER MODEL ---------------- */

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  password: String,
  role: String,
  farmLocation: String,
});

const User = mongoose.model("User", UserSchema);

/* ---------------- ROUTES ---------------- */

app.get("/", (req, res) => {
  res.send("FarmCart API Running");
});

app.get("/test", (req, res) => {
  res.json({ message: "MongoDB working" });
});

/* PRODUCT ROUTES */

app.use("/api/products", productRoutes);

/* REGISTER USER */

app.post("/register", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();

    res.json({
      message: "User registered successfully",
      user,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* LOGIN USER */

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid password" });
    }

    res.json({
      message: "Login success",
      user,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ---------------- SERVER ---------------- */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});