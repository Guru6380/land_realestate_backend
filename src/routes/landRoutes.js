// src/routes/landRoutes.js
import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createLand,
  getAllLands,
  getLandById,
  updateLand,
  deleteLand
} from "../controllers/landController.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", getAllLands);              // Get all lands
router.get("/:id", getLandById);           // Get single land by ID

// Admin routes (protected)
router.post("/", protect, createLand);    // Create new land
router.put("/:id", protect, updateLand);   // Update land
router.delete("/:id", protect, deleteLand); // Delete land

export default router;