// src/controllers/enquiryController.js
import Enquiry from "../models/Enquiry.js";
import Land from "../models/Land.js";

/**
 * @desc   Create enquiry (Public)
 * @route  POST /api/enquiries
 */
export const createEnquiry = async (req, res) => {
  try {
    const { landId, name, email, phone } = req.body;

    if (!landId || !name || !email || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check land exists
    const landExists = await Land.findById(landId);
    if (!landExists) {
      return res.status(404).json({ message: "Land not found" });
    }

    const enquiry = await Enquiry.create({
      landId,
      name,
      email,
      phone
    });

    res.status(201).json({
      message: "Enquiry submitted successfully",
      enquiry
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc   Get all enquiries (Admin)
 * @route  GET /api/enquiries
 */
export const getAllEnquiries = async (req, res) => {
  try {
    // 1. Get enquiries with land details
    const enquiries = await Enquiry.find()
      .populate("landId", "title location price areaSize")
      .sort({ createdAt: -1 });

    // 2. Attach media for each enquiry
    const enrichedEnquiries = await Promise.all(
      enquiries.map(async (enquiry) => {
        let media = [];

        if (enquiry.landId) {
          media = await Media.find(
            { landId: enquiry.landId._id },
            "type url displayOrder"
          ).sort({ displayOrder: 1 });
        }

        return {
          _id: enquiry._id,
          name: enquiry.name,
          email: enquiry.email,
          phone: enquiry.phone,
          status: enquiry.status,
          createdAt: enquiry.createdAt,
          land: enquiry.landId,
          media
        };
      })
    );

    res.json(enrichedEnquiries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};