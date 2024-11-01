import React, { useEffect, useState, useContext } from "react";
import API from "../Api";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const { logout } = useContext(AuthContext); // Access the logout function from AuthContext
  const navigate = useNavigate(); // Initialize the useNavigate hook

  useEffect(() => {
    const fetchBlogs = async () => {
      const { data } = await API.get("/blog");
      setBlogs(data);
    };
    fetchBlogs();
  }, []);

  // Logout function
  const handleLogout = () => {
    logout(); // Call the logout function from context
    navigate("/login"); // Redirect to the login page
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Blog Posts</h2>
      
      <div style={{ display: "flex", flexDirection: "column", fontSize: "25px", marginBottom: "120px", justifyItems: "center", justifyContent: "center", alignItems: "center" }}>
       <div className="flex justify-evenly w-full">
       <div className="w-1/2 flex justify-end">

        <h1 >Create Your Own Blog Post</h1>

       </div>

      <div className=" flex justify-end border-red-400 w-[320px]">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white rounded  text-[20px]  "
        >
          Logout
        </button>
      
        </div>
       </div>
        
        <Link to={"/create"}>
          <p style={{ color: "red", font: "bold" }}>Click Here</p>
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
