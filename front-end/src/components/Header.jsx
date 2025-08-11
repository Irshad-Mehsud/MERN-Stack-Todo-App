import React from "react";
import { FaSearch, FaCalendarAlt, FaBars } from "react-icons/fa";
import { useState } from "react";

const Header = ({ toggleSidebar, findTaskHandler, searched, setFilteredTasks ,setSearched }) => {
  const today = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <header className="bg-white shadow py-4 w-full">
      <div className="max-w-screen-xl mx-auto px-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Left: Logo + Hamburger */}
        <div className="flex items-center justify-between sm:justify-start gap-4 w-full sm:w-auto">
          <button
            className="lg:hidden text-xl text-red-500"
            onClick={toggleSidebar}
          >
            <FaBars />
          </button>
          <div className="text-xl font-bold text-gray-800">
            <span className="text-red-500">Dash</span>board
          </div>
        </div>

        {/* Center: Search bar */}
        <div className="flex items-center gap-2 w-full sm:w-auto flex-grow">
          <input
            type="text"
            placeholder="Search your task here..."
            className="flex-grow px-4 py-2 border rounded-full focus:outline-none text-sm"
            onChange={(e) => setSearched(e.target.value)}
          />
          <button
            className="bg-red-500 text-white p-2 rounded-full"
           
              onClick={findTaskHandler}
           
          >
            <FaSearch />
          </button>
        </div>
        {/* Right: Date */}
        <div className="text-sm text-blue-500 text-right sm:text-left w-full sm:w-auto">
          {today}
        </div>
      </div>
    </header>
  );
};

export default Header;
