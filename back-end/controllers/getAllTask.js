// controllers/taskController.js
import Task from "../models/Tasks.js";

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate("user", "username email"); 
    // populate to also show user info

    res.status(200).json({
      message: "All tasks fetched successfully",
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    console.error("Error fetching tasks:", error.message);
    res.status(500).json({ status: 500, error: error.message });
  }
};

export default getAllTasks;