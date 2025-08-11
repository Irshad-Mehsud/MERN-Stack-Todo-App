import React from "react";

const TaskStats = ({ total, completed, inProgress }) => {
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
