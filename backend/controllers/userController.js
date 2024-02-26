import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import bcryptjs from "bcryptjs";

export const getUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find();
    if (users) {
      res.status(200);
      res.json(users);
    } else {
      res.status(404);
      res.json({ message: "No users found" });
    }
  } catch (error) {
    res.status(500);
    res.json({ message: error.message });
  }
});

export const signup = asyncHandler(async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    if (!name || !email || !password || !confirmPassword) {
      res.status(400);
      throw new Error("All fields are required");
    }
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
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
});

export const signin = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error("All fields are required");
    }
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
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
});

export const signout = asyncHandler(async (req, res) => {
  try {
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
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
});
