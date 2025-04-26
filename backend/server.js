const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const razorpay = require("razorpay");
const app = express();
const port = process.env.PORT || 1800;

// CORS Configuration
const corsOptions = {
  origin: [ "https://hostel360-kappa.vercel.app","http://localhost:5173"], // Allowed frontend domains
  methods: ["GET", "POST", "PUT", "DELETE","PATCH"], // Allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  credentials: true, // Allow cookies & credentials (useful for authentication)
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Handle CORS preflight requests

// Middleware
app.use(express.json());

// Import API routes
const userApp = require("./APIs/userApi");
const ownerApp = require("./APIs/adminOrOwnerApi");
const complaintApp = require("./APIs/complaintApi");
const paymentApp = require("./APIs/paymentApi");
const roomsBookingApp = require("./APIs/roomsBookingApi");
const wardenApp = require("./APIs/wardenApi");


// Database Connection
mongoose
  .connect(process.env.DBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ DB connection successful");
    app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
  })
  .catch((err) => {
    console.error("❌ Error in DB connection:", err);
    process.exit(1); // Exit if DB fails to connect
  });

// API Routes
app.use("/user-api", userApp);
app.use("/owner-api", ownerApp);
app.use("/complaint-api", complaintApp);
app.use("/payment-api", paymentApp);
app.use("/rooms-booking-api", roomsBookingApp);
app.use("/warden-api", wardenApp);
// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.message);
  res.status(500).json({ message: err.message || "Internal Server Error" });
});