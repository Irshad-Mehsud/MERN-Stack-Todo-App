import React, { useState } from "react";

const TaskList = ({ tasks: initialTasks }) => {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const formatDateTime = () => {
    const now = new Date();
    const date = now.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    const time = now.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    });
    return { date, time };
  };

  const handleAddTask = () => {
    if (newTask.trim() === "") return;

    const { date, time } = formatDateTime();

    if (editIndex !== null) {
      const updated = [...tasks];
      updated[editIndex].title = newTask;
      setTasks(updated);
      setEditIndex(null);
    } else {
      setTasks([
        ...tasks,
        {
          title: newTask,
          status: "Not Started",
          date,
          time,
        },
      ]);
    }

    setNewTask("");
  };

  const handleDelete = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
  };

  const handleEdit = (index) => {
    setNewTask(tasks[index].title);
    setEditIndex(index);
  };

  const updateStatus = (index, newStatus) => {
    const updated = [...tasks];
    updated[index].status = newStatus;
    setTasks(updated);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-xl">
      {/* Heading */}
      <h2 className="text-center text-2xl font-semibold mb-4">Add Your Task</h2>

      {/* Input and Button */}
      <div className="flex flex-col sm:flex-row gap-3 items-center mb-6">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="w-full sm:flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter task title"
        />
        <button
          onClick={handleAddTask}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          {editIndex !== null ? "Update Task" : "Add Task"}
        </button>
      </div>

      {/* Task Cards */}
      <div className="grid gap-4">
        {tasks.length === 0 ? (
          <p className="text-center text-gray-500">No tasks yet.</p>
        ) : (
          tasks.map((task, index) => (
            <div
              key={index}
              className="bg-gray-100 p-4 rounded-md shadow-md flex flex-col gap-2"
            >
              <div className="flex justify-between items-center">
                <h4 className="font-semibold text-lg">{task.title}</h4>
                <span className="text-xs text-gray-600">
                  {task.date} | {task.time}
                </span>
              </div>

              <p className="text-sm">
                Status:{" "}
                <span
                  className={`font-medium ${
                    task.status === "Completed"
                      ? "text-green-600"
                      : task.status === "In Progress"
                      ? "text-yellow-600"
                      : "text-red-500"
                  }`}
                >
                  {task.status}
                </span>
              </p>

              {/* Buttons */}
              <div className="flex gap-2 flex-wrap mt-2">
                <button
                  onClick={() => updateStatus(index, "Completed")}
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                >
                  Mark Completed
                </button>
                <button
                  onClick={() => updateStatus(index, "In Progress")}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Mark In Progress
                </button>
                <button
                  onClick={() => handleEdit(index)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(index)}
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
