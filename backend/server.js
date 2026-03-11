import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import productRoutes from "./routes/products.js";
import User from "./models/User.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

/* ================= DATABASE ================= */

const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

/* ================= HOME ================= */

app.get("/", (req, res) => {
  res.send("FarmCart API Running");
});

/* ================= PRODUCTS ================= */

app.use("/api/products", productRoutes);

/* ================= REGISTER ================= */

app.post("/register", async (req, res) => {

  try {

    const {
      firstName,
      lastName,
      email,
      phone,
      password,
      role,
      farmLocation
    } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name: `${firstName} ${lastName}`,
      email,
      phone,
      password: hashedPassword,
      role,
      farmLocation
    });

    await newUser.save();

    res.json({
      message: "User registered successfully",
      user: newUser
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Registration failed"
    });

  }

});

/* ================= LOGIN ================= */

app.post("/login", async (req, res) => {

  const { email, password } = req.body;

  try {

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found"
      });
    }

    let isMatch = false;

    /* check bcrypt password */
    if (user.password.startsWith("$2b$")) {
      isMatch = await bcrypt.compare(password, user.password);
    }

    /* check plain password (for old users) */
    if (!isMatch && user.password === password) {
      isMatch = true;
    }

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password"
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || "farmcartsecret",
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
      user
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server error"
    });

  }

});

/* ================= SERVER ================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
