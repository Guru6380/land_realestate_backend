import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema(
  {
    landId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Land",
      required: [true, "Please provide a land ID"],
    },
    customer: {
      name: {
        type: String,
        required: [true, "Please provide customer name"],
        trim: true,
      },
      email: {
        type: String,
        required: [true, "Please provide customer email"],
        match: [
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          "Please provide a valid email",
        ],
      },
      phone: {
        type: String,
        required: [true, "Please provide customer phone"],
      },
    },
    message: {
      type: String,
      required: [true, "Please provide a message"],
      maxlength: [1000, "Message cannot be more than 1000 characters"],
    },
    status: {
      type: String,
      enum: ["pending", "contacted", "interested", "not-interested", "closed"],
      default: "pending",
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    response: {
      type: String,
      maxlength: [1000, "Response cannot be more than 1000 characters"],
    },
    respondedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    respondedAt: Date,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Enquiry", enquirySchema);
