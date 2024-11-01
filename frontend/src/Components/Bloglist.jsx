import React, { useEffect, useState } from "react";
import API from "../Api";
import { Link, useNavigate } from "react-router-dom";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      const { data } = await API.get("/blog");
      setBlogs(data);
    };
    fetchBlogs();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-center">Blog Posts</h2>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: "25px",
          marginBottom: "120px",
          justifyItems: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>Create Your Own Blog Post</h1>
        <Link to={"/create"}>
          <p style={{ color: "red", fontWeight: "bold" }}>Click here</p>
        </Link>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <div key={blog._id} className="p-6 bg-white rounded-lg shadow-lg">
            <Link to={`/blog/${blog._id}`} className="text-xl font-bold hover:underline">
              {blog.title}
            </Link>
            <p className="mt-2 text-gray-600">{blog.content.slice(0, 100)}...</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
