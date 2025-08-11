import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@irshadcluster.w5dqwxs.mongodb.net/todo-app?retryWrites=true&w=majority`;

mongoose.connect(MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch(err => {
    console.error("❌ MongoDB connection error:", err.message);
    console.log("🔧 Check your .env file for correct DB_USER, DB_PASSWORD, and DB_NAME");
  });

export default mongoose;
