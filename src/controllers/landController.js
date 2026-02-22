// src/controllers/landController.js
import mongoose from "mongoose";
import Land from "../models/Land.js";
import Media from "../models/Media.js";
/**
 * @desc   Create new land post (Admin)
 * @route  POST /api/lands
 */
export const createLand = async (req, res) => {
  try {
    const { title, description, location, price, areaSize } = req.body;
    const land = await Land.create({
      title,
      description,
      location,
      price,
      areaSize
    });

    res.status(201).json({
      message: "Land created successfully",
      landId: land._id
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc   Get all land posts with media (Public)
 * @route  GET /api/lands
 */
export const getAllLands = async (req, res) => {
  try {
    const lands = await Land.aggregate([
      // Match only active lands
      {
        $match: { isActive: true }
      },
      // Lookup and join with Media collection
      {
        $lookup: {
          from: "media",  // MongoDB collection name (lowercase)
          localField: "_id",
          foreignField: "landId",
          as: "media"
        }
      },
      // Sort by creation date (newest first)
      {
        $sort: { createdAt: -1 }
      }
    ]);

    res.json(lands);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc   Get single land post with media (Public)
 * @route  GET /api/lands/:id
 */
export const getLandById = async (req, res) => {
  try {
    const land = await Land.aggregate([
      // Match the specific land by ID
      {
        $match: { _id: new mongoose.Types.ObjectId(req.params.id) }
      },
      // Lookup and join with Media collection
      {
        $lookup: {
          from: "media",
          localField: "_id",
          foreignField: "landId",
          as: "media"
        }
      }
    ]);

    if (!land || land.length === 0) {
      return res.status(404).json({ message: "Land not found" });
    }

    res.json(land[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc   Update land post (Admin)
 * @route  PUT /api/lands/:id
 */
export const updateLand = async (req, res) => {
  try {
    const land = await Land.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(land);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * @desc   Delete land post (Admin)
 * @route  DELETE /api/lands/:id
 */
export const deleteLand = async (req, res) => {
  try {
    await Land.findByIdAndDelete(req.params.id);
    res.json({ message: "Land deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
