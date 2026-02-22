import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema(
  {
    landId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Land",
      required: [true, "Please provide a land ID"],
    },
    url: {
      type: String,
      required: [true, "Please provide a media URL"],
    },
    type: {
      type: String,
      enum: ["image", "video"],
      required: [true, "Please specify media type"],
    },
    description: {
      type: String,
      maxlength: [500, "Description cannot be more than 500 characters"],
    },
    alt: {
      type: String,
      maxlength: [200, "Alt text cannot be more than 200 characters"],
    },
    order: {
      type: Number,
      default: 0,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Media", mediaSchema);
