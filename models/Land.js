import mongoose from "mongoose";

const landSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title for the property"],
      trim: true,
      maxlength: [100, "Title cannot be more than 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Please provide a description"],
      maxlength: [2000, "Description cannot be more than 2000 characters"],
    },
    location: {
      address: {
        type: String,
        required: [true, "Please provide an address"],
      },
      city: {
        type: String,
        required: [true, "Please provide a city"],
      },
      state: {
        type: String,
        required: [true, "Please provide a state"],
      },
      pincode: {
        type: String,
        required: [true, "Please provide a pincode"],
      },
      coordinates: {
        latitude: Number,
        longitude: Number,
      },
    },
    area: {
      value: {
        type: Number,
        required: [true, "Please provide area"],
      },
      unit: {
        type: String,
        enum: ["sq ft", "sq m", "acres"],
        default: "sq ft",
      },
    },
    price: {
      type: Number,
      required: [true, "Please provide a price"],
    },
    propertyType: {
      type: String,
      enum: ["residential", "commercial", "agricultural", "mixed-use"],
      required: [true, "Please specify property type"],
    },
    owner: {
      name: {
        type: String,
        required: [true, "Please provide owner name"],
      },
      email: {
        type: String,
        required: [true, "Please provide owner email"],
      },
      phone: {
        type: String,
        required: [true, "Please provide owner phone"],
      },
    },
    amenities: [
      {
        type: String,
        enum: [
          "water",
          "electricity",
          "road access",
          "near school",
          "near hospital",
          "fenced",
        ],
      },
    ],
    status: {
      type: String,
      enum: ["available", "sold", "pending", "under-offer"],
      default: "available",
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

export default mongoose.model("Land", landSchema);
