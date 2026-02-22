import Media from "../models/Media.js";
import Land from "../models/Land.js";

export const uploadMedia = async (req, res) => {
  try {
    const { landId } = req.params;
    console.log("Received files:", req.files);
    console.log("Land ID:", landId);
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