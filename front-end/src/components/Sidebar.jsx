import React, { useState, useEffect } from "react";
import { FaHome, FaTasks, FaUser } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import ProfileImg from "../assets/profileimg.jpg"; // Fallback image

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const tokenVerification = localStorage.getItem("token");
    if (!userId && !tokenVerification) {
      console.error("User ID not found in localStorage");
      return;
    }

    fetch(`http://localhost:4000/api/users/${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch user: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setUser(data.data); // Assuming your API returns { data: {...user} }
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div
      className={`w-48 h-screen bg-red-400 p-4 flex-col justify-between rounded ml-2
        ${isOpen ? "flex" : "hidden"} lg:flex fixed lg:static z-50`}
    >
      <div className="text-center">
        <img
          src={user?.profileImage || `../assets/${user?.profileImage || "profileimg.jpg"}`}
          alt="Profile"
          className="w-20 h-20 rounded-full mx-auto mb-2 object-cover"
        />
        <h3 className="font-bold text-sm">{user?.username || "Loading..."}</h3>
        <p className="text-xs text-gray-700">{user?.email || ""}</p>
      </div>

      {/* Navigation */}
      <nav className="mt-8 flex flex-col items-start gap-4">
        <button className="flex items-center gap-2 text-sm text-white hover:text-gray-100">
          <FaHome />
          Dashboard
        </button>
        <button className="flex items-center gap-2 text-sm text-white hover:text-gray-100">
          <FaTasks />
          Tasks
        </button>
        <button className="flex items-center gap-2 text-sm text-white hover:text-gray-100">
          <FaUser />
          Profile
        </button>
      </nav>

      {/* Logout */}
      <div className="text-start mb-24">
        <button
          className="text-sm flex items-center gap-2 text-white"
          onClick={() => {
            localStorage.removeItem("userId");
            window.location.reload();
          }}
        >
          <FiLogOut />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
