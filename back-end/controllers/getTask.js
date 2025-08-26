import mongoose from "mongoose";
import Task from "../models/Tasks.js";

const getTasksByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid User ID" });
    }

    // Fetch tasks and populate user details (optional)
    const tasks = await Task.find({ user: userId }).populate("user", "name email");

    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    console.error("Error fetching tasks by user:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export default getTasksByUser;
