import User from "../models/User.js";
import bcrypt from "bcrypt";

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check password (await is important!)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Remove password from returned object
    const { password: _, ...userData } = user.toObject();

    res.status(200).json({
      message: "User login successful",
      data: userData
    });

  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({
      status: 500,
      error: error.message
    });
  }
};

export default loginUser;
