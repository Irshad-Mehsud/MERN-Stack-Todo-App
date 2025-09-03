import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import TaskStats from "./components/TaskStats";
import TaskList from "./components/TaskList";

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // ✅ Fetch logged-in user
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!userId || !token) {
      console.error("User not logged in");
      return;
    }

    fetch(`http://localhost:5000/api/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // send token if backend needs it
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch user: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setUser(data.data); // assuming API returns { data: {...user} }
      })
      .catch((err) => {
        console.error("User fetch error:", err);
        localStorage.removeItem("userId");
        localStorage.removeItem("token");
        window.location.href = "/login";
      });
  }, []);

  return (
    <div className="h-screen flex flex-col">
      {/* Header always on top */}
      <Header toggleSidebar={toggleSidebar} />

      {/* Main layout */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar for large screens */}
        <div className="hidden lg:block">
          <Sidebar isOpen={true} toggleSidebar={toggleSidebar} />
        </div>

        {/* Sidebar for small screens */}
        {isSidebarOpen && (
          <div className="absolute top-0 left-0 z-50 lg:hidden">
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          </div>
        )}

        {/* Dashboard content */}
        <div className="w-full flex-1 overflow-y-auto p-4 bg-gray-50">
          <h2 className="text-2xl font-semibold mb-4">
            Welcome back, {user?.username} 👋
          </h2>

          {/* keep TaskStats + TaskList if you need them */}
          <TaskStats total={0} completed={0} inProgress={0} />
          <TaskList tasks={[]} />
        </div>
      </div>
    </div>
  );
};

export default App;
