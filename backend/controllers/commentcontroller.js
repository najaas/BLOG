const Comment = require("../Model/CommentModel");

const addComment = async (req, res) => {
  try {
    const comment = await Comment.create({
      ...req.body,
      author: req.user.id,
    });
    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ blog: req.params.blogId }).populate("author", "username");
    console.log(comments)
    res.json(comments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { addComment, getComments };
