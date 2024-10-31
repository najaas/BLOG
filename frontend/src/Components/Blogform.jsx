import React, { useState, useEffect } from "react";
import API from "../Api";
import { useNavigate, useParams } from "react-router-dom";

const BlogForm = () => {
  const [formData, setFormData] = useState({ title: "", content: "" });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchBlog = async () => {
        const { data } = await API.get(`/blog/${id}`);
        setFormData({ title: data.title, content: data.content });
      };
      fetchBlog();
    }
  }, [id]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) await API.put(`/blog/${id}`, formData);
    else await API.post("/blog", formData);
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg p-8 rounded-md max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">{id ? "Edit" : "Create"} Blog Post</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <textarea
            name="content"
            placeholder="Content"
            value={formData.content}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-200"
          >
            {id ? "Update" : "Create"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BlogForm;
