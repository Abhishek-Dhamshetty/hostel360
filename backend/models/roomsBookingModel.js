const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  userId: { type: String, required: true },  // Clerk User ID
  userName: { type: String, required: true },  // Full Name of the User
  userEmail: { type: String, required: true },  // Email of the User
  roomNumber: { type: String, required: true },  // Room ID (e.g., "1-1")
  bedCount: { type: String, required: true },  // Bed ID (e.g., "1-Sharing")
  floorNumber: { type: Number, required: true },  // Floor where the room is
  roomType: { type: String, required: true },  // e.g., "6-Sharing"
  bedIndex: { type: Number, required: true },  // Position of the bed in the room
  pricePerMonth: { type: Number, required: true },  // Price based on sharing type
  checkInDate: { type: String, required: true },  // Booking Start Date (YYYY-MM-DD)
  checkOutDate: { type: String, required: true },  // Booking End Date (YYYY-MM-DD)
  status: { type: String, enum: ["Booked", "Available"], default: "Booked" }  // Booking status
});

module.exports = mongoose.model("booking", BookingSchema);
