import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
connectDB();

app.use("/api/v1/auth", userRoutes);

const port = process.env.PORT || 4000;
app.listen(4000, (req, res) => {
  console.log(`Server running on port ${port}`);
});
