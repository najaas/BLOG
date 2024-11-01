const Blog = require("../Model/blogModel");

const createBlog = async (req, res) => {
  console.log("hai")
  try {
    const blog = await Blog.create({ ...req.body, author: req.userId });
    console.log(blog)
    res.status(201).json(blog);
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: error.message });
  }
};

const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("author", "username");
    res.status(200).json(blogs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getBlogById = async (req, res) => {
  try {
   
    const blog = await Blog.findById(req.params.id).populate("author", "username");
    
const verification = blog.author._id==req.userId

    res.status(200).json({blog,verification});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    console.log(req.body)
    res.json(blog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteBlog = async (req, res) => {
  try {
    console.log("deleted")
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Blog deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createBlog, getBlogs, getBlogById, updateBlog, deleteBlog };
