import express from "express";
import cors from "cors";
import landRoutes from "./routes/landRoutes.js";
import enquiryRoutes from "./routes/enquiryRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import Admin from "./models/Admin.js";
import mediaRoutes from "./routes/mediaRoutes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Base route
app.get("/", (req, res) => {
  res.send("Land Real Estate API is running 🚀");
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Server and database connected" });
});

// API Routes
app.use("/api/lands", landRoutes);
app.use("/api/enquiries", enquiryRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/media", mediaRoutes);

app.get("/create-admin", async (req, res) => {
  const admin = await Admin.create({
    email: "admin@gmail.com",
    password: "admin123"
  });
  res.json(admin);
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

export default app;