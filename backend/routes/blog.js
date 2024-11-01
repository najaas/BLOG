const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");

const router = express.Router();

router.post("/", authMiddleware, createBlog);
router.get("/", getBlogs);
router.get("/:id", authMiddleware, getBlogById);
router.put("/:id", authMiddleware, updateBlog);
router.delete("/:id", authMiddleware, deleteBlog);

module.exports = router;
