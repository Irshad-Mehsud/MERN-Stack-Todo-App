import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { TaskContext } from "../../context/TaskProvider.jsx";

const TaskStats = () => {

    const { total, completed, inProgress } = useContext(TaskContext);

  // const [total, setTotal] = useState(0);
  // const [completed, setCompleted] = useState(0);
  // const [inProgress, setInProgress] = useState(0);

  // useEffect(() => {
  //   const userId = localStorage.getItem("userId");

  //   fetch(`http://localhost:5000/api/users/${userId}/tasks`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data.data) {
  //         const tasks = data.data; // backend sends { message, data: [...] }

  //         setTotal(tasks.length);
  //         setCompleted(tasks.filter((task) => task.status === "Completed" || task.status === "completed").length);
  //         setInProgress(tasks.filter((task) => task.status === "InProgress" || task.status === "in-progress").length);
  //       }
  //     })
  //     .catch((err) => console.error("Error fetching tasks:", err));
  // }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      <div className="bg-white shadow-md p-4 rounded-lg">
        <h3 className="text-gray-600 text-sm">Total Tasks</h3>
        <p className="text-2xl font-bold text-blue-600">{total}</p>
      </div>
      <div className="bg-white shadow-md p-4 rounded-lg">
        <h3 className="text-gray-600 text-sm">Completed Tasks</h3>
        <p className="text-2xl font-bold text-green-600">{completed}</p>
      </div>
      <div className="bg-white shadow-md p-4 rounded-lg">
        <h3 className="text-gray-600 text-sm">In Progress Tasks</h3>
        <p className="text-2xl font-bold text-yellow-600">{inProgress}</p>
      </div>
    </div>
  );
};

export default TaskStats;
