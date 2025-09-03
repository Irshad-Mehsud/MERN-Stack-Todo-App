import React, { useState, useEffect } from "react";
const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch tasks for current user
  useEffect(() => {
    const userId = localStorage.getItem("userId"); // Get from localStorage
    console.log("Fetched User ID:", userId);


    if (!userId || userId === "undefined") {
      console.error("No user found. Please login first.");
      return;
    }

    // ✅ Fetch only this user's tasks
    fetch(`http://localhost:5000/api/users/${userId}/tasks`)
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          setTasks(data.data); // backend sends { message, data: [...] }
        } else {
          setTasks([]);
        }
      })
      .catch((err) => console.error("Error fetching tasks:", err));
  }, []);

  // ✅ Add Task
  const handleAddTask = async () => {
    if (newTask.trim() === "") return;

    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("No user found. Please login first.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newTask,
          user: userId, // ✅ send logged in userId
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add task");
      }

      setTasks([...tasks, data.task]); // append new task
      setNewTask("");
    } catch (error) {
      console.error("Error adding task:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Update Task
  const handleUpdateTask = async () => {
    const taskId = tasks[editIndex]._id;

    try {
      setLoading(true);

      const response = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTask }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to update task");

      const updatedTasks = [...tasks];
      updatedTasks[editIndex] = data.task; // backend returns { task }
      setTasks(updatedTasks);

      setNewTask("");
      setEditIndex(null);
    } catch (err) {
      console.error("Error updating task:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete Task
  const handleDelete = async (taskId) => {
    try {
      await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
        method: "DELETE",
      });
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  // ✅ Edit Task (load task into input)
  const handleEdit = (index) => {
    setNewTask(tasks[index].title);
    setEditIndex(index);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-xl">
      <h2 className="text-center text-2xl font-semibold mb-4">Add Your Task</h2>

      {/* Input + Button */}
      <div className="flex flex-col sm:flex-row gap-3 items-center mb-6">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="w-full sm:flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter task title"
        />
        <button
          onClick={editIndex !== null ? handleUpdateTask : handleAddTask}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          {editIndex !== null
            ? "Update Task"
            : loading
            ? "Adding..."
            : "Add Task"}
        </button>
      </div>

      {/* Task List */}
      <div className="grid gap-4">
        {tasks.length === 0 ? (
          <p className="text-center text-gray-500">No tasks yet.</p>
        ) : (
          tasks.map((task, index) => (
            <div
              key={task._id}
              className="bg-gray-100 p-4 rounded-md shadow-md flex flex-col gap-2"
            >
              <div className="flex justify-between items-center">
                <h4 className="font-semibold text-lg">{task.title}</h4>
              </div>

              {/* Buttons */}
              <div className="flex gap-2 flex-wrap mt-2">
                <button
                  onClick={() => handleEdit(index)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TaskList;
