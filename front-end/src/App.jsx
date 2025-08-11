import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import TaskStats from "./components/TaskStats";
import TaskList from "./components/TaskList";

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searched, setSearched] = useState("");
  const [tasks, setTasks] = useState([
    { title: "Attend Nischal's Birthday Party", status: "Not Started" },
    { title: "Landing Page Design", status: "In Progress" },
    { title: "Presentation on Final Product", status: "In Progress" },
    { title: "Walk the dog", status: "Completed" },
    { title: "Conduct meeting", status: "Completed" },
  ]);
  const [filteredTasks, setFilteredTasks] = useState(null);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const findTaskHandler = () => {
    if (searched.trim() === "") {
      setFilteredTasks(null);
      return;
    }

    const foundTask = tasks.filter(
      (task) => task.title.toLowerCase() === searched.toLowerCase()
    );

    if (foundTask.length > 0) {
      setFilteredTasks(foundTask);
      console.log("Task found:", foundTask);
    } else {
      setFilteredTasks([]); // to show "No tasks found" UI
      console.log("No task found");
    }
  };

  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === "Completed").length;
  const inProgress = tasks.filter((t) => t.status === "In Progress").length;

  return (
    <div className="h-screen flex flex-col">
      {/* Header always on top */}
      <Header
        toggleSidebar={toggleSidebar}
        findTaskHandler={findTaskHandler}
        searched={searched}
        setFilteredTasks={setFilteredTasks}
        setSearched={setSearched}
      />

      {/* Main layout */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar for large screens */}
        <div className="hidden lg:block">
          <Sidebar isOpen={true} toggleSidebar={toggleSidebar} />
        </div>

        {/* Sidebar for small screens (toggleable) */}
        {isSidebarOpen && (
          <div className="absolute top-0 left-0 z-50 lg:hidden">
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          </div>
        )}

        {/* Main dashboard content */}
        <div className="w-full flex-1 overflow-y-auto p-4 bg-gray-50">
          <h2 className="text-2xl font-semibold mb-4">
            Welcome back, Sundar 👋
          </h2>
          <TaskStats total={total} completed={completed} inProgress={inProgress} />
          <TaskList tasks={filteredTasks !== null ? filteredTasks : tasks} />
        </div>
      </div>
    </div>
  );
};

export default App;
