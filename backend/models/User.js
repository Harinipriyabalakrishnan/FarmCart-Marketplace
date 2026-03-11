import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: ["buyer", "farmer", "admin"],
    default: "buyer"
  }
});

export default mongoose.model("User", userSchema);
