import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/database.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Connect to MongoDB
await connectDB();

app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Server and database connected" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});