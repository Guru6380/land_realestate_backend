// src/routes/enquiryRoutes.js
import express from "express";
// import { protect } from "../middleware/authMiddleware.js";
import {
  createEnquiry,
  getAllEnquiries
} from "../controllers/enquiryController.js";

const router = express.Router();

// Public
router.post("/", createEnquiry);

// Admin (will be protected later)
router.get("/", getAllEnquiries);

export default router;