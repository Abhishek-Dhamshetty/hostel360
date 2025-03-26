const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const RoomBooking = require("../models/roomsBookingModel");
const requireAuth = require("../middleware/clerkAuth");

const roomBookingApp = express.Router();

// ✅ Get All Room Bookings
roomBookingApp.get(
  "/all",
  requireAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      // Filter only the rooms relevant to the request: avoid fetching unnecessary data
      const bookings = await RoomBooking.find({ floorNumber: req.query.floor || { $exists: true } })
        .select("roomNumber bedIndex status")
        .lean();
        
      // Map data into a more accessible format
      const roomData = bookings.map((booking) => ({
        roomNumber: booking.roomNumber,
        bedIndex: booking.bedIndex,
        status: booking.status,
      }));

      res.status(200).json({ message: "All Bookings Fetched", bookings: roomData });
    } catch (error) {
      console.error("❌ Error Fetching Bookings:", error);
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  })
);

// ✅ Book a Room (User)
roomBookingApp.post(
  "/book",
  requireAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      const {
        roomNumber,
        floorNumber,
        roomType,
        bedIndex,
        bedCount,
        pricePerMonth,
        checkInDate,
        checkOutDate,
        userId,
        userMail,
        userName,
      } = req.body;

      // Validate required fields
      if (
        !roomNumber ||
        !floorNumber ||
        !roomType ||
        bedIndex === undefined ||
        !bedCount ||
        !pricePerMonth ||
        !checkInDate ||
        !checkOutDate ||
        userMail==='abhishekdhamshetty@gmail.com' || userMail==='bhargavdhamshetty@gmail.com'
      ) {
        if(userMail==='abhishekdhamshetty@gmail.com' || userMail==='bhargavdhamshetty@gmail.com')
          {return res.status(500).json({ message: "Owner or Warden not allowed"});}
        return res.status(400).json({ message: "All fields are required!" });
      }

      // Check if the room is already booked (roomNumber is unique)
      const existingBooking = await RoomBooking.findOne({ roomNumber });
      if (existingBooking) {
        return res.status(400).json({ message: "This room is already booked!" });
      }

      // Create a new booking if room is available
      const newBooking = new RoomBooking({
        userId,
        userEmail: userMail,
        roomNumber,
        floorNumber,
        roomType,
        bedIndex,
        bedCount,
        userName,
        pricePerMonth,
        checkInDate,
        checkOutDate,
        status: "Booked",
      });

      const savedBooking = await newBooking.save();
      res.status(201).json({ message: "Room booked successfully!", booking: savedBooking });
    } catch (error) {
      console.error("❌ Error Booking Room:", error);
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  })
);



// ✅ Get User's Bookings
roomBookingApp.get(
  "/my-bookings",
  requireAuth,  // Ensure the user is authenticated
  expressAsyncHandler(async (req, res) => {
    try {
      const { userEmail } = req.query;  // Get userEmail from the query parameters

      // Validate if the email exists
      if (!userEmail) {
        return res.status(400).json({ message: "User email is required" });
      }

      // Fetch bookings for the given email
      const userBookings = await RoomBooking.find({ userEmail });

      // If no bookings found, return a not found message
      if (!userBookings || userBookings.length === 0) {
        return res.status(404).json({ message: "No bookings found for this user" });
      }

      // Send back the bookings data
      res.status(200).json({
        message: "User bookings fetched successfully",
        bookings: userBookings,
      });
    } catch (error) {
      console.error("❌ Error fetching user bookings:", error);
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  })
);

// ✅ Update Booking Status (Admin)
roomBookingApp.patch(
  "/update-status/:id",
  requireAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!["Booked", "Available"].includes(status)) {
        return res.status(400).json({ message: "Invalid status!" });
      }

      const updatedBooking = await RoomBooking.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      );

      if (!updatedBooking) {
        return res.status(404).json({ message: "Booking not found!" });
      }

      res.status(200).json({ message: "Booking status updated", booking: updatedBooking });
    } catch (error) {
      console.error("❌ Error Updating Booking Status:", error);
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  })
);

// ✅ Cancel a Booking (User)
roomBookingApp.delete(
  "/cancel/:id",
  requireAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      const booking = await RoomBooking.findById(id);

      if (!booking) {
        return res.status(404).json({ message: "Booking not found!" });
      }

      // Ensure only the user who booked can cancel it
      if (booking.userId.toString() !== req.user.id) {
        return res.status(403).json({ message: "Unauthorized to cancel this booking!" });
      }

      await RoomBooking.findByIdAndDelete(id);
      res.status(200).json({ message: "Booking cancelled successfully" });
    } catch (error) {
      console.error("❌ Error Cancelling Booking:", error);
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  })
);

module.exports = roomBookingApp;