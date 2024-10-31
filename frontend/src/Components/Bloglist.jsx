import React, { useEffect, useState } from "react";
import API from "../Api";
import { Link } from "react-router-dom";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const { data } = await API.get("/blog");
      setBlogs(data);
    };
    fetchBlogs();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Blog Posts</h2>
      
      <div style={{display:"flex", flexDirection:"column",fontSize:"25px", marginBottom:"120px",justifyItems:"center",justifyContent:"center",alignItems:"center"}}>
<h1>create your own blog post</h1>
<Link to={"/create"}><p style={{color:"red",font:"bold"}}>click here</p></Link>
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
