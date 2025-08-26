import Task from "../models/Tasks.js";
import mongoose from "mongoose";

const createTask = async (req, res) => {
  try {
    const { user, title, description, dueDate } = req.body;

    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }
    if (!user) {
      return res.status(400).json({ error: "User ID is required" });
    }
    
    // Validate that user ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(user)) {
      return res.status(400).json({ error: "Invalid user ID format" });
    }

    const newTask = new Task({
      user, // pass userId in body
      title,
      description,
      dueDate,
    });

    const savedTask = await newTask.save();

    res.status(201).json({
      message: "Task created successfully",
      task: savedTask,
    });
  } catch (error) {
    console.error("Error creating task:", error.message);
    res.status(500).json({ status: 500, error: error.message });
  }
};

export default createTask;
