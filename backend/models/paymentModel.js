const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true, // ✅ Indexed for faster user-specific queries
    },
    userEmail: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 1, // ✅ Prevents zero or negative values
    },
    currency: {
      type: String,
      default: "INR",
      uppercase: true, // ✅ Ensures currency codes are stored in uppercase
    },
    paymentMethod: {
      type: String,
      required: true,
      enum: ["Card", "UPI", "Net Banking", "Crypto", "Other"], // ✅ Ensures valid payment methods
    },
    transactionId: {
      type: String,
      unique: true,
      required: true,
      index: true, // ✅ Optimized search queries for transactions
    },
    room: {
      type: String,
      required: true, // ✅ Ensures currency codes are stored in uppercase
    },
    userName: {
      type: String,
      required: true, // ✅ Ensures currency codes are stored in uppercase
    }
    
  },
  { timestamps: true }
);

const Payment = mongoose.model("payment", paymentSchema);
module.exports = Payment;