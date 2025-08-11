import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  profileImage: String, // store the image filename or URL
});

export default mongoose.model("User", userSchema);
