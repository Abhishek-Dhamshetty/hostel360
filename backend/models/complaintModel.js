const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
  {
    userId: {
      type: String, // Clerk User ID
      required: true,
    },
    userEmail: {
      type: String, // Clerk User Email
      required: true,
    },
    category: {
      type: String,
      enum: ["Maintainance", "Cleanliness", "Food", "Security", "Other"],
      required: true,
    },
    place: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["pending", "in-progress", "resolved"],
      default: "pending",
    },
    response: {
      type: String,
      default: "",
    },
  },
  { timestamps: true } // Auto-generates createdAt and updatedAt fields
);

const Complaint = mongoose.model("complaint", complaintSchema);

module.exports = Complaint;
