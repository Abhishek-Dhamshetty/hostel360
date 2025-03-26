const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require("uuid");
const requireAuth = require("../middleware/clerkAuth");
const Payment = require("../models/paymentModel");

const paymentApp = express.Router();
paymentApp.use(express.json());

// ✅ Create Payment Route
paymentApp.post(
  "/create",
  requireAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      const { amount, currency, paymentMethod, room,userId,userEmail,userName } = req.body;
      

      // 🔹 Validate required fields
      if (!amount || !paymentMethod || !room) {
        return res.status(400).json({ message: "Amount, Payment Method, and Room details are required" });
      }

      // 🔹 Generate unique transaction ID
      const transactionId = uuidv4();

      // 🔹 Save payment record in MongoDB
      const newPayment = new Payment({
        userId,
        userEmail,
        amount,
        currency,
        paymentMethod,
        transactionId,
        room:room,
        userName:userName,
        status: "Pending",
      });

      const savedPayment = await newPayment.save();
      return res.status(201).json({ message: "Payment Recorded Successfully", payload: savedPayment });
    } catch (error) {
      console.error("❌ Payment Save Error:", error);
      return res.status(500).json({ message: "Server Error", error: error.message });
    }
  })
);

// ✅ Fetch All Payments (For Admin)
paymentApp.get(
  "/all",
  requireAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      const payments = await Payment.find();
      return res.status(200).json({ message: "Payments Fetched", payload: payments });
    } catch (error) {
      console.error("❌ Fetch Payments Error:", error);
      return res.status(500).json({ message: "Server Error", error: error.message });
    }
  })
);

// ✅ Fetch Payments for Current User
paymentApp.get(
  "/my-payments",
  requireAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      const { userId } = req.auth;
      const payments = await Payment.find({ userId });

      if (!payments.length) return res.status(404).json({ message: "No Payments Found" });

      return res.status(200).json({ message: "User Payments Fetched", payload: payments });
    } catch (error) {
      console.error("❌ Fetch User Payments Error:", error);
      return res.status(500).json({ message: "Server Error", error: error.message });
    }
  })
);

// ✅ Update Payment Status (Admin)
paymentApp.put(
  "/update/:transactionId",
  requireAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      const { transactionId } = req.params;
      const { status } = req.body;

      if (!["Success", "Failed"].includes(status)) {
        return res.status(400).json({ message: "Invalid Status" });
      }

      const updatedPayment = await Payment.findOneAndUpdate(
        { transactionId },
        { status },
        { new: true }
      );

      if (!updatedPayment) {
        return res.status(404).json({ message: "Transaction Not Found" });
      }

      return res.status(200).json({ message: "Payment Status Updated", payload: updatedPayment });
    } catch (error) {
      console.error("❌ Update Payment Error:", error);
      return res.status(500).json({ message: "Server Error", error: error.message });
    }
  })
);

module.exports = paymentApp;
