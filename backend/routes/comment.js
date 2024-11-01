const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { addComment, getComments } = require("./../controllers/commentcontroller");

const router = express.Router();

router.post("/:blogId", authMiddleware, addComment);
router.get("/:blogId", getComments);

module.exports = router;
