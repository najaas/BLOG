const User = require("../Model/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const register = async (req, res) => {
  console.log("post")
  try {
    const { username, email, password } = req.body;
    const user = await User.create({ username, email, password });
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {

  try {
    const { email, password } = req.body;
    console.log(req.body)
    const user = await User.findOne({ email });
    console
    if (!user || !(await user.password==password)) {
      return res.status(400).json({ error: "Invalid email or password" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { register, login };
