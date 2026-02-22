// src/controllers/landController.js
import Land from "../models/Land.js";

/**
 * @desc   Create new land post (Admin)
 * @route  POST /api/lands
 */
export const createLand = async (req, res) => {
  try {
    const land = await Land.create(req.body);
    res.status(201).json(land);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * @desc   Get all land posts (Public)
 * @route  GET /api/lands
 */
export const getAllLands = async (req, res) => {
  try {
    const lands = await Land.find({ isActive: true }).sort({ createdAt: -1 });
    res.json(lands);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc   Get single land post (Public)
 * @route  GET /api/lands/:id
 */
export const getLandById = async (req, res) => {
  try {
    const land = await Land.findById(req.params.id);
    if (!land) {
      return res.status(404).json({ message: "Land not found" });
    }
    res.json(land);
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