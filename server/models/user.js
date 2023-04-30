import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: false },
  occupation: { type: String, required: false },
  mobile: { type: String, required: false },
  address: { type: String, required: false },
  imageFile: { type: String, required: false },
  googleId: { type: String, required: false },
  id: { type: String },
});

export default mongoose.model("User", userSchema);
