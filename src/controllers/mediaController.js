import Media from "../models/Media.js";
import Land from "../models/Land.js";
import cloudinary from "../../config/cloudinary.js";
export const uploadMedia = async (req, res) => {
  try {
    const { landId } = req.params;
    const land = await Land.findById(landId);
    if (!land) {
      return res.status(404).json({ message: "Land not found" });
    }

    const mediaDocs = req.files.map((file, index) => ({
      landId,
      type: file.mimetype.startsWith("video") ? "video" : "image",
      url: file.path,
      displayOrder: index
    }));

    const savedMedia = await Media.insertMany(mediaDocs);

    res.status(201).json(savedMedia);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteMedia = async (req, res) => {
  try {
    const { id } = req.params;

    const media = await Media.findById(id);
    if (!media) {
      return res.status(404).json({ message: "Media not found" });
    }

    // 1️⃣ Extract public_id from Cloudinary URL
    const publicId = media.url
      .split("/")
      .slice(-1)[0]
      .split(".")[0];

    // 2️⃣ Delete from Cloudinary
    await cloudinary.uploader.destroy(publicId, {
      resource_type: media.type === "video" ? "video" : "image"
    });

    // 3️⃣ Delete from MongoDB
    await media.deleteOne(media._id);

    res.json({ message: "Media deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};