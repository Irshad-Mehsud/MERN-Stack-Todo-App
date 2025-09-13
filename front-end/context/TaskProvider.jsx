import { useState, useEffect, createContext } from 'react';

const TaskContext = createContext();

const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [total, setTotal] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [inProgress, setInProgress] = useState(0);

  // 🔹 Calculate stats whenever tasks change
  useEffect(() => {
    setTotal(tasks.length);
    setCompleted(tasks.filter((t) => t.status === "Completed" || t.status === "completed").length);
    setInProgress(tasks.filter((t) => t.status === "InProgress" || t.status === "in-progress").length);
  }, [tasks]);

  // 🔹 Fetch tasks once
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    fetch(`http://localhost:5000/api/users/${userId}/tasks`)
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          setTasks(data.data);
        }
      })
      .catch((err) => console.error("Error fetching tasks:", err));
  }, []);

  // 🔹 Update task status helper
  const updateTaskStatus = async (taskId, status) => {
    try {
      const res = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update task");

      setTasks((prev) =>
        prev.map((task) =>
          task._id === taskId ? { ...task, status: data.task.status } : task
        )
      );
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, setTasks, total, completed, setCompleted, inProgress }}>
      {children}
    </TaskContext.Provider>
  );
};


export { TaskProvider, TaskContext };