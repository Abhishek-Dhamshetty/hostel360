const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const Complaint = require("../models/complaintModel");
const requireAuth = require("../middleware/clerkAuth"); // Ensure authentication middleware is implemented

const complaintApp = express.Router();

// ✅ Register a new complaint
complaintApp.post(
  "/register",
  requireAuth, // Ensures only authenticated users can register complaints
  expressAsyncHandler(async (req, res) => {
    try {
      const { category, description, userData,place } = req.body;

      // Check if category and description are provided
      if (!category || !description) {
        return res.status(400).json({ message: "Category and Description are required!" });
      }

      // Ensure req.user exists and has valid properties
      if (!userData || !userData.userId || !userData.userMail) {
        return res.status(400).json({ message: "User authentication failed!" });
      }

      // Create new complaint (Added userId)
      const newComplaint = new Complaint({
        userId: userData.userId, // Clerk User ID
        userEmail: userData.userMail, // Clerk User Email
        place:place,
        category:"Maintainance",
        description:description,
      });

      // Save the complaint to the database
      const savedComplaint = await newComplaint.save();
      res.status(201).json({ message: "Complaint registered successfully", complaint: savedComplaint });
    } catch (error) {
      console.error("❌ Error Registering Complaint:", error);
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  })
);


// ✅ Get all complaints (For Admin)
complaintApp.get(
  "/all",
  requireAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      const complaints = await Complaint.find();
      res.status(200).json({ message: "All Complaints Fetched", complaints });
    } catch (error) {
      console.error("❌ Error Fetching Complaints:", error);
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  })
);

// ✅ Get complaints by Clerk User ID
complaintApp.get(
  "/user/:userId",
  requireAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      const { userId } = req.params;
      const userComplaints = await Complaint.find({ userId });
      res.status(200).json({ message: "User Complaints Fetched", complaints: userComplaints });
    } catch (error) {
      console.error("❌ Error Fetching User Complaints:", error);
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  })
);

// ✅ Update complaint status (Admin Only)
complaintApp.patch(
  "/update-status/:id",
  requireAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!["pending", "in-progress", "resolved"].includes(status)) {
        return res.status(400).json({ message: "Invalid status!" });
      }

      const updatedComplaint = await Complaint.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      );

      if (!updatedComplaint) {
        return res.status(404).json({ message: "Complaint not found!" });
      }

      res.status(200).json({ message: "Complaint status updated", complaint: updatedComplaint });
    } catch (error) {
      console.error("❌ Error Updating Complaint Status:", error);
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  })
);

// ✅ Add response to a complaint (Admin Only)
complaintApp.patch(
  "/respond/:id",
  requireAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      const { response } = req.body;

      if (!response) {
        return res.status(400).json({ message: "Response is required!" });
      }

      const updatedComplaint = await Complaint.findByIdAndUpdate(
        id,
        { response },
        { new: true }
      );

      if (!updatedComplaint) {
        return res.status(404).json({ message: "Complaint not found!" });
      }

      res.status(200).json({ message: "Response added to complaint", complaint: updatedComplaint });
    } catch (error) {
      console.error("❌ Error Adding Response:", error);
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  })
);

// ✅ Delete a complaint (For Admin or User)
complaintApp.delete(
  "/delete/:id",
  requireAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      const deletedComplaint = await Complaint.findByIdAndDelete(id);

      if (!deletedComplaint) {
        return res.status(404).json({ message: "Complaint not found!" });
      }

      res.status(200).json({ message: "Complaint deleted successfully" });
    } catch (error) {
      console.error("❌ Error Deleting Complaint:", error);
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  })
);

module.exports = complaintApp;
