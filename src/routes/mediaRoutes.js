import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { uploadMedia, deleteMedia } from "../controllers/mediaController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Admin only
router.post(
  "/:landId",
  protect,
  upload.array("media", 10),
  uploadMedia
);

// Delete media by id (admin)
router.delete("/:id", protect, deleteMedia);

export default router;