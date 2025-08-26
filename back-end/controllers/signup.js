import User from "../models/User.js";
import bcrypt from "bcrypt";
import uploadFile from "../services/cloudinary.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const postUser = async (req, res) => {
  try {
    // Extract data
    const { username, email, password } = req.body;
    
    // Validate
    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Hash password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Handle image upload to Cloudinary
    let cloudinaryUrl = null;
    if (req.file) {
      try {
        // Upload to Cloudinary using the existing service
        cloudinaryUrl = await uploadFile(req.file.path);
      } catch (uploadError) {
        console.error("Cloudinary upload failed:", uploadError.message);
        // Continue without image if upload fails
        cloudinaryUrl = null;
      }
    }

    // Create user with Cloudinary URL
    const model = await User.create({
      username,
      email,
      password: hashedPassword,
      profileImage: cloudinaryUrl
    });
     const token = jwt.sign(
            { email: model.email },
            process.env.JWT_SECRET
        );

    res.status(201).json({
      message: "User created successfully",
      // userId: model._id,
      // profileImage: model.profileImage,
      data: model,
      token: token
    });
  } catch (error) {
    console.error("Error creating user:", error.message);
    res.status(500).json({ status: 500, error: error.message });
  }
};

export default postUser;
