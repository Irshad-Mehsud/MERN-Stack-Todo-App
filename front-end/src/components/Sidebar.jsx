import React from "react";
import { FaHome, FaTasks, FaUser } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import ProfileImg from "../assets/profileimg.jpg"; // Assuming you have a profile image

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div
      className={`w-48 h-screen bg-red-400 p-4 flex-col justify-between rounded ml-2
        ${isOpen ? "flex" : "hidden"} lg:flex fixed lg:static z-50`}
    >
  
      <div className="text-center">
        <img
          src={ProfileImg}
          alt="Profile"
          className="w-20 h-20 rounded-full mx-auto mb-2"
        />
        <h3 className="font-bold text-sm">Irshad Ahmad</h3>
        <p className="text-xs text-gray-700">engrirshadmasood@gmail.com</p>
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
      <div className="text-start mt-8">
        <button className="text-sm flex items-center gap-2 text-white hover:text-red-100">
          <FiLogOut />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
