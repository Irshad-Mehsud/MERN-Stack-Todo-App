import User from "../models/User.js";
import bcrypt from "bcrypt";

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

    // Handle image (from multer)
    let profileImagePath = null;
    if (req.file) {
      profileImagePath = req.file.filename; // or `req.file.path` if you want full path
    }

    // Create user
    const model = await User.create({
      username,
      email,
      password: hashedPassword,
      profileImage: profileImagePath
    });

    res.status(201).json({
      message: "User created successfully",
      userId: model._id,
       profileImage: user.profileImage
    ? `http://localhost:5000/uploads/${user.profileImage}`
    : null,
      data: model
    });
  } catch (error) {
    console.error("Error creating user:", error.message);
    res.status(500).json({ status: 500, error: error.message });
  }
};

export default postUser;
