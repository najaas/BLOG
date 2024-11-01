const Comment = require("../Model/CommentModel");

const addComment = async (req, res) => {


  
    try{
    const comment = await Comment.create({
      ...req.body,
      userId: req.user.id,
    });
    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getComments = async (req, res) => {
  try {
    // console.log(req.params.blogId)
    
    const comments = await Comment.find({ blogId: req.params.blogId }).populate("userId", "username");
   
    res.json(comments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { addComment, getComments };
