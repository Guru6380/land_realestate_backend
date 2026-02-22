// src/routes/landRoutes.js
import express from "express";
import {
  createLand,
  getAllLands,
  getLandById,
  updateLand,
  deleteLand
} from "../controllers/landController.js";

const router = express.Router();

router.post("/", createLand);        // Admin
router.get("/", getAllLands);         // Public
router.get("/:id", getLandById);      // Public
router.put("/:id", updateLand);       // Admin
router.delete("/:id", deleteLand);    // Admin

export default router;