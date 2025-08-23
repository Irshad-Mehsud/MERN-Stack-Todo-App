import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
 


  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, email, password } = formData;
    if (!username || !email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    const formPayload = new FormData();
    formPayload.append("username", username);
    formPayload.append("email", email);
    formPayload.append("password", password);
    if (image) formPayload.append("profileImage", image);

    try {
      const res = await fetch("https://mern-stack-backend.vercel.app/api/signup", {
        method: "POST",
        body: formPayload
      });
      
      const data = await res.json();
       localStorage.setItem("userId", data.userId); // store MongoDB _id
       console.log("User ID saved:", data.userId);
      if (res.ok) {
        alert("Signup successful!");
        navigate("/login");
      } else {
        alert(data.error || "Signup failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-red-500">Sign Up</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="text-center">
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="mx-auto h-24 w-24 rounded-full object-cover border border-gray-300"
              />
            ) : (
              <div className="h-24 w-24 rounded-full mx-auto bg-gray-200 flex items-center justify-center text-gray-500">
                No Image
              </div>
            )}
          </div>

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none"
            required
          />

          <label className="block mt-2 text-sm text-gray-600 font-medium">
            Upload Profile Image
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                         file:rounded-full file:border-0
                         file:text-sm file:font-semibold
                         file:bg-red-50 file:text-red-700
                         hover:file:bg-red-100"
            />
          </label>

          <button
            type="submit"
            className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
