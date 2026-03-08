import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({

  firstName: String,
  lastName: String,

  email: {
    type: String,
    required: true,
    unique: true
  },

  phone: String,
  location: String,
  role: String,
  password: String

});

export default mongoose.model("User", UserSchema);