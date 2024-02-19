import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import bcryptjs from "bcryptjs";

export const signup = asyncHandler(async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  const exists = await User.findOne({ email });
  if (exists) {
    res.status(400);
    throw new Error("User already exists");
  }
  if (password !== confirmPassword) {
    res.status(400);
    throw new Error("Passwords do not match");
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);
  const user = await User.create({ name, email, password: hashedPassword });
  if (user) {
    res.status(201);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
      message: "User created successfully",
    });
  } else {
    res.status(400);
    throw new Error("Could not create user");
  }
});

export const signin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const match = bcryptjs.compareSync(password, user.password);
  if (user && match) {
    res.status(200);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
      message: "Logged in successfully",
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

export const signout = asyncHandler(async (req, res) => {
  const { token } = req.body;
  if (token) {
    res.status(200);
    res.json({
      message: "Logged out successfully",
    });
  } else {
    res.status(400);
    throw new Error("Please refresh the page");
  }
});
