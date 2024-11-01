const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = (req, res, next) => {


  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token provided" });
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
  //  console.log("hi",decoded)
    req.userId = decoded.id
    next();
  } catch (error) {
    console.log(error)
    res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = authMiddleware;
