const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const plan = require("../models/Plan");
dotenv.config();

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const register = async (req, res) => {
    console.log(req.body);
  const { name, email, password, role } = req.body;
  try {
    if (!name || !email || !password)
      return res.status(400).json({ message: "Please enter all fields" });
    let user;
    if (role == `Admin`) {
      user = new User({ name, email, password, role });
    } else {
      const { planId } = req.body;
      const currentPlan = await plan.findById(planId);
      if (!currentPlan)
        return res.status(404).json({ message: "Plan not found" });
      const valid = new Date(new Date().getTime() + currentPlan.daysValidity * 24 * 60 * 60 * 1000);    console.log(valid);
      user = new User({
        name,
        email,
        password,
        role,
        otherUsers: [],
        valid,
        plan: planId,
      });
    }
    const resp = await user.save();
    console.log(resp)
    res.status(200).json({ message: "User registered successfully", user });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


module.exports = { login, register };
