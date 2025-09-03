import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaHome, FaTasks, FaUser } from "react-icons/fa";
import { FiLogOut, FiLogIn } from "react-icons/fi";
import ProfileImg from "../assets/profileimg.jpg";

const Sidebar = ({ isOpen }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!userId || !token) {
      // ❌ No user logged in → stop loading & don't fetch
      setLoading(false);
      setUser(null);
      return;
    }

    fetch(`http://localhost:5000/api/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch user");
        return res.json();
      })
      .then((data) => setUser(data.data))
      .catch((err) => {
        console.error("User fetch error:", err);
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    setUser(null); // reset state
    navigate("/login");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <aside
      className={`w-60 h-screen bg-red-500 text-white flex flex-col justify-center 
        transition-transform duration-300 ease-in-out z-50
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0 fixed lg:static`}
    >
      {/* Profile Section */}
      <div className="p-6 text-center border-b border-red-400">
        {loading ? (
          <p className="text-gray-200">Loading...</p>
        ) : user ? (
          <>
            <img
              src={user?.profileImage || ProfileImg}
              alt="Profile"
              className="w-20 h-20 rounded-full mx-auto mb-3 object-cover border-2 border-white shadow"
            />
            <h3 className="font-semibold text-lg">{user.username}</h3>
            <p className="text-sm text-gray-200">{user.email}</p>
          </>
        ) : (
          <>
            <img
              src={ProfileImg}
              alt="Guest"
              className="w-20 h-20 rounded-full mx-auto mb-3 object-cover border-2 border-white shadow"
            />
            <h3 className="font-semibold text-lg">Guest</h3>
            <p className="text-sm text-gray-200">Please login</p>
          </>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2 mt-4 px-4">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-md transition ${
              isActive ? "bg-white text-red-500 font-semibold" : "hover:bg-red-600"
            }`
          }
        >
          <FaHome /> Dashboard
        </NavLink>

        <NavLink
          to="/tasks"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-md transition ${
              isActive ? "bg-white text-red-500 font-semibold" : "hover:bg-red-600"
            }`
          }
        >
          <FaTasks /> Tasks
        </NavLink>
<NavLink
  to="/signup"
  className={({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-md transition ${
      isActive ? "bg-white text-red-500 font-semibold" : "hover:bg-red-600"
    }`
  }
>
  <FaUser /> Edit Profile
</NavLink>

      </nav>

      {/* Auth Button */}
      <div className="p-6 border-t pt-4 border-red-400">
        {user ? (
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-2 mt-8 rounded-md bg-red-600 hover:bg-red-700 transition"
          >
            <FiLogOut /> Logout
          </button>
        ) : (
          <button
            onClick={handleLogin}
            className="flex items-center gap-3 w-full px-4 py-2 rounded-md bg-white text-red-500 hover:bg-gray-200 transition"
          >
            <FiLogIn /> Login
          </button>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
