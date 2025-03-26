const express = require("express");
const cors = require("cors");
const expressAsyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const requireAuth = require("../middleware/clerkAuth"); // Ensure correct export/import

const userApp = express.Router();

// ✅ Enable CORS
userApp.use(cors({ origin: "http://localhost:5173" , credentials: true }));

// ✅ Middleware to Parse JSON
userApp.use(express.json());

// ✅ Register user (Role will always be 'user')
userApp.post(
  "/register",
  expressAsyncHandler(async (req, res) => {
    try {
      console.log("Received Data:", req.body);
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({ message: "Email is required!" });
      }

      let userInDb = await User.findOne({ email });

      if (userInDb) {
        return res.status(200).json({ message: "User exists", payload: userInDb });
      }

      // Always set role to 'user'
      const newUser = new User({ ...req.body, role: "user" });
      const newUserDoc = await newUser.save();
      return res.status(201).json({ message: "User registered successfully", payload: newUserDoc });

    } catch (error) {
      console.error("❌ Error Registering User:", error);
      return res.status(500).json({ message: "Server Error", error: error.message });
    }
  })
);

// ✅ Get all users
userApp.get(
  "/users",
  requireAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      const users = await User.find();
      return res.status(200).json({ message: "Users Fetched", payload: users });
    } catch (error) {
      console.error("❌ Error Fetching Users:", error);
      return res.status(500).json({ message: "Server Error", error: error.message });
    }
  })
);

module.exports = userApp;
