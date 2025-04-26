const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require("uuid");
const requireAuth = require("../middleware/clerkAuth");
const Payment = require("../models/paymentModel");
const Razorpay = require("razorpay"); // 🔥 Added

const paymentApp = express.Router();
paymentApp.use(express.json());

// 🔥 Razorpay Instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

// ✅ Create Payment Route
paymentApp.post(
  "/create",
  requireAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      const { amount, currency, paymentMethod, room, userId, userEmail, userName } = req.body;

      // 🔹 Validate required fields
      if (!amount || !paymentMethod || !room) {
        return res.status(400).json({ message: "Amount, Payment Method, and Room details are required" });
      }

      // 🔹 Create Razorpay Order
      const razorpayOrder = await razorpay.orders.create({
        amount: amount * 100, // Razorpay works with paise
        currency: currency || "INR",
        receipt: uuidv4(), // can use transactionId also if you want
      });

      if (!razorpayOrder) {
        return res.status(500).json({ message: "Failed to create Razorpay Order" });
      }

      // 🔹 Save payment record in MongoDB
      const newPayment = new Payment({
        userId,
        userEmail,
        amount,
        currency,
        paymentMethod,
        transactionId: razorpayOrder.id, // use Razorpay Order ID as transactionId
        room: room,
        userName: userName,
        status: "Pending",
      });

      const savedPayment = await newPayment.save();

      return res.status(201).json({
        message: "Payment Order Created Successfully",
        payload: {
          payment: savedPayment,
          razorpayOrder: {
            id: razorpayOrder.id,
            amount: razorpayOrder.amount,
            currency: razorpayOrder.currency,
          },
        },
      });
    } catch (error) {
      console.error("❌ Payment Create Error:", error);
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
      const { status, razorpayPaymentId, razorpayOrderId, razorpaySignature } = req.body;

      // 🔹 Validate required fields
      if (!status || !["Success", "Failed"].includes(status)) {
        return res.status(400).json({ message: "Invalid Status" });
      }

      // 🔹 Update payment record in MongoDB
      const updatedPayment = await Payment.findOneAndUpdate(
        { transactionId },
        { status, razorpayPaymentId, razorpayOrderId, razorpaySignature },
        { new: true }
      );

      if (!updatedPayment) {
        return res.status(404).json({ message: "Transaction Not Found" });
      }

      // 🔹 Return success response
      return res.status(200).json({ message: "Payment Status Updated", payload: updatedPayment });
    } catch (error) {
      console.error("❌ Update Payment Error:", error);
      return res.status(500).json({ message: "Server Error", error: error.message });
    }
  })
);

module.exports = paymentApp;
