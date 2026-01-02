import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";

const router = express.Router();

// Signup
router.post("/signup", async (req, res) => {
  const { name, email, password, location } = req.body;

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    password: hashed,
    location,
    role: "user" 
  });

  res.json({
    token: generateToken(user),
    role: user.role
  });
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  // console.log("req : ",email, password)
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ message: "Invalid credentials" });

  res.json({
    token: generateToken(user),
    role: user.role
  });
});

export default router;
