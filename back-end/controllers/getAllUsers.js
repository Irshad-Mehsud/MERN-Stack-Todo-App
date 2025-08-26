import User from "../models/User.js";

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Exclude passwords
    res.status(200).json({
      message: "All users fetched successfully",
      count: users.length,
      data: users,
      token:req.token
    });
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ status: 500, error: error.message });
  }
};
export default getAllUsers;