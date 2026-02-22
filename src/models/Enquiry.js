// src/models/Enquiry.js
import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema(
  {
    landId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Land",
      required: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      lowercase: true
    },
    phone: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ["Pending", "Contacted"],
      default: "Pending"
    },
    message: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Enquiry", enquirySchema);